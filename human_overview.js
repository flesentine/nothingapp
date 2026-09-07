(()=>{
const MODE_KEY='nothing-ux-mode';
const DEFAULT_MODE='overview';
const previousRenderAll=renderAll;

function el(tag,id,cls){
  const n=document.createElement(tag);
  if(id)n.id=id;
  if(cls)n.className=cls;
  return n;
}
function latest(arr){
  return [...(arr||[])].sort((a,b)=>(b.created||0)-(a.created||0))[0]||null;
}
function openIncidents(){
  return (S.incidents||[]).filter(i=>i.status==='open').length;
}
function livePrograms(){
  return (S.stabilizationPrograms58||[]).filter(p=>!['closed','completed','cancelled','repaid'].includes(p.status)).length;
}
function currentCapture(){
  const captures=[...(S.conditionalityCaptures100||[])];
  if(!captures.length)return null;
  const priority={
    'motion-pending':100,
    'motion-deadlocked':95,
    'motion-rejected':90,
    'majority-not-live':80,
    'existing-tightening-open':75,
    'missing-monetary-condition':70,
    'awaiting-surveillance':65,
    'awaiting-program':60,
    'risk-below-tightening':55,
    'capture-passed':40
  };
  captures.sort((a,b)=>(priority[b.status]||50)-(priority[a.status]||50)||(b.created||0)-(a.created||0));
  return captures[0];
}
function currentMotion(c){
  return c?.motionId59?(S.fundMotions59||[]).find(m=>m.id===c.motionId59)||null:null;
}
function nowText(){
  const c=currentCapture();
  if(c){
    const creditor='Reality '+c.creditorReality;
    const borrower='Reality '+c.targetReality;
    const motion=currentMotion(c);
    switch(c.status){
      case 'motion-pending':
        return (motion?.id||'A board motion')+' is waiting for a vote. '+creditor+' is trying to tighten '+borrower+'\'s stabilization program.';
      case 'capture-passed':
        return (motion?.id||'The board motion')+' passed. '+borrower+' is now operating under tighter rescue conditions.';
      case 'motion-deadlocked':
        return (motion?.id||'The board motion')+' deadlocked. The restored majority was not enough at vote time.';
      case 'motion-rejected':
        return (motion?.id||'The board motion')+' was rejected. No new tightening was applied.';
      case 'majority-not-live':
        return creditor+' previously regained control, but that majority is no longer live.';
      case 'awaiting-program':
        return creditor+' has a restored-majority opportunity, but '+borrower+' has no eligible stabilization program.';
      case 'awaiting-surveillance':
        return creditor+' has a restored-majority opportunity, but the old board has no current surveillance evidence for '+borrower+'.';
      case 'risk-below-tightening':
        return 'Surveillance risk is below the old tightening threshold, so no capture motion is available.';
      case 'existing-tightening-open':
        return 'A tightening motion is already open for '+borrower+'; Build 100 is not stacking another.';
      default:
        return creditor+' has a live conditionality-capture position over '+borrower+'.';
    }
  }
  const a=latest(S.governanceArbitrageRedemptions99);
  if(a?.status==='majority-restored')return 'Reality '+a.reality+' restored a stabilization-board majority by converting restitution drawing rights into foreign reserves.';
  const r=latest(S.reserveRestitutions98);
  if(r)return 'Reality '+r.burdenReality+' holds restored drawing rights after bearing the reserve loss from an earlier recapitalization.';
  const p=latest(S.preferredRecoupmentPayments97);
  if(p)return 'Preferred recapitalization principal has begun returning to the common stabilization pool.';
  return 'The system is running quietly. Overview is hiding low-priority machinery until it matters.';
}
function boardText(){
  const b=S.fundBoards59?.[0];
  if(!b)return 'not formed';
  return b.dominant?'Reality '+b.dominant:'shared';
}
function makeUI(){
  if(!document.querySelector('#uxModeBar')){
    const bar=el('div','uxModeBar');
    const label=el('span',null,'ux-mode-label');
    label.textContent='view';
    const overview=el('button','uxOverviewMode');
    overview.textContent='Overview';
    const god=el('button','uxGodMode');
    god.textContent='God View';
    bar.append(label,overview,god);
    document.body.appendChild(bar);
    overview.onclick=()=>setMode('overview',true);
    god.onclick=()=>setMode('god',true);
  }
  if(!document.querySelector('#uxOverviewCard')){
    const card=el('aside','uxOverviewCard');
    card.innerHTML='<div class="ux-eyebrow">Human overview</div><h2>What matters now</h2><div class="ux-now" id="uxNow"></div><div class="ux-grid"><div class="ux-stat"><span>Board control</span><b id="uxBoard"></b></div><div class="ux-stat"><span>Open crises</span><b id="uxCrises"></b></div><div class="ux-stat"><span>Live programs</span><b id="uxPrograms"></b></div><div class="ux-stat"><span>Current build</span><b>100</b></div></div><div class="ux-realities"><div class="ux-reality" id="uxRealityA">Reality A</div><div class="ux-reality" id="uxRealityB">Reality B</div></div><div class="ux-note">Everything is still running. Overview only reduces what is drawn. Switch to God View for the complete 100-build system map.</div>';
    document.body.appendChild(card);
  }
  if(!document.querySelector('#uxOverviewLegend')){
    const legend=el('div','uxOverviewLegend');
    legend.innerHTML='<span><i></i>major system</span><span class="current"><i></i>current consequence</span><span>click an object to use its original controls</span>';
    document.body.appendChild(legend);
  }
}
function refreshOverview(){
  makeUI();
  const now=document.querySelector('#uxNow');
  const board=document.querySelector('#uxBoard');
  const crises=document.querySelector('#uxCrises');
  const programs=document.querySelector('#uxPrograms');
  if(now)now.textContent=nowText();
  if(board)board.textContent=boardText();
  if(crises)crises.textContent=String(openIncidents());
  if(programs)programs.textContent=String(livePrograms());
  document.querySelector('#uxRealityA')?.classList.toggle('active',S.active==='A');
  document.querySelector('#uxRealityB')?.classList.toggle('active',S.active==='B');
}
function setMode(mode,persist=false){
  mode=mode==='god'?'god':'overview';
  document.body.classList.toggle('ux-overview',mode==='overview');
  document.body.classList.toggle('ux-god',mode==='god');
  const overview=document.querySelector('#uxOverviewMode');
  const god=document.querySelector('#uxGodMode');
  overview?.classList.toggle('active',mode==='overview');
  god?.classList.toggle('active',mode==='god');
  overview?.setAttribute('aria-pressed',String(mode==='overview'));
  god?.setAttribute('aria-pressed',String(mode==='god'));
  if(persist)try{localStorage.setItem(MODE_KEY,mode)}catch{}
  refreshOverview();
}
function initialMode(){
  const params=new URLSearchParams(location.search);
  if(params.get('god')==='1')return'god';
  try{return localStorage.getItem(MODE_KEY)||DEFAULT_MODE}catch{return DEFAULT_MODE}
}

renderAll=function(){
  previousRenderAll();
  refreshOverview();
};

makeUI();
setMode(initialMode(),false);
refreshOverview();
setInterval(refreshOverview,1600);
})();