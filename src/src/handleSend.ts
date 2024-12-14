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
        CurrentError.error = error;
        isLoading.loading = false;
        CurrentError.hasError = true;
    }
    try {
        let timepin = gettimepin(pin, timestamp);
        let response = await send(from, to, amount, timepin);
        if (response.status == 200) {
            isLoading.loading = false;
            return true
        } else if (response.status == 201) {
            CurrentError.error = await response.text();
            isLoading.loading = false;
            CurrentError.hasError = true;
            return false;
        } else {
            CurrentError.error = "Bitte überprüfe deine Internetverbindung.";
            isLoading.loading = false;
            CurrentError.hasError = true;
            return false;
        }
    } catch (error: any) {
        CurrentError.error = "Bitte überprüfe deine Internetverbindung.";
        isLoading.loading = false;
        CurrentError.hasError = true;
        return false;
    }

}