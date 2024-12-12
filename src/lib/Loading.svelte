<script>
    import { Button, Modal, Spinner } from 'flowbite-svelte';
    import { CircleX } from 'lucide-svelte';
    import { CurrentError, isLoading } from '../src/stores.svelte';
  </script>
    
  <Modal bind:open={isLoading.loading} size="xs" class="w-1/2" dismissable={false}>
    <div class="text-center">
      <Spinner size={14}/>
      <h3 class="mb-3 mt-5 text-lg font-normal dark:text-white">Laden...</h3>

    </div>
  </Modal>
  
  