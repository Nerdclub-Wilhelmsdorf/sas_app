<script>
    import { BottomNav, BottomNavItem } from "flowbite-svelte";
    import { QrCode, UserRound, Wallet } from "lucide-svelte";
    import {handleBalanceClick, handlePayClick, handleQRClick, payColors, balanceColors, qrColors} from "../src/bottombar.svelte";
    import { onMount } from "svelte";
    import { CurrentError, isLoading, PinInputModal } from "../src/stores.svelte";
    import PinModal from "./PinModal.svelte";
    let modalOpen = $state(false);
    $effect(() => {
        modalOpen = (CurrentError.hasError || isLoading.loading || PinInputModal.open);
    });

</script>
{#if !modalOpen}
<BottomNav position="fixed" classInner="grid-cols-3" activeUrl="/" style="bottom: 0; width: 100%;">
  <BottomNavItem btnName="Bezahlen" class={payColors.color} on:click={handlePayClick}>
    <UserRound class={payColors.color} style="outline: none; box-shadow: none; border: none;" />
  </BottomNavItem>

  <BottomNavItem btnName="QR-Code" class={qrColors.color} on:click={handleQRClick}>
    <QrCode class={qrColors.color} style="outline: none; box-shadow: none; border: none;" />
  </BottomNavItem>

  <BottomNavItem btnName="Konto" class={balanceColors.color} on:click={handleBalanceClick}>
    <Wallet class={balanceColors.color} style="outline: none; box-shadow: none; border: none;" />
  </BottomNavItem>
</BottomNav>
{/if}
  