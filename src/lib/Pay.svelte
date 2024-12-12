<script>
    import {  Button, Checkbox, Input, Label, P , ButtonGroup} from "flowbite-svelte";
    import { QrCode} from "lucide-svelte";
    import { User } from "../src/stores.svelte";
    let inputAmount = $state("");
    let Partner = $state("");
    let isRecieve = $state(false);
    let canContinue = $state(false);
    $effect(() => {
        if (inputAmount == "" || Partner == "") {
            canContinue = false;
        } else {
            if (isNaN(Number(inputAmount))) {
                canContinue = false;
            } else {
                if (Number(inputAmount) > 0 && Partner != User.name) {
                    canContinue = true;
                } else {
                    canContinue = false;
                }
            }
        }
    });
</script>

<P class="mb-2 mt-20 ml-10" size="lg">Empfänger</P>
<div class="mb-3 flex items-center">
    <div class="w-full flex items-center">
        <Input
            placeholder="Kontonummer des Senders"
            required
            bind:value={Partner}
            class="mr-2 ml-10"
            size = "lg"
            autocomplete="one-time-code"
        />
        <QrCode
                on:click={() => console.log("QR-Code clicked")}
                class=" h-6 mr-10 text-primary-500"
                size="30"
                style="outline: none; box-shadow: none; border: none;"
            />

    </div>
</div>

<P class="mb-2 mt-5 ml-10" size="lg">Betrag</P>
<div class="mb-3 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={inputAmount}
            placeholder="12"
            required
            size="lg"
            class="ml-10"
            style="margin-right: 4.4rem"
            autocomplete="one-time-code"
        />
    </div>
</div>

<div class="grid flex justify-center items-center" style="position: fixed; bottom: 30%; width: 100%;">

</div>

<div class="grid justify-center items-center" style="position: fixed; bottom: 20%; width: 100%;">
    <Label class="flex justify-center items-center">Sender Bezahlt: 
        {#if inputAmount !== ""} {inputAmount + "D"}{/if} 
    </Label> 
    <Label class="flex justify-center items-center mb-2">Empfänger erhält: 
        {#if inputAmount !== ""}{Number(inputAmount) - (Number(inputAmount) / 10) + "D"}{/if}
    </Label>
    <Button class="mb-10 py-6 px-24 text-2xl rounded-full" size="lg" disabled={!canContinue}>Weiter</Button>
</div>

<div class="grid justify-center items-center" style="position: fixed; bottom: 5%; width: 100%;">
    <ButtonGroup class="mt-10 mb-16">
        <Button color={isRecieve ? "alternative" : "primary"} on:click={() => isRecieve = false} class="w-28">Senden</Button>
        <Button color={!isRecieve ? "alternative" : "primary"} on:click={() => isRecieve = true} class="w-28">Empfangen</Button>
    </ButtonGroup>
</div>