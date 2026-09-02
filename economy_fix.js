(()=>{
const BR47F=renderAll;
function fixEconomy47(){
  if(!Array.isArray(S.packageTreasuries47)||!Array.isArray(S.fundingContracts47))return;
  for(const c of S.fundingContracts47){
    if(!c.amount)continue;
    const target=Math.min(.9,(c.paid/c.amount)*.7+(String(c.sponsor||'').includes('emergency software treasury')?.08:0));
    if(target>c.influence)c.influence=target;
    const t=S.packageTreasuries47.find(t=>t.namespaceId===c.namespaceId);
    const n=(S.namespaces46||[]).find(n=>n.id===c.namespaceId);
    if(!t||!n||c.influence<.6)continue;
    let steward=(S.maintainers46||[]).find(m=>m.namespaceId===n.id&&m.sponsor47===c.sponsor);
    if(!steward){
      S.maintainerSerial46=S.maintainerSerial46||0;
      steward={id:'MNT'+(++S.maintainerSerial46),namespaceId:n.id,reality:n.reality,name:c.sponsor+' steward',role:'sponsor',status:'active',legitimacy:.46,fatigue:.08,contributions:0,appointed:Date.now(),departed:null,sponsor47:c.sponsor};
      S.maintainers46.push(steward);
      n.maintainers=n.maintainers||[];
      if(!n.maintainers.includes(steward.id))n.maintainers.push(steward.id);
    }
    if(!t.capturedBy){
      t.capturedBy=c.sponsor;
      S.sponsorCaptures47=(S.sponsorCaptures47||0)+1;
      n.legitimacy=Math.max(.1,(n.legitimacy||.6)-.08);
      n.succession='funding-weighted succession';
      if(typeof remember==='function')remember('SPONSOR CAPTURE: '+c.sponsor+' converted package financing into a succession seat for '+n.name,S.real[n.reality]);
      if(typeof place==='function'){place('cold','maintainer salary became a governance vote',S.real[n.reality]);place('dream','package budget with a foreign policy',S.real[n.reality])}
      S.bailiffMood='asking whether paying the maintainer counts as appointing one';
    }
    for(const d of (S.namespaceDisputes46||[]).filter(d=>d.namespaceId===n.id&&d.status==='open')){
      d.candidates=d.candidates||[];d.votes=d.votes||{};
      const raw=d.candidates.indexOf(c.sponsor);
      if(raw>=0){d.candidates.splice(raw,1);d.votes[steward.id]=(d.votes[steward.id]||0)+(d.votes[c.sponsor]||0);delete d.votes[c.sponsor]}
      if(!d.candidates.includes(steward.id))d.candidates.push(steward.id);
      if((d.votes[steward.id]||0)<2)d.votes[steward.id]=2;
    }
  }
}
renderAll=function(){fixEconomy47();BR47F()};
setInterval(fixEconomy47,650);
fixEconomy47();renderAll();
})();
