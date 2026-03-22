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

app.listen(5000, () => console.log('Server on port 5000'));