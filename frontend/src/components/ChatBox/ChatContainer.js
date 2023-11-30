import Loading from "../../assets/Loading";
import Robot from "../../assets/Robot";
import User from "../../assets/User";
import styles from "../../css/styles.module.css";
import { useEffect, useState } from "react";

const ChatContainer = ({ currentConversation, updateChats, setCurrentConversation }) => {
    const [userInput, setUserInput] = useState("");
    const [conversationStarted, setConversationStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setConversationStarted(!!currentConversation);
    }, [currentConversation]);

    const inputChangeHandler = value => {
        setUserInput(value);
    }

    const submitHandler = async event => {
        event.preventDefault();

        if (!conversationStarted) {
            console.log("test", currentConversation);
            console.log("started", conversationStarted);
            setCurrentConversation({
                messages: [
                    { role: "user", content: userInput }
                ]
            });
            setConversationStarted(true);
        } else {
            let updatedConvo = currentConversation;
            const updatedMessages = updatedConvo.messages;
            updatedMessages.push({role: "user", content: userInput});
            updatedConvo.messages = updatedMessages;
            setCurrentConversation(updatedConvo);
        }

        setIsLoading(true);
        console.log(userInput);

        //Incase its an empty message
        if (userInput.length === 0) {
            setUserInput("");
            setIsLoading(false);
            return;
        }

        try {
            const result = await fetch("http://localhost:8080/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: userInput,
                    conversation: currentConversation
                })
            });
            
            const resData = await result.json();

            setCurrentConversation(resData);

            localStorage.setItem("conversation", JSON.stringify(resData));

            const chats = JSON.parse(localStorage.getItem("chats")) || [];
            console.log("chats", chats);
            //if there are chats
            if (chats.length !== 0) {
                let updatedChats;
                const isSaved = chats.find(convo => convo.id === resData.id);
                if (!isSaved) {
                    updatedChats = [...chats, resData];
                } else {
                    updatedChats = chats.map(convo => (convo.id === resData.id ? resData : convo));
                }
                updateChats(updatedChats);
            } else {
                const updatedChats = [];
                updatedChats.push(resData);
                updateChats(updatedChats);
            }
        } catch (err) {
            console.log(err);
            return;
        }

        setIsLoading(false);
        setUserInput("");
    }

    return (
        <section className="col bg-dark text-white d-flex flex-column justify-content-between">
            {conversationStarted && currentConversation ? (
                <ul className={`list-unstyled mx-auto w-50 mt-5 ${styles.scrollableConversation}`}>
                    {currentConversation.messages.map(m => {
                        return (
                            <li key={m.content.length + Math.random()}>
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
                    {isLoading && (
                        <>
                            <li key="inProgressMessageRobot">
                                <Robot /> Jarvis
                                <Loading />
                            </li>
                        </>
                    )}
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