import { authenticate } from "@tauri-apps/plugin-biometric";
import { handleBalance } from "./req/get_balance";
import { convertHistory, getHistory } from "./req/get_history";
import { gettimepin, getTimestamp } from "./req/obfuscatePin";
import { Balance, BiometricOptions, biometricUnlockedAccount, CurrentError, currentPage, CurrentPage, isLoading, setCurrentPage, User } from "./stores.svelte";

export const gray = "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
export const primary = "text-primary-500 dark:text-primary-400 group-hover:text-primary-600 dark:group-hover:text-primary-500";
export let payColors = $state({color: primary});
export let balanceColors = $state({color: gray});
export let qrColors = $state({color: gray});


export async function handleBalanceClick() {
  if (currentPage.page != CurrentPage.Balance) {
    if (!biometricUnlockedAccount.unlocked) {
      try {
        await authenticate("Authentifizierung erforderlich.", BiometricOptions);
        biometricUnlockedAccount.unlocked = true;
        //lock again after 5 minutes
        setTimeout(() => {
          biometricUnlockedAccount.unlocked = false;
        }, 300000);
      } catch {
        CurrentError.hasError = true;
        CurrentError.error = "Authentifizierung fehlgeschlagen.";
        return
      }
    }
    isLoading.loading = true;
    let [success, error_msg] = await updateBalance();
    if (!success) {
        isLoading.loading = false;
        CurrentError.hasError = true;
        CurrentError.error = error_msg;
      return;
    }
    [success, error_msg] = await updateHistory();
    isLoading.loading = false;
    if (!success) {
      CurrentError.hasError = true;
      CurrentError.error = error_msg;
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
      Balance.history = convertHistory(await resp.text()).reverse();
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

