import Protect from "./Protect";

const protectAuthorizedUsers = Protect(
	state => ({ isLoggedIn: state.isLoggedIn }),
	'/messanger',
	{
		isLoggedIn: false
	}
	);

export default protectAuthorizedUsers;
