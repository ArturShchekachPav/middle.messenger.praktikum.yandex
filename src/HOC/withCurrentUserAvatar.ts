import Connect from './Connect';

const withCurrentUserAvatar = Connect((state) => ({
	avatar: state.currentUser?.avatar
		? `https://ya-praktikum.tech/api/v2/resources${state.currentUser.avatar}`
		: 'default-avatar.png',
}));

export default withCurrentUserAvatar;
