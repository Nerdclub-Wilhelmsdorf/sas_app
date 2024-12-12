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
<Heading tag="h2" class="mt-6 text-center" customSize="text-4xl font-bold">Code von {User.name}:</Heading>

<div class="flex justify-center items-center">
	<svg
    class="mr-6 ml-6 mt-0 max-w-xl"
	use:qr={{
		data: `w:${User.name}`,
		shape: 'square',
	}}
/>
</div>


