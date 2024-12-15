import { load } from "@tauri-apps/plugin-store";
import { gettimepin, getTimestamp } from "./req/obfuscatePin";
import { verify } from "./req/verify";
import { Balance, CurrentPage, currentPage, isLoggedIn, User } from "./stores.svelte";

export async function checkIsLoggedIn(): Promise<boolean | {name: string, pin: string}> {
    const store = await load('store.json', { autoSave: false });
    if (!store.has('name') || !store.has('pin')) {
        return false;
    }
    const name = await store.get<{ value: string }>('name');  
    const pin = await store.get<{ value: string }>('pin');  
    if (name == undefined || pin == undefined) {
        return false;
    }
    if (name.value == "" || pin.value == "") {
        return false;
    }
    return {name: name.value, pin: pin.value};
}

export async function storeCredentials(name: string, pin: string){
    const store = await load('store.json', { autoSave: false });
    await store.set('name', {value: name});
    await store.set('pin',  {value: pin});
    await store.save();
}


export async function handleVerify(name: string, pin: string): Promise<[boolean, string]> {
    let resp: Response;
    let timestamp: string;
    try {
      try {
        timestamp = await getTimestamp()
      } catch(error: any) {
        return [false, String(error)]
      }
      resp = await verify(name, gettimepin(pin, timestamp))
      if (resp.status === 200) {
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

export async function logout(){
    const store = await load('store.json', { autoSave: false });
    await store.delete('name');
    await store.delete('name');
    await store.save();
    User.name = "";
    User.pin = "";
    Balance.balance = "";
    Balance.history = [];
    isLoggedIn.loggedIn = false;
    currentPage.page = CurrentPage.Login;
}
