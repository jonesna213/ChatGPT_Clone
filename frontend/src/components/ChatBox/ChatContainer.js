import Robot from "../../assets/Robot";
import User from "../../assets/User";
import styles from "../../css/styles.module.css";
import { useState } from "react";

const ChatContainer = ({ currentConversation, updateChats, setCurrentConversation }) => {
    const [userInput, setUserInput] = useState("");
    const [conversationStarted, setConversationStarted] = useState(false);
    const [conversation, setConversation] = useState(currentConversation);

    const inputChangeHandler = value => {
        setUserInput(value);
    }

    const submitHandler = async event => {
        event.preventDefault();
        const input = event.target.userInput.value.trim();
        console.log(input);

        //Incase its an empty message
        if (input.length === 0) {
            setUserInput("");
            return;
        }

        try {
            const result = await fetch("http://localhost:8080/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: input,
                    conversation
                })
            });

            const resData = await result.json();

            setConversation(resData);
            setCurrentConversation(resData);



            localStorage.setItem("conversation", JSON.stringify(resData));

            const chats = JSON.parse(localStorage.getItem("chats")) || [];

            //if there are chats
            if (chats.length !== 0) {
                updateChats(chats => {
                    const isSaved = chats.find(convo => convo.id === resData.id);

                    if (!isSaved) {
                        return [...chats, resData];
                    } else {
                        return chats.map(convo => (convo.id === resData.id ? resData : convo));
                    }
                });
            } else {
                const updatedChats = [];
                updatedChats.push(resData);
                updateChats(updatedChats);
            }
        } catch (err) {
            console.log(err);
            return;
        }

        setUserInput("");
        setConversationStarted(true);
    }

    return (
        <section className="col bg-dark text-white d-flex flex-column justify-content-between">
            {conversationStarted ? (
                <ul className="list-unstyled mx-auto w-50 mt-5">
                    {conversation.messages.map(m => {
                        return (
                            <li key={m.content.length}>
                                {m.role === "assistant" && (
                                    <>
                                        <Robot /> Jarvis
                                        <p>{m.content}</p>
                                    </>
                                )}
                                {m.role === "user" && (
                                    <>
                                        <User /> You
                                        <p>{m.content}</p>
                                    </>
                                )}

                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className={`row ${styles.startingMessage}`}>
                    <h3 className={`text-center`}>How can I assist you today?</h3>
                </div>
            )}

            <div className={`row`}>
                <form onSubmit={submitHandler} autoComplete="off" className={`w-50 mx-auto`}>
                    <div className="input-group mb-1">
                        <input
                            type="text"
                            name="userInput"
                            value={userInput}
                            onChange={event => { inputChangeHandler(event.target.value) }}
                            className={`text-white form-control bg-dark ${styles.placeholderText}`}
                            placeholder="Message Jarvis..."
                        />
                        <button className="btn btn-outline-light" type="submit">
                            Send
                        </button>
                    </div>
                    <p className="text-secondary small text-center">Some answers may be incorrect. Consider verifying important questions.</p>
                </form>
            </div>
        </section>
    );
}

export default ChatContainer;