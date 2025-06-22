import Block from '../../framework/Block';
import {default as template} from './template.hbs?raw';
import withCurrentUserAvatar from "../../HOC/withCurrentUserAvatar";

class CurrentUserAvatar extends Block {
	render() {
		return template;
	}
}

export default withCurrentUserAvatar(CurrentUserAvatar);
