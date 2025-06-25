import Connect from './Connect';

const withMessages = Connect((state) => ({
	messages: state.currentChat?.messages,
}));

export default withMessages;
