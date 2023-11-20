import { useEffect, useState } from "react";
import PencilSquare from "../../assets/PencilSquare";
import styles from "../../css/styles.module.css";

const SideBar = () => {
    const storedChats = localStorage.getItem("chats");
    const initialChats = storedChats ? JSON.parse(storedChats) : [];

    const [chats, setChats] = useState(initialChats);

    useEffect(() => {
        const handleStorageChange = () => {
            console.log("localStorage changed");
            const updatedChats = localStorage.getItem("chats");
            console.log("updatedChats:", updatedChats);
            setChats(updatedChats ? JSON.parse(updatedChats) : []);
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);


    return (
        <section className="col-2 text-white h-100">
            <div className="m-3">
                <button type="button" className={`d-flex justify-content-between align-items-center w-100 ${styles.newChat} btn text-white fw-bold`}>
                    New Chat
                    <PencilSquare />
                </button>

                <section className="mt-4">

                    {chats.map(convo => {
                        console.log("convo: ", convo);
                        return (
                            <div className="ms-1" key={convo.dateCreated + convo.messages[0].length}>
                                <p className="ms-2 text-light-emphasis small mb-0">{convo.dateCreated}</p>
                                <a className={`ps-2 py-1 d-block text-decoration-none text-white ${styles.prevConversation}`} href="w">{convo.name}</a>
                            </div>
                        );
                    })}

                </section>
            </div>
        </section>
    );
}

export default SideBar;