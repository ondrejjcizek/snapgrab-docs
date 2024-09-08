import { Snapgrab } from '../../../plugins/snapgrab'
import Component from '../core/Component'

export default class Slider extends Component {
	constructor(element, options = {}) {
		super(element, options)
		this.snapgrab = new Snapgrab(this.element, {
			autoheight: true,
		})
	}

	prepare() {
		this.snapgrab.init()
	}
}
