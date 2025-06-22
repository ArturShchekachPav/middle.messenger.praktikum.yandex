import Connect from "./Connect";

const withCurrentUserName = Connect(state => ({ name: state.currentUser ? state.currentUser.first_name : '' }));

export default withCurrentUserName;
