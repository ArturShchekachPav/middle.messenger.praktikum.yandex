import Connect from './Connect';

const withCurrentChatId = Connect((state) => ({
	chatId: state.currentChat?.id,
}));

export default withCurrentChatId;
