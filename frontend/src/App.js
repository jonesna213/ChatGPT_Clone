import ChatContainer from "./components/ChatBox/ChatContainer";
import SideBar from "./components/SideBar/SideBar";
import styles from "./css/styles.module.css";
import { useState } from "react";

const App = () => {
    const [chats, setChats] = useState(JSON.parse(localStorage.getItem("chats")) || []);
    const [currentConversation, setCurrentConversation] = useState(null);

    /**
     * Updates the chats state as well as the local storage for it.
     * 
     * @param {Array} newChats an array of new chats 
     */
    const updateChats = newChats => {
        setChats(newChats);
        localStorage.setItem("chats", JSON.stringify(newChats));
    };

    /**
     * Updates the currentConversation state as well as the local storage for it.
     * 
     * @param {object} conversation the conversation object
     */
    const updateCurrentConversation = conversation => {
        setCurrentConversation(conversation);
        localStorage.setItem("conversation", JSON.stringify(conversation));
    };

    return (
        <div className={`row ${styles.wrapper}`}>
            <SideBar
                updateChats={updateChats}
                chats={chats}
                setCurrentConversation={updateCurrentConversation}
                currentConversation={currentConversation}
            />
            <ChatContainer
                currentConversation={currentConversation}
                updateChats={updateChats}
                setCurrentConversation={updateCurrentConversation}
            />
        </div>
    );
}

export default App;
