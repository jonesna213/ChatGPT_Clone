import styles from "../css/styles.module.css";

const Loading = () => {
    return (
        <>
            <div className={`ms-3 mt-3 ${styles.loadingDots}`}></div>
        </>
    );
}

export default Loading;