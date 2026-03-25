require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nexus')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User Schema with token field
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    token: String,
    tokenExpires: Date,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log('🔐 Token VERIFIED for user:', verified.email, '| Role:', verified.role);
        next();
    } catch (err) {
        console.log('❌ Token verification FAILED:', err.message);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

// Role-based authorization middleware
const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            console.log('🚫 ACCESS DENIED for role:', req.user.role, '| Required:', allowedRoles);
            return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
        }
        console.log('✅ Role authorized:', req.user.role);
        next();
    };
};

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log('📥 Received:', { name, email, password, role });

    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        console.log('✅ Saved to DB:', newUser);
        res.json({ message: 'User saved to database' });
    } catch (err) {
        console.log('❌ Error:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// Login endpoint - reuse existing valid token or create new one
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;
    console.log('🔑 Login attempt:', { email, password, role });

    try {
        const user = await User.findOne({ email, role });

        if (!user) {
            console.log('❌ User not found');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (user.password !== password) {
            console.log('❌ Password mismatch');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        let token = user.token;
        let tokenValid = false;

        if (token && user.tokenExpires && new Date() < user.tokenExpires) {
            try {
                jwt.verify(token, process.env.JWT_SECRET);
                tokenValid = true;
                console.log('♻️  REUSING existing valid token');
                console.log('   Token:', token.substring(0, 50) + '...');
            } catch (err) {
                console.log('⏰ Existing token EXPIRED, creating NEW one');
            }
        } else {
            console.log('🆕 No valid token found, creating NEW token');
        }

        if (!tokenValid) {
            token = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            user.token = token;
            user.tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            await user.save();
            console.log('✅ NEW token CREATED and SAVED to DB');
            console.log('   Token:', token.substring(0, 50) + '...');
        }

        console.log('🎉 Login SUCCESS - Role:', user.role);
        res.json({
            message: 'Login successful',
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.log('❌ Login error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Protected route - get current user profile (any role)
app.get('/api/profile', authenticateToken, async (req, res) => {
    console.log('📋 Profile request for userId:', req.user.userId, '| Role:', req.user.role);
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ENTREPRENEUR ONLY routes
app.get('/api/entrepreneur/dashboard', authenticateToken, authorizeRole(['entrepreneur']), async (req, res) => {
    console.log('🏢 Entrepreneur dashboard accessed by:', req.user.email);
    res.json({
        message: 'Entrepreneur dashboard data',
        role: req.user.role,
        data: {
            myStartups: [],
            fundingRequests: [],
            investorMatches: []
        }
    });
});

app.post('/api/entrepreneur/pitch', authenticateToken, authorizeRole(['entrepreneur']), async (req, res) => {
    console.log('📊 New pitch created by:', req.user.email);
    res.json({ message: 'Pitch created successfully' });
});

// INVESTOR ONLY routes
app.get('/api/investor/dashboard', authenticateToken, authorizeRole(['investor']), async (req, res) => {
    console.log('💰 Investor dashboard accessed by:', req.user.email);
    res.json({
        message: 'Investor dashboard data',
        role: req.user.role,
        data: {
            portfolio: [],
            dealFlow: [],
            startupMatches: []
        }
    });
});

app.post('/api/investor/invest', authenticateToken, authorizeRole(['investor']), async (req, res) => {
    console.log('💵 Investment made by:', req.user.email);
    res.json({ message: 'Investment recorded successfully' });
});

// BOTH ROLES allowed
app.get('/api/startups', authenticateToken, authorizeRole(['entrepreneur', 'investor']), async (req, res) => {
    console.log('📋 Startup listings viewed by:', req.user.email, '| Role:', req.user.role);
    res.json({
        message: 'Public startup listings',
        role: req.user.role,
        startups: []
    });
});

// Protected - update own profile only
app.put('/api/users/:id', authenticateToken, async (req, res) => {
    console.log('✏️  Update request by userId:', req.user.userId);
    try {
        if (req.params.id !== req.user.userId) {
            return res.status(403).json({ error: 'Can only update your own profile' });
        }

        const updates = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Protected - delete own account
app.delete('/api/users/:id', authenticateToken, async (req, res) => {
    console.log('🗑️  Delete request by userId:', req.user.userId);
    try {
        if (req.params.id !== req.user.userId) {
            return res.status(403).json({ error: 'Can only delete your own account' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Account deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Forgot password endpoint (public)
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'No account found' });

        const resetToken = Math.random().toString(36).substring(2, 15);
        console.log('📧 Reset token for', email, ':', resetToken);
        res.json({ message: 'Instructions sent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Reset password endpoint (public)
app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        res.json({ message: 'Password reset' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('🚀 Server on port 5000'));