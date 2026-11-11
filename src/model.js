export const blank = () => ({version:1,projects:[],theme:'system'});
export const task = title => ({id:crypto.randomUUID(),title,notes:'',elapsed:0,started:null,done:false,photos:[]});
export const elapsed = (t,now=Date.now()) => t.elapsed+(t.started===null?0:Math.max(0,now-t.started));
export function action(state,id,verb,now=Date.now()) {
 const t=state.projects.flatMap(p=>p.tasks).find(t=>t.id===id);if(!t)throw Error('Task not found');
 if(verb==='start'){for(const p of state.projects)for(const x of p.tasks)if(x.started!==null){x.elapsed=elapsed(x,now);x.started=null;}t.done=false;t.started=now;}
 if(verb==='pause'||verb==='finish'){t.elapsed=elapsed(t,now);t.started=null;if(verb==='finish')t.done=true;}
 if(verb==='reset'){t.elapsed=0;t.started=null;}
 if(verb==='reopen')t.done=false;
}
export function duration(ms){const s=Math.floor(ms/1000);return [Math.floor(s/3600),Math.floor(s/60)%60,s%60].map(v=>String(v).padStart(2,'0')).join(':');}
export function validate(s){
 if(!s||s.version!==1||!Array.isArray(s.projects)||!['system','light','dark'].includes(s.theme))throw Error('Not a Job Journal backup');
 const ids=new Set();const id=x=>{if(typeof x!=='string'||!x||ids.has(x))throw Error('Invalid or duplicate ID');ids.add(x);};
 for(const p of s.projects){id(p.id);if(typeof p.name!=='string'||typeof p.description!=='string'||!Array.isArray(p.tasks))throw Error('Invalid project');for(const t of p.tasks){id(t.id);if(typeof t.title!=='string'||typeof t.notes!=='string'||!Number.isFinite(t.elapsed)||t.elapsed<0||!(t.started===null||(Number.isFinite(t.started)&&t.started>=0))||typeof t.done!=='boolean'||!Array.isArray(t.photos))throw Error('Invalid task');for(const f of t.photos){id(f.id);if(!['Before','During','After'].includes(f.stage)||typeof f.caption!=='string'||!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(f.data))throw Error('Invalid photo');}}}return s;
}
