const axios = require('axios');

exports.handler = async function (event, context) {
    // POST isteği değilse hata döndür
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        // İstek gövdesini parse et
        const body = JSON.parse(event.body);
        const { prompt } = body;

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Prompt gereklidir" }),
            };
        }

        // Gemini API'yi çağır
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
            return {
                statusCode: 200,
                body: JSON.stringify({ text: response.data.candidates[0].content.parts[0].text })
            };
        } else {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'API yanıtı beklenen formatta değil' })
            };
        }
    } catch (error) {
        console.error('Gemini API hatası:', error.response?.data || error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'API isteği başarısız oldu',
                message: error.response?.data?.error?.message || error.message
            })
        };
    }
}; 