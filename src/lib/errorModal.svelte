<script>
    import { Button, Modal } from 'flowbite-svelte';
    import { CircleX } from 'lucide-svelte';
    import { CurrentError } from '../src/stores.svelte';
    let popupModal = false;
  </script>
    
  <Modal bind:open={CurrentError.hasError} size="xs" autoclose on:outclick outsideclose>
    <div class="text-center">
      <CircleX class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
        <h2 class="mb-2 text-xl font-semibold dark:text-white">Fehler</h2>
      <h3 class="mb-5 text-lg font-normal dark:text-white">{CurrentError.error}</h3>

    </div>
  </Modal>
  
  