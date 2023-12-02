import Loading from "../../assets/Loading";
import Robot from "../../assets/Robot";
import User from "../../assets/User";
import styles from "../../css/styles.module.css";
import { useEffect, useRef, useState } from "react";

const ChatContainer = ({ currentConversation, updateChats, setCurrentConversation }) => {
    const [userInput, setUserInput] = useState("");
    const [conversationStarted, setConversationStarted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const conversationRef = useRef(null);

    /**
     * Used for checking if the conversation is started as well as scrolling down
     * in the conversation menu so the most recent chats are on the screen.
     */
    useEffect(() => {
      setConversationStarted(!!currentConversation);
  
      if (conversationRef.current) {
        conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
      }
    }, [currentConversation, isLoading]);

    /**
     * Updates the userInput when a change occurs in the chat box
     * 
     * @param {string} value the value from the input element
     */
    const inputChangeHandler = value => {
        setUserInput(value);
    }

    /**
     * Handles what happens when a message is sent.
     * 
     * @param {*} event default form event element
     */
    const submitHandler = async event => {
        event.preventDefault();

        //Incase its an empty message
        if (userInput.length === 0) {
            setUserInput("");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        //If its a new conversation, setup for a new one otherwise add new input to current conversation.
        if (!conversationStarted) {
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

            /**
             * If there are chats create a chats array and put the api response into it.
             * 
             * If there are no chats then either add onto the current conversation or add the new
             * conversation to the chats array.
             */
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
                <ul ref={conversationRef} className={`list-unstyled mx-auto w-50 mt-5 ${styles.scrollableConversation}`}>
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