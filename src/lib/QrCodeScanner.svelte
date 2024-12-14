<script lang="ts">
    import { onMount } from 'svelte';
    import {
        Html5QrcodeScanner,
        type Html5QrcodeResult,
        Html5QrcodeScanType,
        Html5QrcodeSupportedFormats,
        Html5QrcodeScannerState,
    } from 'html5-qrcode';
    import { Button, Modal } from 'flowbite-svelte';
    import { QrCodeModal } from '../src/stores.svelte';

    let { scanSuccess, scanFailure, class: klass, width, height, paused = false } = $props();

    let scanner: Html5QrcodeScanner;
    onMount(() => {
        scanner = new Html5QrcodeScanner(
            'qr-scanner',
            {
                
                fps: 10,
                qrbox: { width, height },
                aspectRatio: 1,
                supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
                formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
            },
            false // non-verbose
        );
        scanner.render(scanSuccess, scanFailure);
    });
    // pause/resume scanner to avoid unintended scans

    $effect(() => {
        if (QrCodeModal.disableScan) {
            scanner?.clear();
            QrCodeModal.open = false;
        }
        if (paused && scanner?.getState() === Html5QrcodeScannerState.SCANNING) {
            scanner?.pause();
        } else if (scanner?.getState() === Html5QrcodeScannerState.PAUSED) {
            scanner?.resume();
        }
    })
</script>

<div id="qr-scanner" class={klass} />

<style>
    /* Hide unwanted icons */
    #qr-scanner :global(img[alt='Info icon']),
    #qr-scanner :global(img[alt='Camera based scan']) {
        display: none;
    }

    /* Change camera permission button text */
    #qr-scanner :global(#html5-qrcode-button-camera-permission) {
        visibility: hidden;
    }
    #qr-scanner :global(#html5-qrcode-button-camera-permission::after) {
        position: absolute;
        inset: auto 0 0;
        display: block;
        content: 'Kamera zugriff erlauben';
        visibility: visible;
        padding: 10px 0;
    }
</style>