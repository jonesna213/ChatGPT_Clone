import { useEffect, useState } from "react";
import PencilSquare from "../../assets/PencilSquare";
import styles from "../../css/styles.module.css";
import ThreeDots from "../../assets/ThreeDots";
import Pencil from "../../assets/Pencil";
import TrashCan from "../../assets/TrashCan";

const SideBar = ({ chats, setCurrentConversation, currentConversation }) => {
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);

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

    /*
        Dont need to worry aobut ids because the ... only pops up for the current conversation
    */
    const handleEditButtonClick = event => {
        event.stopPropagation();

        setIsEditMenuOpen(!isEditMenuOpen);
    };

    const handleEditMenuOptionClick = (option) => {
        // Implement logic for each menu option (e.g., delete or rename)
        if (option === 'delete') {
            // Handle delete logic
            console.log('Delete clicked for conversation:', currentConversation);
        } else if (option === 'rename') {
            // Handle rename logic
            console.log('Rename clicked for conversation:', currentConversation);
        }

        // Close the edit menu after handling the option
        setIsEditMenuOpen(false);
    };

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
                                        <div className="position-relative">
                                            <button onClick={handleEditButtonClick} className={`btn ${styles.threeDotsButton}`}>
                                                <ThreeDots />
                                            </button>

                                            {isEditMenuOpen && (
                                                <div className="position-absolute top-100 start-0">
                                                    <div className="rounded p-2 bg-dark border">
                                                        <ul className={`list-group ${styles.editMenu}`}>
                                                            <li
                                                                className="list-group-item btn px-5 d-flex align-items-center"
                                                                onClick={() => handleEditMenuOptionClick('rename')}
                                                            >   
                                                                <Pencil />
                                                                <span className="ms-2">Rename</span>
                                                            </li>
                                                            <li
                                                                className="list-group-item btn px-5 d-flex align-items-center text-danger"
                                                                onClick={() => handleEditMenuOptionClick('delete')}
                                                            >
                                                                <TrashCan />
                                                                <span className="ms-2">Delete</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
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