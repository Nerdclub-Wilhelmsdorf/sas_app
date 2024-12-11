<script>
  import { Button } from "flowbite-svelte";
  import BottomBar from "./lib/BottomBar.svelte";
  import { CurrentPage, currentPage } from "./src/stores.svelte";
  import Pay from "./lib/Pay.svelte";
  import QRCode from "./lib/qrcode.svelte"; // Capitalize the component name
  import Transactions from "./lib/Transactions.svelte";
  let activeUrl = "/";
</script>

<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />

{#if currentPage.page == CurrentPage.Pay}
  <Pay/>
{:else if currentPage.page == CurrentPage.QR}
  <QRCode/>
{:else if currentPage.page == CurrentPage.Balance}
  <Transactions/>
{/if}

<BottomBar/>
