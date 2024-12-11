<script>
    import {  Button, Checkbox, Input, Label } from "flowbite-svelte";
    import { QrCode} from "lucide-svelte";

</script>

<Label class="mb-2 mt-20 ml-10">Sender</Label>
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

<Label class="mb-2 mt-4 ml-2">Betrag</Label>
<div class="mb-6 ml-2 flex items-center">
    <div class="w-full flex items-center">
        <Input
            placeholder="0.0D"
            required
            class="mr-2"
            autocomplete="one-time-code"
        />
    </div>
</div>

<Label class="mb-2 mt-4 ml-2"></Label>
<div class="mb-6 ml-2 flex items-center">
    <div class="w-full flex items-center">
        <Button >Weiter</Button>
    </div>
</div>


