(()=>{
const priorRenderAll=renderAll;
const priorPanel=panel;
const MAX_IMPORTANT=30;
const MAX_ALL=80;
const TYPE_MAP={
  ISF:'Stabilization Fund',ISFB:'Stabilization Board',DIR:'Fund Director',
  PRG:'Stabilization Program',COND:'Program Condition',REV:'Program Review',RST:'Debt Restructuring',RDR:'Drawing Right',
  SURV:'Surveillance',MOT:'Board Motion',QR:'Quota Review',
  MA:'Monetary Authority',MAA:'Monetary Authority',MAB:'Monetary Authority',
  FX:'Foreign Exchange',TA:'Trust Audit',INC:'Incident',
  SRC:'Supervisory Recapitalization',SRT:'Recapitalization Transfer',SRW:'Recapitalization Window',
  RCP:'Preferred Recoupment Claim',RRP:'Recoupment Payment',RPO:'Recoupment Office',
  RRA:'Reserve Restitution',RRR:'Reserve Restitution Register',
  GAP:'Governance Arbitrage Position',GAR:'Governance Redemption',GAD:'Governance Arbitrage Desk',
  MCP:'Conditionality Capture',MCR:'Conditionality Capture Register',
  CRO:'Capital Restoration Office',RSO:'Restoration Surcharge Office'
};
const IMPORTANT_PREFIXES=new Set(Object.keys(TYPE_MAP).filter(x=>x!=='TA'));
let open=false;
let showAll=false;
let selectedKey=null;
let refreshQueued=false;

function inOverview(){
  return document.body.classList.contains('ux-overview');
}
function prefix(id){
  const s=String(id||'').toUpperCase();
  if(/^MAA\d*$/.test(s))return'MAA';
  if(/^MAB\d*$/.test(s))return'MAB';
  const m=s.match(/^([A-Z]+?)(?=\d|$)/);
  return m?.[1]||'';
}
function timestamp(r){
  const n=Number(r?.created??r?.started??0);
  return Number.isFinite(n)&&n>0?n:0;
}
function buildFromSource(source){
  const m=String(source||'').match(/(\d{2,3})(?!.*\d)/);
  return m?Number(m[1]):null;
}
function sourceLabel(source){
  return String(source||'')
    .replace(/\d+$/,'')
    .replace(/([a-z0-9])([A-Z])/g,'$1 $2')
    .replace(/^./,c=>c.toUpperCase());
}
function typeFor(id,record,source){
  const p=prefix(id);
  if(TYPE_MAP[p])return TYPE_MAP[p];
  if(record?.name)return record.name;
  if(record?.title)return 'Incident / Event';
  return sourceLabel(source)||'Simulation Record';
}
function cleanStatus(s){
  return String(s||'').replace(/[-_]+/g,' ').replace(/\s+/g,' ').trim();
}
function n(v,d=2){
  const x=Number(v);
  return Number.isFinite(x)?x.toFixed(d).replace(/\.00$/,''):null;
}
function summaryFor(e){
  const r=e.record,p=e.prefix,status=cleanStatus(r.status);
  if(p==='MCP')return 'Reality '+(r.creditorReality||'?')+' → Reality '+(r.targetReality||'?')+(status?' · '+status:'');
  if(p==='GAR')return 'Reality '+(r.reality||'?')+' redeemed '+(n(r.amount99)||'?')+' '+(r.currency||'')+(status?' · '+status:'');
  if(p==='GAP')return 'Reality '+(r.reality||'?')+' liquidity-to-control position'+(status?' · '+status:'');
  if(p==='RRA')return 'Restored '+(n(r.amount98)||'?')+' drawing rights to Reality '+(r.burdenReality||r.reality||'?')+(status?' · '+status:'');
  if(p==='RRP')return 'Returned '+(n(r.amount97)||'?')+' '+(r.currency||'')+' to the stabilization pool';
  if(p==='RCP')return 'Preferred claim '+(n(r.claimAmount97)||'?')+' '+(r.currency||'')+(status?' · '+status:'');
  if(p==='SRC')return 'Reality '+(r.reality||'?')+' recapitalization '+(n(r.applied96)||'0')+' / '+(n(r.requested96)||'?')+(status?' · '+status:'');
  if(p==='SRT')return 'Transferred '+(n(r.amount96)||'?')+' '+(r.currency||'')+' into Reality '+(r.reality||'?')+' monetary capital';
  if(p==='MOT')return (r.label||cleanStatus(r.type)||'Board motion')+(status?' · '+status:'');
  if(p==='SURV')return 'Reality '+(r.reality||'?')+' risk '+(n(r.risk,2)||'?')+(r.recommendation?' · '+r.recommendation:'');
  if(p==='REV')return 'Reality '+(r.reality||'?')+' review '+(r.number??'')+(status?' · '+status:'');
  if(p==='PRG')return 'Reality '+(r.reality||'?')+' · '+(n(r.committed)||'?')+' committed'+(status?' · '+status:'');
  if(p==='COND')return cleanStatus(r.type)+(r.target!=null?' · target '+r.target:'')+(status?' · '+status:'');
  if(p==='RDR')return 'Reality '+(r.reality||'?')+' · '+(n(r.amount)||'?')+' drawing rights'+(status?' · '+status:'');
  if(p==='INC')return (r.title||'Incident')+(r.severity?' · '+r.severity:'')+(status?' · '+status:'');
  if(r.name)return r.name+(status?' · '+status:'');
  if(r.title)return r.title+(status?' · '+status:'');
  if(r.label)return r.label+(status?' · '+status:'');
  if(r.reality)return 'Reality '+r.reality+(status?' · '+status:'');
  return status||'recorded';
}
function relatedIds(record,id){
  const out=[];
  const add=v=>{
    if(typeof v!=='string'||v===id)return;
    if(/^[A-Z][A-Z0-9]{1,7}\d+$/.test(v)&&!out.includes(v))out.push(v);
  };
  for(const [k,v] of Object.entries(record||{})){
    if(k==='id')continue;
    if(typeof v==='string')add(v);
    else if(Array.isArray(v))for(const x of v)add(x);
    if(out.length>=8)break;
  }
  return out.slice(0,8);
}
function factsFor(e){
  const r=e.record,parts=[];
  if(r.status)parts.push('status · '+cleanStatus(r.status));
  if(r.reality)parts.push('reality · '+r.reality);
  if(r.creditorReality)parts.push('creditor · '+r.creditorReality);
  if(r.targetReality)parts.push('target · '+r.targetReality);
  if(r.burdenReality)parts.push('burden · '+r.burdenReality);
  if(r.currency)parts.push('currency · '+r.currency);
  if(r.risk!=null)parts.push('risk · '+n(r.risk,2));
  const amountKeys=['amount','amount96','amount97','amount98','amount99','requested96','applied96','claimAmount97','outstanding97','committed','disbursed'];
  for(const k of amountKeys)if(r[k]!=null)parts.push(k.replace(/([A-Z])/g,' $1').replace(/\d+$/,'').trim()+' · '+n(r[k]));
  parts.push('source · '+sourceLabel(e.source));
  return parts.slice(0,8).join('\n');
}
function isImportant(e){
  if(e.prefix==='TA')return false;
  if(e.prefix==='INC')return e.record.status==='open'||/SEV[12]/i.test(String(e.record.severity||''));
  if(IMPORTANT_PREFIXES.has(e.prefix))return true;
  return /(stabilization|fund|monetary|fx|trade|supervisory|capital|restoration|surcharge|recoup|restitution|arbitrage|conditionality)/i.test(e.source);
}
function collect(){
  const out=[],seen=new Set();
  const add=(record,source)=>{
    if(!record||typeof record!=='object'||typeof record.id!=='string')return;
    const ts=timestamp(record);
    if(!ts)return;
    const key=record.id+'|'+ts+'|'+source;
    if(seen.has(key))return;
    seen.add(key);
    const p=prefix(record.id);
    const e={key,id:record.id,prefix:p,record,source,ts,build:buildFromSource(source)};
    e.type=typeFor(e.id,record,source);
    e.summary=summaryFor(e);
    e.related=relatedIds(record,e.id);
    e.important=isImportant(e);
    out.push(e);
  };
  for(const [source,value] of Object.entries(S||{})){
    if(Array.isArray(value)){
      for(const record of value)add(record,source);
    }else if(value&&typeof value==='object'&&typeof value.id==='string'&&/(Office|Register|Desk|Window)/i.test(source)){
      add(value,source);
    }
  }
  return out.sort((a,b)=>b.ts-a.ts||b.id.localeCompare(a.id));
}
function relativeTime(ts){
  const d=Math.max(0,Date.now()-ts);
  if(d<5000)return'now';
  if(d<60000)return Math.floor(d/1000)+'s';
  if(d<3600000)return Math.floor(d/60000)+'m';
  if(d<86400000)return Math.floor(d/3600000)+'h';
  return new Intl.DateTimeFormat(undefined,{month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}).format(new Date(ts));
}
function tone(e){
  const s=String(e.record.status||'').toLowerCase();
  if(e.prefix==='INC'||/failed|deadlock|shortfall|missing|crisis|rejected|orphan|pending/.test(s))return'attention';
  if(/active|passed|allocated|paid|restored|redeemed|operating|complete|released/.test(s))return'active';
  return'neutral';
}
function markerFor(id){
  for(const marker of document.querySelectorAll('body>div[id*="Layer"]>i')){
    const label=String(marker.dataset.label||'').trim();
    const text=String(marker.textContent||'').trim();
    if(label===id||label.startsWith(id+' ')||label.startsWith(id+' ·')||text===id)return marker;
  }
  return null;
}
function markerVisible(marker){
  if(!marker)return false;
  const s=getComputedStyle(marker),p=marker.parentElement?getComputedStyle(marker.parentElement):null;
  return s.display!=='none'&&s.visibility!=='hidden'&&parseFloat(s.opacity||'1')>.05&&s.pointerEvents!=='none'&&(!p||parseFloat(p.opacity||'1')>.05);
}
function makeUI(){
  let toggle=document.querySelector('#uxTimelineToggle');
  if(!toggle){
    const bar=document.querySelector('#uxModeBar');
    if(bar){
      toggle=document.createElement('button');
      toggle.id='uxTimelineToggle';
      toggle.type='button';
      toggle.innerHTML='<span>Recent</span><span class="ux-timeline-id"></span>';
      toggle.setAttribute('aria-label','Open recent changes');
      toggle.setAttribute('aria-expanded','false');
      toggle.onclick=()=>open?closeTimeline(false):openTimeline();
      bar.appendChild(toggle);
    }
  }
  let panelEl=document.querySelector('#uxTimelinePanel');
  if(!panelEl){
    panelEl=document.createElement('aside');
    panelEl.id='uxTimelinePanel';
    panelEl.setAttribute('aria-label','Recent changes');
    panelEl.innerHTML='<div class="ux-timeline-head"><div class="ux-timeline-top"><div class="ux-timeline-title">Recent changes</div><button class="ux-timeline-close" aria-label="Close recent changes">×</button></div><div class="ux-timeline-sub" id="uxTimelineSub">Real records from the accumulated simulation, newest first.</div><div class="ux-timeline-filters"><button class="ux-timeline-filter active" data-filter="important">Important</button><button class="ux-timeline-filter" data-filter="all">All activity</button></div></div><div id="uxTimelineList"></div>';
    document.body.appendChild(panelEl);
    panelEl.querySelector('.ux-timeline-close').onclick=()=>closeTimeline(false);
    for(const b of panelEl.querySelectorAll('.ux-timeline-filter')){
      b.onclick=()=>{
        showAll=b.dataset.filter==='all';
        selectedKey=null;
        refresh();
      };
    }
  }
  return{toggle,panel:panelEl};
}
function openTimeline(){
  if(!inOverview())return;
  if(document.querySelector('#uxInspector.open'))closePanel();
  open=true;
  document.body.classList.add('ux-timeline-open');
  const {toggle,panel}=makeUI();
  panel.classList.add('open');
  toggle?.classList.add('active');
  toggle?.setAttribute('aria-expanded','true');
  refresh();
}
function closeTimeline(){
  if(!open&&!document.body.classList.contains('ux-timeline-open'))return;
  open=false;
  selectedKey=null;
  if(document.body.classList.contains('ux-timeline-open'))document.body.classList.remove('ux-timeline-open');
  document.querySelector('#uxTimelinePanel')?.classList.remove('open');
  const toggle=document.querySelector('#uxTimelineToggle');
  toggle?.classList.remove('active');
  toggle?.setAttribute('aria-expanded','false');
}
function locate(e){
  const marker=markerFor(e.id);
  if(!markerVisible(marker))return;
  closeTimeline();
  marker.classList.add('ux-timeline-pulse');
  marker.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
  setTimeout(()=>marker.classList.remove('ux-timeline-pulse'),900);
}
function renderRow(e){
  const row=document.createElement('div');
  row.className='ux-timeline-row'+(selectedKey===e.key?' selected':'');
  row.dataset.tone=tone(e);
  row.setAttribute('role','button');
  row.tabIndex=0;
  const related=e.related.length?'↳ '+e.related.join(' · '):'';
  const build=e.build?'<span class="ux-timeline-build">Build '+e.build+'</span>':'';
  row.innerHTML='<span class="ux-timeline-dot"></span><div class="ux-timeline-main"><span class="ux-timeline-id"></span><span class="ux-timeline-kind"></span><span class="ux-timeline-time"></span></div><div class="ux-timeline-summary"></div><div class="ux-timeline-related"></div><div class="ux-timeline-detail"><div class="ux-timeline-facts"></div><div class="ux-timeline-actions"><button class="ux-timeline-locate">Locate</button><span class="ux-timeline-location-note"></span></div></div>';
  row.querySelector('.ux-timeline-id').textContent=e.id;
  row.querySelector('.ux-timeline-kind').textContent=e.type;
  row.querySelector('.ux-timeline-time').textContent=relativeTime(e.ts);
  row.querySelector('.ux-timeline-summary').textContent=e.summary;
  const rel=row.querySelector('.ux-timeline-related');
  rel.innerHTML=build;
  if(related)rel.append(document.createTextNode(related));
  row.querySelector('.ux-timeline-facts').textContent=factsFor(e);
  const marker=markerFor(e.id),visible=markerVisible(marker),loc=row.querySelector('.ux-timeline-locate'),note=row.querySelector('.ux-timeline-location-note');
  loc.disabled=!visible;
  note.textContent=visible?'opens the original object':'hidden at the current view/detail level';
  loc.onclick=ev=>{ev.stopPropagation();locate(e)};
  const toggle=()=>{
    selectedKey=selectedKey===e.key?null:e.key;
    refresh();
  };
  row.onclick=toggle;
  row.onkeydown=ev=>{if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();toggle()}};
  return row;
}
function refresh(){
  const {toggle,panel}=makeUI();
  const events=collect();
  const important=events.filter(e=>e.important);
  const latest=important[0]||events[0]||null;
  const idEl=toggle?.querySelector('.ux-timeline-id');
  if(idEl)idEl.textContent=latest?latest.id:'';
  if(!open)return;
  if(!inOverview()){closeTimeline();return}
  panel.classList.add('open');
  const focus=document.body.dataset.uxFocus;
  const sub=panel.querySelector('#uxTimelineSub');
  sub.textContent=(focus?({stabilization:'Stabilization System',supervision:'Monetary Supervision',external:'External Economy'}[focus]+' focus · '):'')+'real simulation records, newest first.';
  for(const b of panel.querySelectorAll('.ux-timeline-filter'))b.classList.toggle('active',(b.dataset.filter==='all')===showAll);
  const chosen=showAll?events:important;
  const limit=showAll?MAX_ALL:MAX_IMPORTANT;
  const list=panel.querySelector('#uxTimelineList');
  list.innerHTML='';
  if(!chosen.length){
    const empty=document.createElement('div');empty.className='ux-timeline-empty';empty.textContent='No timestamped activity is available yet.';list.appendChild(empty);return;
  }
  for(const e of chosen.slice(0,limit))list.appendChild(renderRow(e));
  if(chosen.length>limit){
    const more=document.createElement('div');more.className='ux-timeline-more';more.textContent=(chosen.length-limit)+' older records not shown';list.appendChild(more);
  }
}
function scheduleRefresh(){
  if(refreshQueued)return;
  refreshQueued=true;
  queueMicrotask(()=>{refreshQueued=false;refresh()});
}

renderAll=function(...args){
  const out=priorRenderAll.apply(this,args);
  scheduleRefresh();
  return out;
};
panel=function(...args){
  if(open)closeTimeline();
  return priorPanel.apply(this,args);
};

document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&open&&inOverview()){
    e.preventDefault();
    e.stopImmediatePropagation();
    closeTimeline();
  }
},true);

new MutationObserver(()=>{
  if(!inOverview())closeTimeline();
  else scheduleRefresh();
}).observe(document.body,{attributes:true,attributeFilter:['class','data-ux-focus','data-ux-zoom']});

makeUI();
refresh();
setInterval(()=>{if(open)refresh()},2500);
})();