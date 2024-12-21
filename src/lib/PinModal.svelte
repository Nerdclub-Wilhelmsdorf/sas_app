<script lang="ts">
    import { Button, Input, Modal, P } from 'flowbite-svelte';
    import { ArrowLeft, CircleX, Shuffle } from 'lucide-svelte';
    import { CurrentError, inputAmount, Partner, PinInputModal, User } from '../src/stores.svelte';
    import toast, { Toaster } from 'svelte-5-french-toast';
    import { handleSend } from '../src/handleSend';
  

    function handleNumberClick(num: number) {
      PinInputModal.pin += num;
    }
  
    function handleShuffle() {
      numbers = numbers.sort(() => Math.random() - 0.5);
    }
    let numbers = $state([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    function handleRemoveLast() {
      PinInputModal.pin = PinInputModal.pin.slice(0, -1);
    }
    let isEnabled = $state(false);
    $effect (() => {
      if (PinInputModal.pin.length == 4 && !isNaN(Number(PinInputModal.pin))) {
        isEnabled = true;
      } else {
        isEnabled = false;
      }
    });

  </script>
  <Toaster />
  <Modal bind:open={PinInputModal.open} class="w-10/12 max-h-full" on:close={() =>{
    PinInputModal.pin = "";
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  }}>
    <div class="flex flex-col justify-center items-center h-full">
      <Input
        placeholder="PIN"
        required
        bind:value={PinInputModal.pin}
        class="mr-2 ml-2 mt-5"
        size="lg"
        type="password"
        autocomplete="one-time-code"
        disabled 
      />
      <div class="grid grid-cols-3 gap-2 mt-5">
        {#each numbers.slice(0, 9) as number}
          <Button class="h-16 w-16 text-xl" on:click={() => handleNumberClick(number)}>{number}</Button>
        {/each}
        <Button class="h-16 w-16" on:click={handleShuffle}><Shuffle></Shuffle></Button>
        <Button class="h-16 w-16 text-xl" on:click={() => handleNumberClick(numbers[9])}>{numbers[9]}</Button>
        <Button class="h-16 w-16" on:click={handleRemoveLast}><ArrowLeft></ArrowLeft></Button>
      </div>
      <Button class="mt-6" disabled={!isEnabled} on:click={async () => {{
        PinInputModal.open = false;
        let resp = await handleSend(Partner.partner, User.name ,inputAmount.amount, PinInputModal.pin);
        if (resp) {
            toast.success("Erfolgreich erhalten: " + (Number(inputAmount.amount) - Number(inputAmount.amount)/10) + "D");
            inputAmount.amount = "";
            Partner.partner = "";
            }
        PinInputModal.pin = '';
        }
      }}>Weiter</Button>
    </div>
  </Modal>