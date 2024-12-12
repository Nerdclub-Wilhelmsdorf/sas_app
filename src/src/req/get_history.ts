import { fetch } from '@tauri-apps/plugin-http';
import { url } from '../server.svelte';
import { token } from './consts';
import type { HistoryType } from '../stores.svelte';
export async function getHistory(acc: string, pin: string): Promise<Response>{
    var data = {
        acc: acc,
        pin: pin
    }
  //get current time stamp from banking.saswdorf.de/timestamp
  var response = await fetch(url + "/getLogs", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
    });
    return await response;
}

export function convertHistory(history: string): Array<HistoryType> {
    history = history.slice(3,history.length)
    let historyAr = history.split("###")
    let fullHistory: Array<HistoryType> = []
    historyAr.forEach(element => {
        fullHistory.push(JSON.parse(element)) 
    });
    return fullHistory
  }
  