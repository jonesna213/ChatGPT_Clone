import PencilSquare from "../../assets/PencilSquare";
import styles from "../../css/styles.module.css";

const SideBar = () => {
    return (
        <section className="col-2 text-white h-100">
            <div className="m-3">
                <button type="button" className={`d-flex justify-content-between align-items-center w-100 ${styles.newChat} btn text-white fw-bold`}>
                    New Chat
                    <PencilSquare />
                </button>

                <section className="mt-4">

                    {
                        //loop through this inputting data
                    }
                    <div className="ms-1">
                        <p className="ms-2 text-light-emphasis small mb-0">Date</p>
                        <a className={`ps-2 py-1 d-block text-decoration-none text-white ${styles.prevConversation}`} href="w">Conversation name</a>
                    </div>
                </section>


            </div>

        </section>
    );
}

export default SideBar;