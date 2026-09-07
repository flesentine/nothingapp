(()=>{
const legacyPanel=panel;
const legacyClosePanel=closePanel;
const ID_TOKEN=/\b(?:(?:MAA|MAB)\d*|(?:MCP|MCR|GAR|GAP|GAD|RRA|RRR|RRP|RCP|RPO|SRC|SRT|MOT|PRG|SURV|RDR|COND|ISFB|ISF|FB|DIR|CRO|RSO|MA|FX|TA|INC|LAW|WR|Q)\d+)\b/g;
let selectedMarker=null;
let pendingMarker=null;

function inOverview(){
  return document.body.classList.contains('ux-overview');
}
function esc(s){
  return String(s??'');
}
function titleCase(s){
  return s.toLowerCase().replace(/\b[a-z]/g,c=>c.toUpperCase());
}
function parseTitle(raw){
  raw=esc(raw).trim()||'Selected object';
  const ids=raw.match(ID_TOKEN)||[];
  const id=ids[0]||null;
  const parts=raw.split('·').map(x=>x.trim()).filter(Boolean);
  let name=raw;
  if(id&&parts[0]===id&&parts.length>1)name=parts.slice(1).join(' · ');
  if(name===id)name=entityKind(id,raw);
  if(name&&name===name.toUpperCase()&&/[A-Z]/.test(name))name=titleCase(name);
  return{id,name};
}
function entityKind(id,raw=''){
  const p=(id||'').replace(/\d+$/,'');
  const map={
    MCP:'Conditionality Capture',
    MCR:'Conditionality Capture Register',
    GAR:'Governance Redemption',
    GAD:'Governance Arbitrage Desk',
    GAP:'Governance Arbitrage Position',
    RRA:'Reserve Restitution',
    RRR:'Reserve Restitution Register',
    RRP:'Preferred Recoupment Payment',
    RCP:'Preferred Recoupment Claim',
    RPO:'Preferred Recoupment Office',
    SRC:'Supervisory Recapitalization',
    SRT:'Supervisory Reserve Transfer',
    MOT:'Board Motion',
    PRG:'Stabilization Program',
    SURV:'Surveillance Report',
    RDR:'Rift Drawing Right',
    COND:'Program Condition',
    ISF:'Stabilization Fund',
    ISFB:'Stabilization Board',
    FB:'Stabilization Board',
    DIR:'Fund Director',
    CRO:'Capital Restoration Office',
    RSO:'Restoration Surcharge Office',
    MAA:'Monetary Authority',
    MAB:'Monetary Authority',
    MA:'Monetary Authority',
    FX:'Foreign Exchange',
    TA:'Trust Audit',
    INC:'Incident'
  };
  if(map[p])return map[p];
  const l=raw.toLowerCase();
  if(l.includes('warrant'))return'Warrant';
  if(l.includes('law'))return'Law';
  if(l.includes('ruling'))return'Ruling';
  return'Simulation Object';
}
function looksStatus(s){
  s=esc(s).trim();
  if(!s||s.length>72||/[.!?]/.test(s))return false;
  return /(?:^|[- ·])(active|pending|passed|approved|allocated|paid|complete|completed|rejected|failed|deadlocked|closed|open|operating|observing|awaiting|missing|insufficient|released|buffered|buffer|funding|majority|risk|existing|orphaned|surcharge|restitution|decisive|already|shortfall|monetized|repaid|no-|pool-)(?:$|[- ·])/i.test(s);
}
function statusFrom(body,meta){
  const b=esc(body).trim(),m=esc(meta).trim();
  if(looksStatus(b))return b;
  const hit=m.match(/(?:^|·)\s*status\s+([^·]+)/i);
  return hit?hit[1].trim():null;
}
function statusTone(status){
  const s=esc(status).toLowerCase();
  if(/pending|deadlock|rejected|shortfall|missing|risk|insufficient|crisis|orphan|not-live|failed/.test(s))return'attention';
  if(/passed|active|operating|restored|released|buffered|complete|paid|approved/.test(s))return'active';
  return'neutral';
}
function whyFor(raw,id){
  const l=raw.toLowerCase();
  const prefix=(id||'').replace(/\d+$/,'');
  if(prefix==='MCP'||l.includes('conditionality capture'))return'A creditor that regained a live stabilization-board majority can sponsor a borrower-recused tightening motion when an eligible program and existing surveillance evidence support it.';
  if(prefix==='GAR'||prefix==='GAP'||l.includes('governance arbitrage'))return'Restitution drawing rights and foreign reserves are valued differently by the old Build 59 score. Converting the claim can therefore change board control without Build 99 assigning votes itself.';
  if(prefix==='RRA'||prefix==='RRR'||l.includes('reserve restitution'))return'When preferred recapitalization principal returns to the common pool, the reality that originally bore the reserve loss receives an ordinary Build 58 drawing-right claim back.';
  if(prefix==='RRP'||prefix==='RCP'||l.includes('preferred recoup'))return'Recapitalization principal is being repaid from genuinely free authority capital, junior to the earlier supervisory claims and protections.';
  if(prefix==='SRC'||prefix==='SRT'||l.includes('recapital'))return'The stabilization system used real pooled reserves to recapitalize a monetary authority after supervisory capital pressure could not resolve itself.';
  if(prefix==='MOT'||l.includes('board motion'))return'The existing stabilization board is deciding whether to change a real program. The target borrower is recused from voting on its own rescue terms.';
  if(prefix==='PRG'||l.includes('stabilization program'))return'This program is an existing Build 58 rescue relationship. Later governance layers can observe or act through it, but do not replace it.';
  if(prefix==='SURV'||l.includes('surveillance'))return'Build 59 surveillance measures the borrower state used by the old board when deciding how directors prefer to vote on program motions.';
  if(prefix==='RDR'||l.includes('drawing right'))return'This is an ordinary Build 58 liquidity claim on the stabilization pool. It can be held, restored, or exchanged into real foreign reserves.';
  if(prefix==='ISF'||l.includes('stabilization fund'))return'This is the shared reserve institution underneath the later recapitalization, restitution, governance-arbitrage, and conditionality consequences.';
  if(prefix==='FB'||l.includes('fund board')||l.includes('stabilization fund board'))return'The Build 59 board is the authoritative governance layer for stabilization motions. Later builds can create opportunities or motions, but the old board still decides the vote.';
  if(prefix==='MA'||prefix==='MAA'||prefix==='MAB'||l.includes('monetary authority'))return'This authority is the real balance-sheet institution whose capital, facilities, and supervisory history feed the later financial consequences.';
  if(prefix==='FX'||l.includes('foreign exchange'))return'The FX layer holds the real foreign-reserve balances that connect drawing-right redemption to the governance score.';
  if(l.includes('warrant'))return'This warrant exists because an earlier legal or enforcement consequence authorized action against its target.';
  if(l.includes('law'))return'This law is part of the accumulated institutional history and remains authoritative for the behaviors that cite it.';
  if(l.includes('ruling'))return'This ruling records an earlier adjudication and can continue to affect precedent or later legal actions.';
  return'This object is part of the accumulated 100-build simulation. Its facts and actions still come from the original module that created it; the inspector only presents them consistently.';
}
function relatedIds(...parts){
  const all=parts.flatMap(x=>esc(x).match(ID_TOKEN)||[]);
  return[...new Set(all)];
}
function makeInspector(){
  let root=document.querySelector('#uxInspector');
  if(root)return root;
  root=document.createElement('aside');
  root.id='uxInspector';
  root.setAttribute('role','dialog');
  root.setAttribute('aria-label','Object inspector');
  root.innerHTML='<div class="ux-inspector-head"><div class="ux-inspector-kicker"><span id="uxInspectorKind">Selected object</span><span class="ux-inspector-id" id="uxInspectorId" hidden></span></div><div class="ux-inspector-title" id="uxInspectorTitle"></div><button class="ux-inspector-close" id="uxInspectorClose" aria-label="Close inspector">×</button></div><div class="ux-inspector-scroll"><div class="ux-inspector-status" id="uxInspectorStatus" hidden></div><section class="ux-inspector-section" id="uxInspectorSummarySection"><div class="ux-inspector-label">Summary</div><div class="ux-inspector-copy" id="uxInspectorSummary"></div></section><section class="ux-inspector-section ux-inspector-why"><div class="ux-inspector-label">Why?</div><div class="ux-inspector-copy" id="uxInspectorWhy"></div></section><section class="ux-inspector-section" id="uxInspectorFactsSection"><div class="ux-inspector-label">Important facts</div><div class="ux-inspector-copy" id="uxInspectorFacts"></div></section><section class="ux-inspector-section" id="uxInspectorRelatedSection"><div class="ux-inspector-label">Related</div><div class="ux-inspector-related" id="uxInspectorRelated"></div></section><section class="ux-inspector-section"><div class="ux-inspector-label">What can happen next</div><div class="ux-inspector-actions" id="uxInspectorActions"></div><div class="ux-inspector-empty" id="uxInspectorNoActions" hidden>No direct action is available from this object.</div></section></div>';
  document.body.appendChild(root);
  root.querySelector('#uxInspectorClose').onclick=()=>closePanel();
  return root;
}
function setSelectedMarker(marker){
  if(selectedMarker&&selectedMarker!==marker)selectedMarker.classList.remove('ux-selected');
  selectedMarker=marker||null;
  if(selectedMarker)selectedMarker.classList.add('ux-selected');
}
function clearSelectedMarker(){
  if(selectedMarker)selectedMarker.classList.remove('ux-selected');
  selectedMarker=null;
}
function renderInspector(k,b,m,buttons=[]){
  const root=makeInspector();
  const parsed=parseTitle(k);
  if(!parsed.id)parsed.id=(esc(b)+' '+esc(m)).match(ID_TOKEN)?.[0]||null;
  const combined=[k,b,m,(buttons||[]).map(x=>x?.[0]).join(' ')].join(' ');
  const status=statusFrom(b,m);
  const bodyIsStatus=looksStatus(b);
  const summary=bodyIsStatus?'':esc(b).trim();
  const facts=esc(m).trim();
  const kind=entityKind(parsed.id,k);

  root.querySelector('#uxInspectorKind').textContent=kind;
  const idEl=root.querySelector('#uxInspectorId');
  idEl.hidden=!parsed.id;
  idEl.textContent=parsed.id||'';
  root.querySelector('#uxInspectorTitle').textContent=parsed.name||kind;

  const statusEl=root.querySelector('#uxInspectorStatus');
  statusEl.hidden=!status;
  statusEl.textContent=status||'';
  statusEl.dataset.tone=statusTone(status);

  const summarySection=root.querySelector('#uxInspectorSummarySection');
  summarySection.hidden=!summary;
  root.querySelector('#uxInspectorSummary').textContent=summary;

  root.querySelector('#uxInspectorWhy').textContent=whyFor(combined,parsed.id);

  const factsSection=root.querySelector('#uxInspectorFactsSection');
  factsSection.hidden=!facts;
  root.querySelector('#uxInspectorFacts').textContent=facts;

  const ids=relatedIds(k,b,m,(buttons||[]).map(x=>x?.[0]).join(' ')).filter(x=>x!==parsed.id).slice(0,10);
  const relatedSection=root.querySelector('#uxInspectorRelatedSection');
  const related=root.querySelector('#uxInspectorRelated');
  related.innerHTML='';
  relatedSection.hidden=!ids.length;
  for(const id of ids){
    const chip=document.createElement('span');
    chip.className='ux-related-chip';
    chip.textContent=id;
    related.appendChild(chip);
  }

  const actions=root.querySelector('#uxInspectorActions');
  const empty=root.querySelector('#uxInspectorNoActions');
  actions.innerHTML='';
  let primaryAssigned=false;
  for(const pair of buttons||[]){
    if(!Array.isArray(pair)||typeof pair[1]!=='function')continue;
    const label=esc(pair[0]).trim()||'action';
    const fn=pair[1];
    const button=document.createElement('button');
    button.textContent=label;
    const isClose=/^(close|cancel|done)$/i.test(label);
    if(isClose)button.dataset.close='true';
    else if(!primaryAssigned){button.dataset.primary='true';primaryAssigned=true}
    button.onclick=()=>fn();
    actions.appendChild(button);
  }
  empty.hidden=actions.children.length>0;

  root.classList.add('open');
  document.body.classList.add('ux-inspecting');
  if(pendingMarker)setSelectedMarker(pendingMarker);
  pendingMarker=null;
}
function closeInspector(){
  const root=document.querySelector('#uxInspector');
  root?.classList.remove('open');
  document.body.classList.remove('ux-inspecting');
  clearSelectedMarker();
  pendingMarker=null;
}
function syncMode(){
  const legacy=document.querySelector('#panel');
  const inspector=document.querySelector('#uxInspector');
  if(inOverview()){
    if(legacy?.classList.contains('open'))legacyClosePanel();
  }else if(inspector?.classList.contains('open')){
    closeInspector();
    legacyClosePanel();
  }
}

panel=function(k,b,m,buttons){
  if(!inOverview())return legacyPanel(k,b,m,buttons);
  document.querySelector('#panel')?.classList.remove('open');
  renderInspector(k,b,m,buttons);
};
closePanel=function(){
  closeInspector();
  return legacyClosePanel();
};

document.addEventListener('pointerdown',e=>{
  if(!inOverview())return;
  const marker=e.target.closest?.('i[data-label],i[class],#thing,#echo,#rift,#archiveDoor');
  pendingMarker=marker&&!marker.closest?.('#uxInspector,#uxModeBar')?marker:null;
  const captured=pendingMarker;
  if(captured)setTimeout(()=>{if(pendingMarker===captured&&!document.querySelector('#uxInspector.open'))pendingMarker=null},180);
},true);
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&inOverview()&&document.querySelector('#uxInspector.open')){
    e.preventDefault();
    closePanel();
  }
});

makeInspector();
new MutationObserver(syncMode).observe(document.body,{attributes:true,attributeFilter:['class']});
syncMode();
})();