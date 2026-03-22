const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nexus')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    console.log('Received:', { name, email, password, role });

    try {
        const newUser = new User({ name, email, password, role });
        await newUser.save();
        console.log('Saved to DB:', newUser);
        res.json({ message: 'User saved to database' });
    } catch (err) {
        console.log('Error:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// Login endpoint - ADD THIS
app.post('/api/login', async (req, res) => {
    const { email, password, role } = req.body;
    console.log('Login attempt:', { email, password, role });

    try {
        const user = await User.findOne({ email, role });

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        if (user.password !== password) {
            console.log('Password mismatch');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        console.log('Login successful:', user);
        res.json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        console.log('Login error:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Forgot password endpoint
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'No account found' });

    const resetToken = Math.random().toString(36).substring(2, 15);
    console.log('Reset token for', email, ':', resetToken);
    res.json({ message: 'Instructions sent' });
});

// Reset password endpoint
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
    res.json({ message: 'Password reset' });
});

// Update profile endpoint
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    res.json({ user });
});

// START SERVER - MUST BE LAST
app.listen(5000, () => console.log('Server on port 5000'));