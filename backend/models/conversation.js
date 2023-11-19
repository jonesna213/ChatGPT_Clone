/*
    Will be saved in the browser looking like...
    {
        id: 123,
        dateCreated: "11/18/2023", 
        messages: [
            {role: "system", content: "You are a helpful assistant."},
            {role: "assistant", content: "How can i help you today?"},
            {role: "user", content: "What was Albert Einstein known for?"}
        ]
    }
*/

module.exports = class Conversation {

    constructor(id, messages, dateCreated) {
        if (!id) {
            this.id = Math.round(Math.random() * 1000); //not positive to be unique but works for these purposes
        } else {
            this.id = id;
        }
        
        this.messages = messages;
        this.dateCreated = dateCreated;
    }

    /**
     * Expect an object with role and content fields
     * 
     * @param {Object} message 
     */
    addMessage(message) {
        this.messages.push(message);
    }
}