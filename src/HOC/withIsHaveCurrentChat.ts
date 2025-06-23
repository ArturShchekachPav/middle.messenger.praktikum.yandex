import Connect from "./Connect";

const withIsHaveCurrentChat = Connect(state => ({ isHaveCurrentChat: Boolean(state.currentChat) }));

export default withIsHaveCurrentChat;
