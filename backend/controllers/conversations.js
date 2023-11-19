require('dotenv').config();
const OpenAI = require("openai");
const Conversation = require("../models/conversation");

exports.newConversation = async (req, res, next) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAIAPIKEY
    });

    const messages = [
        { role: "system", content: "You are a helpful assistant." }
    ];

    const date = new Date().toLocaleDateString();

    const newConversation = new Conversation(messages, date);

    const response = await openai.chat.completions.create({
        messages,
        model: "gpt-3.5-turbo",
        temperature: 0.9,
        max_tokens: 150
    });

    newConversation.addMessage(response.choices[0].message);

    res.send(newConversation);
}