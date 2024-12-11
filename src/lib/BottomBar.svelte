<script>
    import { BottomNav, BottomNavItem } from "flowbite-svelte";
    import { QrCode, UserRound, Wallet } from "lucide-svelte";
    import {handleBalanceClick, handlePayClick, handleQRClick, payColors, balanceColors, qrColors} from "../src/bottombar.svelte";

</script>

<overlay>
    <BottomNav position="absolute" classInner="grid-cols-3" activeUrl="/">
      <BottomNavItem btnName="Bezahlen" class = {payColors.color} on:click={handlePayClick}>
        <UserRound class = {payColors.color} style="outline: none; box-shadow: none; border: none;" />
      </BottomNavItem>

      <BottomNavItem btnName="QR-Code" class = {qrColors.color } on:click={handleQRClick}>
        <QrCode class = {qrColors.color} style="outline: none; box-shadow: none; border: none;" />
      </BottomNavItem>

      <BottomNavItem btnName="Transaktionen" class = {balanceColors.color} on:click={handleBalanceClick}>
        <Wallet class = {balanceColors.color}  style="outline: none; box-shadow: none; border: none;" />
      </BottomNavItem>
    </BottomNav>
</overlay>

  
  