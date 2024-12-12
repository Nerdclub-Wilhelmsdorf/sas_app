import { fetch } from '@tauri-apps/plugin-http';
import * as CryptoJS from 'crypto-js';
import { token, url } from '../server.svelte';

export function gettimepin(pin: string, time: string): string {
    const timehash = CryptoJS.SHA256(time).toString(CryptoJS.enc.Base64);
    
    // Decode base64 to a byte array
    const byteArray = Uint8Array.from(atob(timehash), c => c.charCodeAt(0));
    
    // Convert byte array to hex string
    const hexString = Array.from(byteArray, byte => byte.toString(16).padStart(2, '0')).join('');
    
    // Parse hex string to a BigInt
    const timehashNumber = BigInt('0x' + hexString);
    const pinNumber = BigInt(pin);
    const timepin = (timehashNumber + pinNumber).toString();
    return timepin;
}


export async function getTimestamp(): Promise<string> {
    try {
        var response = await fetch(url + "/timestamp", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    }catch{
        throw("Bitte überprüfe deine Internetverbindung.")
    }

    if (response.status != 200){
        throw("Fehler beim Laden von Serverdaten. Wenn der Fehler bestehen bleibt, wende dich an die Bank.")
    }
    return response.text()
}