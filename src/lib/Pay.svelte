<script>
    import {  Button, Checkbox, Input, Label, P , ButtonGroup} from "flowbite-svelte";
    import { QrCode} from "lucide-svelte";
    let inputAmount = $state("");
</script>

<P class="mb-2 mt-20 ml-10" size="lg">Empfänger</P>
<div class="mb-3 flex items-center">
    <div class="w-full flex items-center">
        <Input
            placeholder="Kontonummer des Senders"
            required
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

<P class="mb-2 mt-10 ml-10" size="lg">Betrag</P>
<div class="mb-3 flex items-center">
    <div class="w-full flex items-center">
        <Input
            bind:value={inputAmount}
            placeholder="12"
            required
            size="lg"
            class="mr-20 ml-10"
            autocomplete="one-time-code"
        />
    </div>
</div>

<div class="grid flex justify-center items-center" style="position: fixed; bottom: 30%; width: 100%;">
    <Label class="flex justify-center items-center">Sender Bezahlt: 
        {#if inputAmount !== ""} {inputAmount}{/if} 
    </Label> 
    <Label class="flex justify-center items-center">Empfänger erhält: 
        {#if inputAmount !== ""}{Number(inputAmount) - (Number(inputAmount) / 10)}{/if}
    </Label>
</div>

<div class="flex justify-center items-center" style="position: fixed; bottom: 5%; width: 100%;">
    <Button class="mb-40" size="lg">Weiter</Button>
</div>


