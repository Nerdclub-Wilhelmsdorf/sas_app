<script>
    import toast, {Toaster} from 'svelte-5-french-toast'
    import {  Button, Checkbox, Input, Label, P , ButtonGroup} from "flowbite-svelte";
    import { QrCode} from "lucide-svelte";
    import { BiometricOptions, CurrentError, inputAmount, Partner, PinInputModal, User } from "../src/stores.svelte";
    import { handleSend } from "../src/handleSend";
    import PinModal from './PinModal.svelte';
    import { authenticate } from '@tauri-apps/plugin-biometric';
    const dataSender = {
        topText: "Empfänger",
        hintText: "Kontonummer des Empfängers",
    }
    const dataReciever = {
        topText: "Sender",
        hintText: "Kontonummer des Senders",
    }
    let data = $state(dataSender);
    let isRecieve = $state(false);
    let canContinue = $state(false);
    $effect(() => {
        if (inputAmount.amount == "" || Partner.partner == "") {
            canContinue = false;
        } else {
            if (isNaN(Number(inputAmount.amount))) {
                canContinue = false;
            } else {
                if (Number(inputAmount.amount) > 0 && Partner.partner != User.name) {
                    canContinue = true;
                } else {
                    canContinue = false;
                }
            }
        }
    });
    $effect(() => {
        if (isRecieve) {
            data = dataReciever;
        } else {
            data = dataSender;
        }
    });
</script>
<Toaster />
<P class="mb-2 mt-20 ml-10" size="lg">{data.topText}</P>
<div class="mb-3 flex items-center">
    <div class="w-full flex items-center">
        <Input
            placeholder={data.hintText}
            required
            bind:value={Partner.partner}
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
            bind:value={inputAmount.amount}
            placeholder="12"
            required
            size="lg"
            class="ml-10"
            style="margin-right: 4.4rem"
            autocomplete="one-time-code"
        />
    </div>
</div>

<div class="grid justify-center items-center" style="position: fixed; bottom: 30%; width: 100%;">

</div>

<div class="grid justify-center items-center" style="position: fixed; bottom: 20%; width: 100%;">
    <Label class="flex justify-center items-center">Sender Bezahlt: 
        {#if inputAmount.amount !== ""} {inputAmount.amount + "D"}{/if} 
    </Label> 
    <Label class="flex justify-center items-center mb-2">Empfänger erhält: 
        {#if inputAmount.amount !== ""}{Number(inputAmount.amount) - (Number(inputAmount.amount) / 10) + "D"}{/if}
    </Label>
    <Button class="mb-10 py-6 px-24 text-2xl rounded-full" on:click={async () => {
        try {
            await authenticate('Bitte authentifiziere dich.', BiometricOptions);
        } catch{
            CurrentError.error = "Fehler bei der Authentifizierung.";
            CurrentError.hasError = true;
        }
        if(!isRecieve){
           let resp = await handleSend(User.name,Partner.partner ,inputAmount.amount, User.pin);
           if (resp) {
            toast.success("Erfolgreich überwiesen: " + inputAmount.amount + "D");
            inputAmount.amount = "";
            Partner.partner = "";
            } else {
           }
        }else {
            PinInputModal.open = true;
        }
    }} size="lg" disabled={!canContinue}>Weiter</Button>
</div>

<div class="grid justify-center items-center" style="position: fixed; bottom: 5%; width: 100%;">
    <ButtonGroup class="mt-10 mb-16">
        <Button color={isRecieve ? "alternative" : "primary"} on:click={() => isRecieve = false} class="w-28">Senden</Button>
        <Button color={!isRecieve ? "alternative" : "primary"} on:click={() => isRecieve = true} class="w-28">Empfangen</Button>
    </ButtonGroup>
</div>