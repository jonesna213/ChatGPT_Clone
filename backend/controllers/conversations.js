require('dotenv').config();
const OpenAI = require("openai");
const Conversation = require("../models/conversation");

exports.chat = async (req, res, next) => {
    let message = req.body.message.trim();
    if (message.length === 0) {
        const error = new Error("Validation failed, entered data is incorrect.");
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }

    message = { role: "user", content: message };

    let conversation = req.body.conversation;

    if (!conversation) {
        const date = new Date().toLocaleDateString();
        conversation = new Conversation(false, [
            { role: "system", content: "You are a helpful assistant." }
        ], date);
    } else {
        conversation = new Conversation(conversation.id, conversation.messages, conversation.dateCreated);
    }

    conversation.addMessage(message);

    const openai = new OpenAI({
        apiKey: process.env.OPENAIAPIKEY
    });

    const response = await openai.chat.completions.create({
        messages: conversation.messages,
        model: "gpt-3.5-turbo",
        temperature: 0.7
    });

    conversation.addMessage(response.choices[0].message);

    res.send(conversation);
}