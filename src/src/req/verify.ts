import { fetch } from '@tauri-apps/plugin-http';
import { url } from '../server.svelte';
import { token } from './consts';
import { getTimestamp } from './obfuscatePin';
export async function verify(acc: string, pin: string): Promise<Response>{
    var data = {
        name: acc,
        pin: pin
    }
  //get current time stamp from banking.saswdorf.de/timestamp
  var response = await fetch(url + "/verify", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
    });
    return await response;
}



  
  