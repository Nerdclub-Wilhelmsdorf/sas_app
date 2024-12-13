<script>
    import {User} from '../src/stores.svelte';
    import {P,Heading} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import QrCode from "svelte-qrcode"
	const config = {
		data: 'https://svelte.dev',
		width: 300,
		height: 300,
		backgroundFill: '#fff',
	};

</script>
<Heading tag="h2" class="mt-6 text-center" customSize="text-4xl font-bold">Code von {User.name}:</Heading>

<div class="flex justify-center items-center">
	<QrCode value="W:{User.name}" />
</div>


