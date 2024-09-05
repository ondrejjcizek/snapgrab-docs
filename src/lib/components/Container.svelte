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
		padding-left: 24px;
		padding-right: 24px;
		max-width: 1630px;
		position: relative;
		box-sizing: content-box;

		&.slim {
			max-width: 1440px;
		}

		&.full {
			max-width: 1920px;
		}

		&.pure {
			padding: 0;
			position: static;
		}
	}
</style>
