export async function preparePhoto(file){
 if(file.size>30*1024*1024)throw Error('Please choose a photo smaller than 30 MB.');
 const url=URL.createObjectURL(file);
 try{const img=new Image();img.src=url;await img.decode();const scale=Math.min(1,1600/Math.max(img.width,img.height));const canvas=document.createElement('canvas');canvas.width=Math.round(img.width*scale);canvas.height=Math.round(img.height*scale);const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',0.82);}catch{throw Error('This photo could not be opened. Try a JPEG or PNG.');}finally{URL.revokeObjectURL(url);}
}
