import Connect from './Connect';

const withCurrentChat = Connect((state) => ({
	currentChat:
		state.currentChat && state.currentUser
			? {
					chatId: state.currentChat.id,
					userId: state.currentUser.id,
					token: state.currentChat.token,
				}
			: null,
}));

export default withCurrentChat;
