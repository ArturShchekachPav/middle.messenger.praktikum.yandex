import Connect from './Connect';

const withCurrentUserId = Connect((state) => ({
	currentUserId: state.currentUser?.id,
}));

export default withCurrentUserId;
