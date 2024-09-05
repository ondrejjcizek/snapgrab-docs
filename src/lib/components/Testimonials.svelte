<script lang="ts">
	import { Snapgrab } from 'snapgrab';

	let snapgrab: HTMLDivElement;

	$effect(() => {
		const snapgrabInstance = new Snapgrab(snapgrab);
		console.log(snapgrabInstance);
		snapgrabInstance.init();

		() => snapgrabInstance.destroy();
	});
</script>

<div class="testimonials" role="region" bind:this={snapgrab}>
	<ul class="testimonials__wrapper" aria-live="polite" data-ref="wrapper">
		<li class="testimonials__slide" aria-hidden="false">
			<div class="testimonials__image">
				<img alt="" src="https://picsum.photos/328/328" srcset="https://picsum.photos/656/656 2x" />
			</div>
			<div class="testimonials__content">
				<p>Love the simplicity of the service and the prompt customer support. We can't imagine working without it.</p>
				<address>
					<strong>— Mathilde Lewis</strong>
					<div>Head of Design, Layers</div>
				</address>
			</div>
		</li>
		<li class="testimonials__slide" aria-hidden="true">
			<div class="testimonials__image">
				<img alt="" src="https://picsum.photos/328/328" srcset="https://picsum.photos/656/656 2x" />
			</div>
			<div class="testimonials__content">
				<p>
					Love the simplicity of the service and the prompt customer support. We can't imagine working without it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quas amet
					consectetur adipisicing elit. Accusamus, quas..
				</p>
				<address>
					<strong>— Mathilde Lewis</strong>
					<div>Head of Design, Layers</div>
				</address>
			</div>
		</li>
		<li class="testimonials__slide" aria-hidden="true">
			<div class="testimonials__image">
				<img alt="" src="https://picsum.photos/328/328" srcset="https://picsum.photos/656/656 2x" />
			</div>
			<div class="testimonials__content">
				<p>Love the simplicity of the service and the prompt customer support. We can't imagine working without it. Lorem ipsum dolor sit amet..</p>
				<address>
					<strong>— Mathilde Lewis</strong>
					<div>Head of Design, Layers</div>
				</address>
			</div>
		</li>
		<li class="testimonials__slide" aria-hidden="true">
			<div class="testimonials__image">
				<img alt="" src="https://picsum.photos/328/328" srcset="https://picsum.photos/656/656 2x" />
			</div>
			<div class="testimonials__content">
				<p>
					Love the simplicity of the service and the prompt customer support. We can't imagine working without it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quas dolor sit
					amet consectetur adipisicing elit. Accusamus, quas
				</p>
				<address>
					<strong>— Mathilde Lewis</strong>
					<div>Head of Design, Layers</div>
				</address>
			</div>
		</li>
		<li class="testimonials__slide" aria-hidden="true">
			<div class="testimonials__image">
				<img alt="" src="https://picsum.photos/328/328" srcset="https://picsum.photos/656/656 2x" />
			</div>
			<div class="testimonials__content">
				<p>Love the simplicity of the service and the prompt customer support. We can't imagine working without it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, quas.</p>
				<address>
					<strong>— Mathilde Lewis</strong>
					<div>Head of Design, Layers</div>
				</address>
			</div>
		</li>
		<li class="testimonials__slide" aria-hidden="true">
			<div class="testimonials__image">
				<img alt="" src="https://picsum.photos/328/328" srcset="https://picsum.photos/656/656 2x" />
			</div>
			<div class="testimonials__content">
				<p>Love the simplicity of the service and the prompt customer support. We can't imagine working without it. Lorem ipsum dolor sit amet.</p>
				<address>
					<strong>— Mathilde Lewis</strong>
					<div>Head of Design, Layers</div>
				</address>
			</div>
		</li>
	</ul>

	<div class="testimonials__dots" data-ref="dots"></div>

	<div class="testimonials__buttons">
		<button data-ref="prev" aria-label="Previous slide"><i class="icon icon-arrow-left"></i></button>
		<button data-ref="next" aria-label="Next slide"><i class="icon icon-arrow-right"></i></button>
	</div>
</div>

