const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/register', (req, res) => {
    const { name, email, password, role } = req.body;
    console.log('Received data:', { name, email, password, role });
    res.json({ message: 'User registered' });
});

app.listen(5000, () => console.log('Server on port 5000'));