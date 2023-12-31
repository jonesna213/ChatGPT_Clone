import { useState } from "react";
import PencilSquare from "../../assets/PencilSquare";
import styles from "../../css/styles.module.css";
import ThreeDots from "../../assets/ThreeDots";
import Pencil from "../../assets/Pencil";
import TrashCan from "../../assets/TrashCan";

const SideBar = ({ updateChats, chats, setCurrentConversation, currentConversation }) => {
    const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
    const [isRenameMenuOpen, setIsRenameMenuOpen] = useState(false);
    const [renameInput, setRenameInput] = useState(currentConversation ? currentConversation.name : "");

    /**
     * When the three dots is clicked on the current conversation it triggers this which either
     * opens or closed the edit conversation pop up.
     */
    const handleEditButtonClick = () => {
        setIsEditMenuOpen(!isEditMenuOpen);
    };

    /**
     * Depending on which button was clicked this function either deletes the conversation 
     * or opens the rename menu for the user.
     * 
     * @param {string} option the option for which button was clicked
     */
    const handleEditMenuOptionClick = option => {
        // Whichever option was clicked, either delete or open rename menu for the current conversation
        if (option === 'delete') {
            const updatedChats = chats.filter(convo => convo.id !== currentConversation.id);
            updateChats(updatedChats);
            setCurrentConversation(null);
        } else if (option === 'rename') {
            setIsRenameMenuOpen(true);
        }

        setIsEditMenuOpen(false);
    };

    /**
     * Essentially makes the conversation name an input and allows the user to 
     * type to rename the selected conversation.
     */
    const openRenameMenu = () => {
        if (renameInput !== currentConversation.name) {
            const updatedChats = chats.map(convo => {
                if (convo.id === currentConversation.id) {
                    convo.name = renameInput;
                }
                return convo;
            });

            updateChats(updatedChats);
        }
        setIsRenameMenuOpen(false);
    }

    /**
     * Updates the rename input value when it changes.
     * 
     * @param {string} value the value from the rename input
     */
    const handleInputChange = value => {
        setRenameInput(value);
    }

    /**
     * When the enter key is pressed it sets the conversation to the value of the 
     * rename input and updates the chats array.
     * 
     * @param {*} event default event 
     */
    const handleRenameSubmit = event => {
        if (event.key === "Enter") {
            const updatedChats = chats.map(convo => {
                if (convo.id === currentConversation.id) {
                    convo.name = renameInput;
                }
                return convo;
            });

            updateChats(updatedChats);
            setIsRenameMenuOpen(false);
        }
    }
    
    return (
        <section className="col-2 text-white h-100">
            <div className="m-3">
                <button onClick={() => { setCurrentConversation(null); setRenameInput("Unnamed chat");}} type="button" className={`d-flex justify-content-between align-items-center w-100 ${styles.newChat} btn text-white fw-bold`}>
                    New Chat
                    <PencilSquare />
                </button>

                <section className="mt-4">
                    {chats.map(convo => {
                        return (
                            <div className="ms-1" key={convo.id}>
                                <p className="ms-2 text-light-emphasis small mb-0">{convo.dateCreated}</p>

                                {currentConversation && currentConversation.id === convo.id ? (
                                    <div className={`d-flex justify-content-between align-items-center ps-2 my-1 text-white ${styles.currentConversation}`}>
                                        {isRenameMenuOpen ? (
                                            <input type="text" name="renameConversationInput" value={renameInput} onChange={event => { handleInputChange(event.target.value) }} className={`${styles.renameInput} text-white`} onBlur={openRenameMenu} autoFocus onKeyDown={handleRenameSubmit} />
                                        ) : (
                                            convo.name
                                        )}
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
                                    <button className={`btn w-100 text-start ps-2 py-1 my-1 d-block text-decoration-none text-white ${styles.prevConversation}`} onClick={() => { setCurrentConversation(convo); setRenameInput(convo.name);}}>{convo.name}</button>
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