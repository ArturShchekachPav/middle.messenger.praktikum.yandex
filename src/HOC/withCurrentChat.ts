import Connect from "./Connect";

const withCurrentChat = Connect(state => ({ currentChat: state.currentChat }));

export default withCurrentChat;
