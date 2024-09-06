import { Snapgrab } from 'snapgrab'

import Component from '../core/Component'

export default class Features extends Component {
	constructor(element, options = {}) {
		super(element, options)
		this.snapgrab = new Snapgrab(this.element, {
			autoplay: 6000
		})
	}

	prepare() {
		this.snapgrab.init()
	}
}
