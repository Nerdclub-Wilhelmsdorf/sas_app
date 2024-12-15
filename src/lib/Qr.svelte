<script>
    import {User} from '../src/stores.svelte';
    import {P,Heading} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import QrCode from "svelte-qrcode"


</script>
<Heading tag="h2" class="mt-6 text-center" customSize="text-4xl font-bold">Code von {User.name}:</Heading>

<div class="container flex justify-center items-center">
	<QrCode padding=0 size=300 value="w:{User.name}" />
</div>


