<script>
    import {User} from '../src/stores.svelte';
    import {P,Heading} from 'flowbite-svelte';
	import { qr } from '@svelte-put/qr/svg';
	import { onMount } from 'svelte';

	const config = {
		data: 'https://svelte.dev',
		width: 300,
		height: 300,
		backgroundFill: '#fff',
	};

</script>
<Heading tag="h2" class="mt-5 ml-12" customSize="text-4xl font-bold">Code von {User.name}:</Heading>

<svg
    class="mr-10 ml-10 mt-3"
	use:qr={{
		data: `w:${User.name}`,
		shape: 'square',
	}}
/>
