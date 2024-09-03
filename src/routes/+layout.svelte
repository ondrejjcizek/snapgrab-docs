<script lang="ts">
	type Props = {
		children: Snippet;
	};

	const { children }: Props = $props();

	import '$lib/styles/main.scss';
	import type { Snippet } from 'svelte';
	import { browser } from '$app/environment';
	import Lenis from 'lenis';
	import { lenisStore as lenis, setLenisStore } from '$lib/stores/lenis';
	import { page } from '$app/stores';

	$effect(() => {
		const lenisInstance = new Lenis();
		setLenisStore(lenisInstance);

		if (browser && lenisInstance) {
			lenisInstance.start();
		}

		// function onLinkClick(e: MouseEvent) {
		// 	e.preventDefault();

		// 	const node = e.currentTarget;
		// 	const nodeHash = (node as HTMLLinkElement).href.split('#').pop();

		// 	hash = '#' + nodeHash;

		// 	setTimeout(() => {
		// 		window.location.hash = hash;
		// 	}, 0);

		// 	if (browser && lenisInstance && hash) {
		// 		const target = document.querySelector(hash);
		// 		// eslint-disable-next-line svelte/valid-compile
		// 		$lenis?.start();
		// 		if (target instanceof HTMLElement) {
		// 			// eslint-disable-next-line svelte/valid-compile
		// 			$lenis?.scrollTo(target, { offset: -24, duration: 1.3, easing: (t: number) => t * (2 - t) });
		// 		}
		// 	}
		// }

		// const internalLinks: Element[] = [...document.querySelectorAll('[href]')].filter((node) => (node as HTMLLinkElement).href.includes($page.url.pathname + '#'));

		// internalLinks.forEach((node) => {
		// 	(node as HTMLLinkElement).addEventListener('click', onLinkClick, false);
		// });

		function raf(time: number) {
			lenisInstance.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			// internalLinks.forEach((node) => {
			// 	(node as HTMLLinkElement).removeEventListener('click', onLinkClick, false);
			// });

			lenisInstance.destroy();
		};
	});
</script>

{@render children()}
