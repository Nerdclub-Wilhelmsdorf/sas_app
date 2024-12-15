<script>
  import { Button, Toast } from "flowbite-svelte";
  import BottomBar from "./lib/BottomBar.svelte";
  import { biometricsAvailable, CurrentPage, currentPage, isLoggedIn, User } from "./src/stores.svelte";
  import Pay from "./lib/Pay.svelte";
  import Qr from "./lib/Qr.svelte"; // Capitalize the component name
  import Transactions from "./lib/Transactions.svelte";
  import Header from "./lib/Header.svelte";
  import ErrorModal from "./lib/errorModal.svelte";
  import Loading from "./lib/Loading.svelte";
  import PinModal from "./lib/PinModal.svelte";
  import { checkStatus } from '@tauri-apps/plugin-biometric';
    import { onMount } from "svelte";
    import QrScanImpl from "./lib/QrCodeScanner.svelte";
    import QrScan from "./lib/QrScan.svelte";
    import LogIn from "./lib/LogIn.svelte";
    import { checkIsLoggedIn, logout } from "./src/login.svelte";
  onMount(async () => {
    let status = await checkStatus();
    biometricsAvailable.available = status.isAvailable;
    let loggedIn = await checkIsLoggedIn();
    if(typeof loggedIn == "boolean") {
      isLoggedIn.loggedIn = false;
      currentPage.page = CurrentPage.Login;
    } else {
      User.name = loggedIn.name;
      User.pin = loggedIn.pin;
      isLoggedIn.loggedIn = true;
      currentPage.page = CurrentPage.Pay;
    }
  });
  $effect(() => {
    if (isLoggedIn) {
      currentPage.page = CurrentPage.Login;
    }
  });
  let activeUrl = "/";
</script>

<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" />

<style>
  .app-container {
    min-height: 100vh; /* Ensure the container takes up the full viewport height */
    display: flex;
    flex-direction: column;
  }
  .content {
    flex: 1; /* Allow the content to grow and take up available space */
  }
</style>
<Loading/>
<ErrorModal/>
<PinModal/>
<QrScan/>
<div class="app-container">
  <Header/>

  <div class="content">
    {#if currentPage.page == CurrentPage.Pay}
      <Pay/>
    {:else if currentPage.page == CurrentPage.Login}
      <LogIn/>
    {:else if currentPage.page == CurrentPage.QR}
      <Qr/>
    {:else if currentPage.page == CurrentPage.Balance}
      <Transactions/>
    {/if}
  </div>

  <BottomBar/>
</div>

