import { useEffect } from "react";
import PencilSquare from "../../assets/PencilSquare";
import styles from "../../css/styles.module.css";
import ThreeDots from "../../assets/ThreeDots";

const SideBar = ({ chats, setCurrentConversation, currentConversation }) => {
    useEffect(() => {
        const handleStorageChange = () => {
            console.log("localStorage changed");
            const updatedChats = localStorage.getItem("chats");
            console.log("updatedChats:", updatedChats);
            setCurrentConversation(null); // Reset current conversation
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [setCurrentConversation]);

    const openEditConversation = () => {

    }

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

                                {currentConversation && currentConversation.id === convo.id ? (
                                    <div className={`d-flex justify-content-between align-items-center ps-2 my-1 text-white ${styles.currentConversation}`}>
                                        {convo.name}
                                        <button onClick={openEditConversation} className={`btn ${styles.threeDotsButton}`}>
                                            <ThreeDots />
                                        </button>
                                    </div>
                                ) : (
                                    <a className={`ps-2 py-1 my-1 d-block text-decoration-none text-white ${styles.prevConversation}`} href="w">{convo.name}</a>
                                )}
                            </div>
                        );
                    })}

                </section>
            </div>
        </section>
    );
}

export default SideBar;