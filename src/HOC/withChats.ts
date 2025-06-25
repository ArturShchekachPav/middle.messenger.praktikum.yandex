import Connect from './Connect';

const withChats = Connect((state) => ({ chats: state.chats }));

export default withChats;
