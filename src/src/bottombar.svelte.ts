import { handleBalance } from "./req/get_balance";
import { convertHistory, getHistory } from "./req/get_history";
import { gettimepin, getTimestamp } from "./req/obfuscatePin";
import { Balance, CurrentError, currentPage, CurrentPage, setCurrentPage, User } from "./stores.svelte";

export const gray = "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
export const primary = "text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
let isLoading = true;
export let payColors = $state({color: primary});
export let balanceColors = $state({color: gray});
export let qrColors = $state({color: gray});


export async function handleBalanceClick() {
  if (currentPage.page != CurrentPage.Balance) {
    let [success, error_msg] = await updateBalance();
    if (!success) {
        CurrentError.hasError = true;
        CurrentError.error = error_msg;
        isLoading = false;
      return;
    }
    [success, error_msg] = await updateHistory();
    if (!success) {
      CurrentError.hasError = true;
      CurrentError.error = error_msg;
      isLoading = false;
    return;
  }
    setCurrentPage(CurrentPage.Balance);
    balanceColors.color = primary;
    payColors.color = gray;
    qrColors.color = gray;
  }
}
export function handlePayClick() {
 if (currentPage.page != CurrentPage.Pay) {
   setCurrentPage(CurrentPage.Pay);
    payColors.color = primary;
    balanceColors.color = gray;
    qrColors.color = gray;
  }
}
export function handleQRClick() {
  if (currentPage.page != CurrentPage.QR) {

    setCurrentPage(CurrentPage.QR);
    qrColors.color = primary;
    payColors.color = gray;
    balanceColors.color = gray;
  }
  }


export async function updateBalance(): Promise<[boolean, string]> {
  let resp: Response;
  let timestamp: string;
  try {
    try {
      timestamp = await getTimestamp()
    } catch(error: any) {
      return [false, String(error)]
    }
    resp = await handleBalance(User.name, gettimepin(User.pin, timestamp))
    if (resp.status === 200) {
      Balance.balance = await resp.text();
      return[ true,""];
    }
    if(resp.status != 201){
      return [false, "Bitte überprüfe deine Internetverbindung."];
    }
    return [false, await resp.text()];
  } catch (error) {
    return [false, "Bitte überprüfe deine Internetverbindung."];
  }

}

export async function updateHistory(): Promise<[boolean, string]> {
  let resp: Response;
  let timestamp: string;
  try {
    try {
      timestamp = await getTimestamp()
    } catch(error: any) {
      return [false, String(error)]
    }
    resp = await getHistory(User.name, gettimepin(User.pin, timestamp))
    if (resp.status === 200) {
      Balance.history = convertHistory(await resp.text());
      return[ true,""];
    }
    if(resp.status != 201){
      return [false, "Bitte überprüfe deine Internetverbindung."];
    }
    return [false, await resp.text()];
  } catch (error) {
    return [false, "Bitte überprüfe deine Internetverbindung."];
  }

}

