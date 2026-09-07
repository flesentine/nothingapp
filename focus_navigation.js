(()=>{
const priorPanel=panel;
const priorClosePanel=closePanel;
const FOCI={
  stabilization:{
    label:'Stabilization System',
    hint:'Builds 58/59 · recapitalization → recoupment → restitution → governance → capture'
  },
  supervision:{
    label:'Monetary Supervision',
    hint:'Monetary authority · remediation · exceptions · capital · restoration · surcharge · recapitalization'
  },
  external:{
    label:'External Economy',
    hint:'Trade · FX · reserve pool · restitution liquidity · governance conversion'
  }
};
let focusKey=null;
let history=[null];
let historyIndex=0;
let currentSelection={id:null,kind:null,title:null,focus:null};

function inOverview(){
  return document.body.classList.contains('ux-overview');
}
function inspectorOpen(){
  return document.querySelector('#uxInspector')?.classList.contains('open')||false;
}
function prefix(id){
  id=String(id||'').toUpperCase();
  if(/^MAA\d*$/.test(id))return'MAA';
  if(/^MAB\d*$/.test(id))return'MAB';
  return id.replace(/\d+$/,'');
}
function inferFocus(id,kind='',title=''){
  const p=prefix(id),text=(kind+' '+title).toLowerCase();
  if(['MCP','MCR','GAR','GAP','GAD','RRA','RRR','RRP','RCP','RPO','SRC','SRT','MOT','PRG','SURV','RDR','COND','ISFB','ISF','FB','DIR'].includes(p))return'stabilization';
  if(['MAA','MAB','MA','CRO','RSO'].includes(p))return'supervision';
  if(p==='FX')return'external';
  if(/conditionality|governance arbitrage|reserve restitution|preferred recoup|stabilization|fund board|board motion|drawing right/.test(text))return'stabilization';
  if(/monetary authority|supervisory|capital restoration|restoration surcharge|recidivism|monetary remediation/.test(text))return'supervision';
  if(/foreign exchange|\bfx\b|trade|external economy/.test(text))return'external';
  return null;
}
function makeNav(){
  let nav=document.querySelector('#uxFocusNav');
  if(nav)return nav;
  nav=document.createElement('nav');
  nav.id='uxFocusNav';
  nav.setAttribute('aria-label','Focus navigation');
  nav.innerHTML='<button class="ux-nav-icon" id="uxFocusBack" aria-label="Back" title="Back">←</button><button class="ux-nav-icon" id="uxFocusForward" aria-label="Forward" title="Forward">→</button><div class="ux-crumbs" id="uxFocusCrumbs"></div>';
  document.body.appendChild(nav);
  nav.querySelector('#uxFocusBack').onclick=()=>goHistory(-1);
  nav.querySelector('#uxFocusForward').onclick=()=>goHistory(1);
  let hint=document.querySelector('#uxFocusHint');
  if(!hint){
    hint=document.createElement('div');
    hint.id='uxFocusHint';
    hint.innerHTML='<b id="uxFocusHintTitle"></b><span id="uxFocusHintCopy"></span>';
    document.body.appendChild(hint);
  }
  return nav;
}
function makeFocusButton(){
  const inspector=document.querySelector('#uxInspector');
  if(!inspector)return null;
  let button=inspector.querySelector('#uxInspectorFocus');
  if(button)return button;
  button=document.createElement('button');
  button.id='uxInspectorFocus';
  button.type='button';
  button.hidden=true;
  inspector.querySelector('.ux-inspector-head')?.appendChild(button);
  button.onclick=()=>{
    const key=button.dataset.focus;
    if(key&&FOCI[key])applyFocus(key,true);
  };
  return button;
}
function pushHistory(key){
  if(history[historyIndex]===key)return;
  history=history.slice(0,historyIndex+1);
  history.push(key);
  historyIndex=history.length-1;
}
function applyFocus(key,record=false){
  key=FOCI[key]?key:null;
  focusKey=key;
  document.body.classList.toggle('ux-focused',!!key&&inOverview());
  if(key)document.body.dataset.uxFocus=key;
  else delete document.body.dataset.uxFocus;
  if(record)pushHistory(key);
  updateNav();
  syncInspector();
}
function goHome(){
  if(inspectorOpen())closePanel();
  applyFocus(null,true);
}
function goHistory(delta){
  const next=historyIndex+delta;
  if(next<0||next>=history.length)return;
  if(inspectorOpen())closePanel();
  historyIndex=next;
  applyFocus(history[historyIndex],false);
}
function setText(el,value){
  if(el&&el.textContent!==value)el.textContent=value;
}
function updateNav(){
  const nav=makeNav();
  const visible=inOverview()&&(!!focusKey||inspectorOpen());
  nav.classList.toggle('visible',visible);
  nav.querySelector('#uxFocusBack').disabled=historyIndex<=0;
  nav.querySelector('#uxFocusForward').disabled=historyIndex>=history.length-1;

  const crumbs=nav.querySelector('#uxFocusCrumbs');
  crumbs.innerHTML='';
  const home=document.createElement('button');
  home.className='ux-crumb'+(!focusKey&&!currentSelection.id?' current':'');
  home.textContent='Overview';
  home.onclick=goHome;
  crumbs.appendChild(home);

  if(focusKey){
    const sep=document.createElement('span');
    sep.className='ux-sep';sep.textContent='›';crumbs.appendChild(sep);
    const focus=document.createElement('span');
    focus.className='ux-crumb'+(!currentSelection.id?' current':'');
    focus.textContent=FOCI[focusKey].label;
    crumbs.appendChild(focus);
  }
  if(currentSelection.id&&inspectorOpen()){
    const sep=document.createElement('span');
    sep.className='ux-sep';sep.textContent='›';crumbs.appendChild(sep);
    const selected=document.createElement('span');
    selected.className='ux-crumb current';
    selected.textContent=currentSelection.id;
    crumbs.appendChild(selected);
  }

  const hintTitle=document.querySelector('#uxFocusHintTitle');
  const hintCopy=document.querySelector('#uxFocusHintCopy');
  if(focusKey){
    setText(hintTitle,FOCI[focusKey].label);
    setText(hintCopy,FOCI[focusKey].hint+' · Esc to return');
  }else{
    setText(hintTitle,'');
    setText(hintCopy,'');
  }
}
function readSelection(){
  const inspector=document.querySelector('#uxInspector');
  if(!inspector?.classList.contains('open'))return{id:null,kind:null,title:null,focus:null};
  const id=inspector.querySelector('#uxInspectorId')?.textContent?.trim()||null;
  const kind=inspector.querySelector('#uxInspectorKind')?.textContent?.trim()||'';
  const title=inspector.querySelector('#uxInspectorTitle')?.textContent?.trim()||'';
  return{id,kind,title,focus:inferFocus(id,kind,title)};
}
function syncInspector(){
  makeNav();
  const button=makeFocusButton();
  currentSelection=readSelection();
  if(button){
    const key=currentSelection.focus;
    button.hidden=!inOverview()||!inspectorOpen()||!key;
    if(key){
      button.dataset.focus=key;
      const focused=focusKey===key;
      button.disabled=focused;
      setText(button,focused?'Focused · '+FOCI[key].label:'Focus '+FOCI[key].label);
    }else{
      button.disabled=true;
      button.removeAttribute('data-focus');
    }
  }
  updateNav();
}
function syncMode(){
  if(!inOverview()){
    focusKey=null;
    document.body.classList.remove('ux-focused');
    delete document.body.dataset.uxFocus;
    currentSelection={id:null,kind:null,title:null,focus:null};
    history=[null];
    historyIndex=0;
  }
  syncInspector();
}

panel=function(...args){
  const out=priorPanel.apply(this,args);
  queueMicrotask(syncInspector);
  return out;
};
closePanel=function(...args){
  const out=priorClosePanel.apply(this,args);
  queueMicrotask(syncInspector);
  return out;
};

document.addEventListener('keydown',e=>{
  if(e.key!=='Escape'||!inOverview()||e.defaultPrevented)return;
  if(!inspectorOpen()&&focusKey){
    e.preventDefault();
    applyFocus(null,true);
  }
});
document.addEventListener('dblclick',e=>{
  if(!inOverview())return;
  const marker=e.target.closest?.('i[data-label],i[class]');
  if(!marker)return;
  setTimeout(()=>{
    const selection=readSelection();
    if(selection.focus)applyFocus(selection.focus,true);
  },0);
},true);

makeNav();
makeFocusButton();
new MutationObserver(syncMode).observe(document.body,{attributes:true,attributeFilter:['class']});
syncMode();
})();