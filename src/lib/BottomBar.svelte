<script lang="ts">
    import { BottomNav, BottomNavItem } from "flowbite-svelte";
    import { QrCode, UserRound, Wallet } from "lucide-svelte";
    import {handleBalanceClick, handlePayClick, handleQRClick, payColors, balanceColors, qrColors} from "../src/bottombar.svelte";
    import { onMount } from "svelte";
    import { CurrentError, isLoading, isLoggedIn, PinInputModal, QrCodeModal } from "../src/stores.svelte";
    import PinModal from "./PinModal.svelte";
    import { platform } from '@tauri-apps/plugin-os';
    let modalOpen = $state(false);
    $effect(() => {
        modalOpen = (CurrentError.hasError || isLoading.loading || PinInputModal.open || QrCodeModal.open || !isLoggedIn.loggedIn);
    });

</script>
{#if !modalOpen}
<BottomNav position="fixed" classInner="grid-cols-3" activeUrl="/" style={String(platform()) == "ios" ? "bottom: 0; width: 100%; height: 10vh;" : ""}>
  <BottomNavItem btnName="Bezahlen" class="{payColors.color} mb-4" on:click={handlePayClick}>
    <UserRound class={payColors.color} style="outline: none; box-shadow: none; border: none;" />
  </BottomNavItem>

  <BottomNavItem btnName="QR-Code" class="{qrColors.color} mb-4" on:click={handleQRClick}>
    <QrCode class={qrColors.color} style="outline: none; box-shadow: none; border: none;" />
  </BottomNavItem>

  <BottomNavItem btnName="Konto" class="{balanceColors.color} mb-4" on:click={handleBalanceClick}>
    <Wallet class={balanceColors.color} style="outline: none; box-shadow: none; border: none;" />
  </BottomNavItem>
</BottomNav>
{/if}
  