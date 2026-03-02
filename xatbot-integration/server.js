const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// The API Key is called from an environment variable for PRO+ security
const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const userMessage = req.body.message;

        // Context using your specific LAN Party FAQs
        const context = "You are a helpful assistant for the LAN-Party-FAQ-Project. Use this info: 1Gbps network, CAT6 cables required, 16GB RAM recommended.";
        
        const result = await model.generateContent(`${context}\nUser: ${userMessage}`);
        const response = await result.response;
        res.json({ reply: response.text() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "API Error" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
