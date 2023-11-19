import PencilSquare from "../../assets/PencilSquare";
import styles from "../../css/styles.module.css";

const SideBar = () => {
    return (
        <section className="col-2 text-white h-100">
            <div className="m-3">
                <button type="button" className={`d-flex justify-content-between align-items-center w-100 ${styles.newChat} btn text-white`}>
                    <span>New Chat</span>
                    <PencilSquare />
                </button>

                <div>
                    <p>test</p>
                </div>
            </div>

        </section>
    );
}

export default SideBar;