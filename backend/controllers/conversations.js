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

    const openai = new OpenAI({
        apiKey: process.env.OPENAIAPIKEY
    });

    message = { role: "user", content: message };

    let conversation = req.body.conversation;

    if (!conversation) {
        const date = new Date().toLocaleDateString();

        conversation = new Conversation(false, [
            { role: "system", content: "You are a helpful assistant with the name JARVIS. You have a very dark sense of humor which can be seen in your replies." }
        ], date, "Unnamed chat");
    } else {
        conversation = new Conversation(conversation.id, conversation.messages, conversation.dateCreated, conversation.name);
    }

    conversation.addMessage(message);

    const response = await openai.chat.completions.create({
        messages: conversation.messages,
        model: "gpt-3.5-turbo",
        temperature: 0.7
    });

    conversation.addMessage(response.choices[0].message);

    console.log("converstaion", conversation);
    res.send(conversation);
}