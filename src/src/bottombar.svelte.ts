import { CurrentPage, setCurrentPage } from "./stores.svelte";

export const gray = "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
export const primary = "text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
let isLoading = true;
export let payColors = $state({color: gray});
export let balanceColors = $state({color: gray});
export let qrColors = $state({color: gray});


export function handleBalanceClick() {
    setCurrentPage(CurrentPage.Balance);
    balanceColors.color = primary;
    payColors.color = gray;
    qrColors.color = gray;
  }

export function handlePayClick() {
   setCurrentPage(CurrentPage.Pay);
    payColors.color = primary;
    balanceColors.color = gray;
    qrColors.color = gray;
  }

export function handleQRClick() {
    setCurrentPage(CurrentPage.QR);
    qrColors.color = primary;
    payColors.color = gray;
    balanceColors.color = gray;
  }
