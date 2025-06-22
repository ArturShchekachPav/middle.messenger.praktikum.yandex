import Connect from "./Connect";

const withIsLoggedIn = Connect(state => ({ isLoggedIn: state.isLoggedIn }));

export default withIsLoggedIn;
