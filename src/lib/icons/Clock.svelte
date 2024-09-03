<script lang="ts">
	type Props = {
		color?: string;
	};

	const { color = '#323232' }: Props = $props();
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		d="M8.94117 5.61069C13.0227 3.92009 17.702 5.85835 19.3926 9.93991C21.0832 14.0215 19.1449 18.7007 15.0634 20.3913C10.9818 22.0819 6.30256 20.1437 4.61195 16.0621C2.92135 11.9806 4.85961 7.3013 8.94117 5.61069"
		stroke={color}
		stroke-width="1.50004"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path d="M3.44922 5.81004L6.44922 3.29004" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M20.5586 5.8198L17.5586 3.2998" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M11.75 9.43213V13.5671L15 15.5491" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
