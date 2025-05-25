require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors());
app.use(express.json());

// API anahtarı sadece backend'de tutulur, .env dosyasından okunur
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Gemini API Proxy Endpoint
app.post('/api/gemini', async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt gereklidir' });
        }

        // Gemini API'yi çağır
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        // API yanıtını client'a ilet
        if (response.data.candidates &&
            response.data.candidates.length > 0 &&
            response.data.candidates[0].content &&
            response.data.candidates[0].content.parts &&
            response.data.candidates[0].content.parts.length > 0) {
            res.json({ text: response.data.candidates[0].content.parts[0].text });
        } else {
            res.status(500).json({ error: 'API yanıtı beklenen formatta değil' });
        }
    } catch (error) {
        console.error('Gemini API hatası:', error.response?.data || error.message);
        res.status(500).json({
            error: 'API isteği başarısız oldu',
            message: error.response?.data?.error?.message || error.message
        });
    }
});

// Statik dosyaları servis et (React app ve orjinal dosyalar)
// Orjinal dosyalar için /original endpoint'ini kullanacağız
app.use('/original', express.static(path.join(__dirname, '../client/public')));

// Orjinal HTML dosyasını serve et
app.get('/original', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// Production ortamında React client dosyalarını servis et
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
} else {
    // Development ortamında ana endpoint'te React uygulamasına yönlendir
    app.get('/', (req, res) => {
        res.redirect('http://localhost:3000');
    });
}

// Sunucuyu başlat
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Original HTML accessible at: http://localhost:${PORT}/original`);
    console.log(`React app accessible at: http://localhost:3000 (development) or http://localhost:${PORT} (production)`);
}); 