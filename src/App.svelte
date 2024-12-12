<script>
  import { Button } from "flowbite-svelte";
  import BottomBar from "./lib/BottomBar.svelte";
  import { CurrentPage, currentPage } from "./src/stores.svelte";
  import Pay from "./lib/Pay.svelte";
  import Qr from "./lib/Qr.svelte"; // Capitalize the component name
  import Transactions from "./lib/Transactions.svelte";
  import Header from "./lib/Header.svelte";
  let activeUrl = "/";
</script>

<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />

<Header/>

{#if currentPage.page == CurrentPage.Pay}
  <Pay/>
{:else if currentPage.page == CurrentPage.QR}
  <Qr/>
{:else if currentPage.page == CurrentPage.Balance}
  <Transactions/>
{/if}

<BottomBar/>
