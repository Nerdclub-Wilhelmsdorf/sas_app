
<script>
    import { Button, Modal, Spinner } from 'flowbite-svelte';
    import { CircleX } from 'lucide-svelte';
    import { CurrentError, isLoading, Partner, QrCodeModal } from '../src/stores.svelte';
    import QrScanImpl from './QrCodeScanner.svelte';
    import QrCodeScanner from './QrCodeScanner.svelte';
  </script>
    
  <Modal bind:open={QrCodeModal.open} size="xs" dismissable>
    <QrCodeScanner 
    scanSuccess={(e) => {
        if (String(e).startsWith('w:')) {
            Partner.partner = e.substring(2);
            QrCodeModal.open = false;
        } else {
            
        }
    }}
    scanFailure={(e) => {}}
    paused={false}
    width={320}
    height={320}
    class="w-full max-w-sm bg-slate-700 rounded-lg overflow-hidden"
/>
  </Modal>
  