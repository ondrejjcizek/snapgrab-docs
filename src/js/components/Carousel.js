import { ScrollSnapDraggable, ScrollSnapSlider } from 'scroll-snap-slider'

import Component from '../core/Component'

export default class Carousel extends Component {
	constructor(element, options = {}) {
		super(element, options)

		this.ref = {
			wrapper: null,
			dots: null,
			prev: null,
			next: null
		}

		this.state = {
			currentSlide: 0 // Set initial slide to 0 (first slide)
		}
	}

	prepare() {
		this.handleHeight()
		
		const slider = new ScrollSnapSlider({
			element: this.ref.wrapper,
			scrollTimeout: 50,
			roundingMethod: Math.round,
			sizingMethod(slider) {
				return slider.element.firstElementChild.offsetWidth
			}
		}).with([new ScrollSnapDraggable()])

		if (this.ref.dots) {
			const slidesCount = slider.element.childElementCount
			this.ref.dots.innerHTML = ''

			for (let i = 0; i < slidesCount; i++) {
				const dot = document.createElement('button')
				this.ref.dots.appendChild(dot)
				dot.addEventListener('click', () => slider.slideTo(i))
			}

			this.ref.dots.children[0].classList.add('is-active')
		}

		slider.addEventListener('slide-pass', (event) => {
			this.state.currentSlide = event.detail
			if (this.ref.dots) {
				this.handleDots(this.state.currentSlide)
			}

			this.handleHeight()
		})

		this.ref.prev.addEventListener('click', () => {
			this.slideToPrev(slider)
		})

		this.ref.next.addEventListener('click', () => {
			this.slideToNext(slider)
		})
	}

	slideToPrev(slider) {
		const prevSlide = this.state.currentSlide > 0 ? this.state.currentSlide - 1 : 0
		slider.slideTo(prevSlide)
		this.state.currentSlide = prevSlide
	}

	slideToNext(slider) {
		const slidesCount = slider.element.childElementCount
		const nextSlide = this.state.currentSlide < slidesCount - 1 ? this.state.currentSlide + 1 : slidesCount - 1
		slider.slideTo(nextSlide)
		this.state.currentSlide = nextSlide
	}

	handleHeight() {
		const currentSlideElement = this.ref.wrapper.children[this.state.currentSlide]
		const currentSlideHeight = currentSlideElement.offsetHeight
		console.log('Height of current slide:', currentSlideHeight)
		
		// You can also update the wrapper height here if needed
		setTimeout(() => {
			this.ref.wrapper.style.height = `${currentSlideHeight}px`
		}, 300)
	}

	handleDots(currentSlide) {
		Array.from(this.ref.dots.children).forEach(dot => dot.classList.remove('is-active'))
		this.ref.dots.children[currentSlide].classList.add('is-active')
	}

	destroy() {
		// Cleanup code can go here
	}
}
