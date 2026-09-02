(()=>{
const P48=panel;
let lastProcurementGesture48=Date.now();
if(document?.addEventListener)document.addEventListener('pointerdown',()=>{lastProcurementGesture48=Date.now()},true);
panel=function(k,b,m,a){
  const title=String(k||'');
  const procurementPanel=/^(?:RFP|PC)\d+\b/.test(title)||title.startsWith('PROCUREMENT ·');
  if(procurementPanel&&Date.now()-lastProcurementGesture48>1000)return;
  return P48(k,b,m,a);
};
})();
