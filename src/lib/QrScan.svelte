
<script>
    import { Button, Modal, Spinner } from 'flowbite-svelte';
    import { CircleX } from 'lucide-svelte';
    import { CurrentError, CurrentPage, currentPage, isLoading, loginData, Partner, QrCodeModal } from '../src/stores.svelte';
    import QrScanImpl from './QrCodeScanner.svelte';
    import QrCodeScanner from './QrCodeScanner.svelte';
    import Pay from './Pay.svelte';
    let paused = $state(false);
  </script>
    
  <Modal bind:open={QrCodeModal.open} size="xs" dismissable={false}>
    <QrCodeScanner 
    scanSuccess={(/** @type {string} */ e) => {
        if (String(e).startsWith('w:')) {
            QrCodeModal.disableScan = true;
            if(currentPage.page == CurrentPage.Pay) {
                Partner.partner = e.substring(2);
            } else if(currentPage.page == CurrentPage.Login) {
                loginData.name = e.substring(2);
            }
        } else {
            
        }
    }}
    scanFailure={() => {}}
    paused={paused}
    width={320}
    height={320}
    class="w-full max-w-sm bg-slate-700 rounded-lg overflow-hidden"
/>
    <Button
        slot="footer"
        color="primary"
        size="lg"
        on:click={() => {
            QrCodeModal.disableScan = true;
        }}
    >
        Schließen
    </Button>
  </Modal>
  