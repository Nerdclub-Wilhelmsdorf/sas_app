import ErrorModal from "../lib/errorModal.svelte";
import { gettimepin, getTimestamp } from "./req/obfuscatePin";
import { send } from "./req/send";
import { CurrentError, isLoading } from "./stores.svelte";

export async function handleSend(from: string, to: string, amount: string, pin: string): Promise<boolean> {
    isLoading.loading = true;
    let timestamp: string ="";
    try{
        timestamp = await getTimestamp();
    }catch(error: any){
        isLoading.loading = false;
        CurrentError.error = error;
        CurrentError.hasError = true;
    }
    try {
        let timepin = gettimepin(pin, timestamp);
        let response = await send(from, to, amount, timepin);
        if (response.status == 200) {
            isLoading.loading = false;
            return true
        } else if (response.status == 201) {
            isLoading.loading = false;
            CurrentError.error = await response.text();
            CurrentError.hasError = true;
            return false;
        } else {
            isLoading.loading = false;
            CurrentError.error = "Bitte überprüfe deine Internetverbindung.";
            CurrentError.hasError = true;
            return false;
        }
    } catch (error: any) {
        isLoading.loading = false;
        CurrentError.error = "Bitte überprüfe deine Internetverbindung.";
        CurrentError.hasError = true;
        return false;
    }

}