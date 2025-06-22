import Protect from "./Protect";

const protectUnauthorizedUsers = Protect(
	state => ({ isLoggedIn: state.isLoggedIn }),
	'/',
	{
		isLoggedIn: true
	}
	);

export default protectUnauthorizedUsers;
