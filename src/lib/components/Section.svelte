<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		size?: 'slim' | 'medium' | 'large';
		bare?: boolean;
		appended?: boolean;
		prepended?: boolean;
		style?: string;
		id?: string;
	};

	const { size, bare, appended, prepended, id, children, ...restProps }: Props = $props();
</script>

<section class={size} class:bare class:appended class:prepended {...restProps} {id}>
	{@render children()}
</section>

<style lang="scss">
	section {
		padding-top: 70px;
		padding-bottom: 70px;
		position: relative;

		@include media-sm {
			padding-top: 12vw;
			padding-bottom: 12vw;
		}

		@include media-lg {
			padding-top: 120px;
			padding-bottom: 120px;
		}

		&.slim {
			@include media-sm {
				padding-top: 10vw;
				padding-bottom: 10vw;
			}

			@include media-lg {
				padding-top: 100px;
				padding-bottom: 100px;
			}
		}

		&.medium {
			@include media-sm {
				padding-top: 14.4vw;
				padding-bottom: 14.4vw;
			}

			@include media-lg {
				padding-top: 144px;
				padding-bottom: 144px;
			}
		}

		&.large {
			@include media-sm {
				padding-top: 20vw;
				padding-bottom: 20vw;
			}

			@include media-lg {
				padding-top: 200px;
				padding-bottom: 200px;
			}
		}

		&.appended {
			padding-top: 0;

			@include media-sm {
				padding-top: 0;
			}

			@include media-lg {
				padding-top: 0;
			}
		}

		&.prepended {
			padding-bottom: 0;

			@include media-sm {
				padding-bottom: 0;
			}

			@include media-lg {
				padding-bottom: 0;
			}
		}

		&.bare {
			padding-top: 0;
			padding-bottom: 0;

			@include media-sm {
				padding-top: 0;
				padding-bottom: 0;
			}

			@include media-lg {
				padding-top: 0;
				padding-bottom: 0;
			}
		}
	}
</style>
