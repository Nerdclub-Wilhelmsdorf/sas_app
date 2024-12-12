import { fetch } from '@tauri-apps/plugin-http';
import { url } from '../server.svelte';
import { token } from './consts';
export async function handleBalance(acc: string, pin: string): Promise<Response>{
    var data = {
        acc1: acc,
        pin: pin
    }
  //get current time stamp from banking.saswdorf.de/timestamp
  var response = await fetch(url + "/balanceCheck", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
    });
    return await response;
}