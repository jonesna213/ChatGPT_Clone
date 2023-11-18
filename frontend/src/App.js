import ChatContainer from "./components/ChatBox/ChatContainer";
import SideBar from "./components/SideBar/SideBar";

const App = () => {
    return (
        <div className="row w-100 h-100">
            <SideBar />
            <ChatContainer />
        </div>
    );
}

export default App;
