import ChatContainer from "./components/ChatBox/ChatContainer";
import SideBar from "./components/SideBar/SideBar";
import styles from "./css/styles.module.css";

const App = () => {

    return (
        <div className={`row ${styles.wrapper}`}>
            <SideBar />
            <ChatContainer />
        </div>
    );
}

export default App;