<style lang="scss">
	.testimonials {
		position: relative;
		border-radius: 12px;

		@media (width < 768px) {
			margin-bottom: 88px;
		}

		&__wrapper {
			display: flex;
			gap: 24px;
			flex-wrap: nowrap;
			justify-content: normal;
			padding-inline: 0;
			scroll-behavior: smooth;
			scroll-snap-stop: always;
			scroll-snap-type: x mandatory;
			transition: height 0.6s ease;
			touch-action: pan-x pan-y;
			overflow-y: hidden;
			scrollbar-width: none;
			margin: 0 -24px;
			padding: 0 24px;

			&::-webkit-scrollbar {
				display: none;
			}

			@media (width < 530px) {
				grid-auto-columns: 75%;
			}
		}

		&__slide {
			position: relative;
			display: grid;
			grid-template-columns: clamp(100px, 32vw, 328px) 1fr;
			max-width: none;
			scroll-snap-align: center;
			flex: 0 0 100%;
			scroll-snap-stop: always;
			gap: clamp(40px, 8vw, 160px);
			transition: transform 0.6s ease;
			user-select: none;

			&:not(&:first-of-type) {
				height: 0;
			}

			:global(.loaded) & {
				height: 0 !important;
			}

			@media (width < 768px) {
				display: flex;
				flex-direction: column;
			}
		}

		&__image {
			position: relative;
			aspect-ratio: 1/1;
			overflow: hidden;

			@media (width < 768px) {
				overflow: unset;
				max-width: 200px;
			}

			img {
				width: 100%;
				height: auto;
				display: block;
				aspect-ratio: 1 / 1;
				object-fit: cover;
				border-radius: 12px;
			}
		}

		&__content {
			padding-right: 24px;
			height: max-content;
			flex: 1 0 auto;
			overflow: visible;

			p {
				font-size: clamp(2.4rem, 3.4vw, 3.4rem);
				line-height: calc(44 / 36);
				font-weight: 00;
				letter-spacing: -0.72px;
				margin-bottom: 32px;
			}

			address {
				font-style: normal;
				font-size: clamp(1.6rem, 1.8vw, 1.8rem);
				line-height: calc(28 / 18);

				strong {
					display: block;
					margin-bottom: clamp(0rem, 0.4vw, 0.4rem);
				}

				div {
					font-size: clamp(1.4rem, 1.6vw, 1.6rem);
					line-height: calc(24 / 16);
				}
			}
		}

		&__buttons {
			display: flex;
			gap: 32px;
			position: absolute;
			right: 0;
			bottom: 0;

			@media (width < 768px) {
				bottom: -88px;
				justify-content: space-between;
				width: 100%;
			}

			button {
				display: block;
				height: 56px;
				width: 56px;
				border-radius: 50%;
				background-color: var(--color-white);
				cursor: pointer;
				border: 1px solid var(--color-border);
				transition: background 0.6s ease;

				&:hover {
					@media (pointer: fine) {
						&:not([disabled]) {
							background: var(--color-border);
						}
					}
				}

				i {
					color: black;
					font-size: 2.4rem;
					transition: color 0.6s ease;
				}

				&:global([disabled]) {
					cursor: default;

					i {
						color: grey;
					}
				}
			}

			button:hover {
				@media (pointer: fine) {
					&:not([disabled]) {
						background: var(--color-border);
					}
				}
			}
		}

		&__dots {
			position: absolute;
			bottom: -30px;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			gap: 8px;

			:global(button) {
				border: none;
				display: block;
				height: 8px;
				width: 8px;
				border-radius: 50%;
				background-color: rgb(228, 228, 231);
				padding: 0;
				cursor: pointer;
				transition: background 0.6s ease;

				&:hover {
					background-color: rgb(grey, 0.3);
				}
			}

			:global(button.is-active) {
				background-color: grey;
			}
		}

		:global(.no-more-right) {
			animation: shake 0.5s ease;
		}

		@keyframes shake {
			0%,
			100% {
				transform: translateX(0);
			}

			25% {
				transform: translateX(-5px);
			}

			75% {
				transform: translateX(5px);
			}
		}

		:global(.no-more-left) {
			animation: shake-left 0.5s ease;
		}

		@keyframes shake-left {
			0%,
			100% {
				transform: translateX(0);
			}

			25% {
				transform: translateX(5px);
			}

			75% {
				transform: translateX(-5px);
			}
		}
	}
</style>
