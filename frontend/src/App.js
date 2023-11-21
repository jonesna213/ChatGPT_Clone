import ChatContainer from "./components/ChatBox/ChatContainer";
import SideBar from "./components/SideBar/SideBar";
import styles from "./css/styles.module.css";
import { useState } from "react";

const App = () => {
    const [chats, setChats] = useState(JSON.parse(localStorage.getItem("chats")) || []);
    const [currentConversation, setCurrentConversation] = useState(null);

    const updateChats = (newChats) => {
        setChats(newChats);
        localStorage.setItem("chats", JSON.stringify(newChats));
    };

    return (
        <div className={`row ${styles.wrapper}`}>
            <SideBar
                chats={chats}
                setCurrentConversation={setCurrentConversation}
                currentConversation={currentConversation}
            />
            <ChatContainer
                currentConversation={currentConversation}
                updateChats={updateChats}
                setCurrentConversation={setCurrentConversation}
            />
        </div>
    );
}

export default App;
