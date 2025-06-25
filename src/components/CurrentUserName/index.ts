import Block from '../../framework/Block';
import { default as template } from './template.hbs?raw';
import withCurrentUserName from '../../HOC/withCurrentUserName';

class CurrentUserName extends Block {
	render() {
		return template;
	}
}

export default withCurrentUserName(CurrentUserName);
