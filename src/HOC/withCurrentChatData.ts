import Connect from './Connect';

const withCurrentChatData = Connect((state) => ({
	name: state.currentChat?.title,
	avatar: state.currentChat?.avatar,
}));

export default withCurrentChatData;
