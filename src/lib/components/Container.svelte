<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		size?: 'slim' | 'full';
		pure?: boolean;
		style?: string;
	};

	const { size, pure, children, ...rest }: Props = $props();
</script>

<div class={`Container ${size}`} class:pure {...rest}>{@render children()}</div>

<style lang="scss">
	div {
		margin: 0 auto;
		padding-left: $content-padding;
		padding-right: $content-padding;
		max-width: $container-width;
		position: relative;
		box-sizing: content-box;

		&.slim {
			max-width: $container-width-slim;
		}

		&.full {
			max-width: $container-width-full;
		}

		&.pure {
			padding: 0;
			position: static;

			@include media-md {
				padding: 0;
			}

			@include media-lg {
				padding: 0;
			}
		}
	}
</style>
