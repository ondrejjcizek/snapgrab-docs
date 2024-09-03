<script lang="ts">
	type Props = {
		color?: string;
	};

	const { color = '#323232' }: Props = $props();
</script>

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path d="M12 3C16.982 3 21 7.018 21 12C21 16.982 16.982 21 12 21" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M12 21C7.018 21 3 16.982 3 12C3 7.018 7.018 3 12 3" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M10.1675 4.06024C7.2775 8.88524 7.2775 15.1162 10.1675 19.9412C11.0135 21.3542 12.9865 21.3542 13.8325 19.9412C16.7225 15.1162 16.7225 8.88524 13.8325 4.06024C12.9855 2.64724 11.0135 2.64724 10.1675 4.06024Z"
		stroke={color}
		stroke-width="1.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path d="M4.01172 7.85791C8.90372 9.36891 15.0997 9.36891 19.9907 7.85791" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M19.9907 16.142C15.0987 14.631 8.90272 14.631 4.01172 16.142" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
