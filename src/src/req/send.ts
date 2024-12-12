import { fetch } from '@tauri-apps/plugin-http';
import { url } from '../server.svelte';
import { token } from './consts';
export async function send(from: string, to: string, amount: string, pin: string): Promise<Response>{
    var data = {
        from: from,
        to: to,
        amount: amount,
        pin: pin
    }
  //get current time stamp from banking.saswdorf.de/timestamp
  var response = await fetch(url + "/pay", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
    });
    return await response;
}