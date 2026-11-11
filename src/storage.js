import {blank} from './model.js';
let db;
export async function open(){db=await new Promise((resolve,reject)=>{const r=indexedDB.open('job-journal',1);r.onupgradeneeded=()=>r.result.createObjectStore('records');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);});}
export function load(){return new Promise((resolve,reject)=>{const r=db.transaction('records').objectStore('records').get('state');r.onsuccess=()=>resolve(r.result||blank());r.onerror=()=>reject(r.error);});}
export function save(state){return new Promise((resolve,reject)=>{const tx=db.transaction('records','readwrite');tx.objectStore('records').put(state,'state');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||Error('Save aborted'));});}
