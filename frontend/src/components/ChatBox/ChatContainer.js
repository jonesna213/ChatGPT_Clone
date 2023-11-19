import styles from "../../css/styles.module.css";
import { useState } from "react";

const ChatContainer = () => {
    const [userInput, setUserInput] = useState("");
    const [conversationStarted, setConversationStarted] = useState(false);
    const [conversation, setConversation] = useState();

    const inputChangeHandler = value => {
        setUserInput(value);
    }

    const submitHandler = async event => {
        event.preventDefault();
        const input = event.target.userInput.value.trim();

        //Incase its an empty message
        if (input.length === 0) {
            setUserInput("");
            return;
        }

        try {
            const result = await fetch("http://localhost:8080/newConversation");

            const resData = await result.json();

            console.log("ResData: ", resData);

        } catch (err) {
            console.log(err);
            return;
        }

        setUserInput("");
        setConversationStarted(true);
        console.log(input);
    }

    return (
        <section className="col bg-dark text-white d-flex flex-column justify-content-between">
            {conversationStarted ? (
                <h1>Conversation</h1>
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
                            placeholder="Message ChatGPT..."
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