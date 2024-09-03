<script lang="ts">
	type Props = {
		color?: string;
	};

	const { color = '#FFFFFF' }: Props = $props();
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M8 11.3H7.3V12.7H8V11.3ZM16 12.7C16.3866 12.7 16.7 12.3866 16.7 12C16.7 11.6134 16.3866 11.3 16 11.3V12.7ZM8 12.7L16 12.7V11.3L8 11.3V12.7Z" fill={color} />
	<path d="M12 8L16 12L12 16" stroke={color} stroke-width="1.4" stroke-linecap="square" stroke-linejoin="round" />
</svg>
