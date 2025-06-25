import Connect from './Connect';

const withCurrentUser = Connect((state) => ({
	currentUser: state.currentUser,
}));

export default withCurrentUser;
