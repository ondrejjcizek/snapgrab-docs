import { Snapgrab } from '../../../plugins/snapgrab'
import Component from '../core/Component'

export default class Features extends Component {
	constructor(element, options = {}) {
		super(element, options)
		this.snapgrab = new Snapgrab(this.element)
	}

	prepare() {
		this.snapgrab.init()
	}
}
