(()=>{
const LEVELS=['systems','institutions','records'];
const LABELS={systems:'Systems',institutions:'Institutions',records:'Records'};
const SYSTEM_CLASSES=new Set(['monetaryAuthority','fxMarket','tradeAccount','stabilizationFund','fundBoard']);
const INSTITUTION_CLASSES=new Set(['fxCurrency','liquidityFacility','stabilizationProgram','fundDirector']);
let level='systems';
let wasFocused=false;
let classifyQueued=false;

function inOverview(){
  return document.body.classList.contains('ux-overview');
}
function isFocused(){
  return document.body.classList.contains('ux-focused');
}
function classifyMarker(marker){
  if(!(marker instanceof Element)||marker.tagName!=='I')return;
  const layer=marker.parentElement;
  if(!layer||layer.parentElement!==document.body||!layer.id.includes('Layer'))return;
  const classes=[...marker.classList];
  let detail='record';
  if(classes.some(c=>SYSTEM_CLASSES.has(c)))detail='system';
  else if(classes.some(c=>INSTITUTION_CLASSES.has(c)||/Office\d+$/.test(c)))detail='institution';
  marker.dataset.uxDetail=detail;
}
function classifyTree(node){
  if(!(node instanceof Element))return;
  if(node.tagName==='I')classifyMarker(node);
  for(const marker of node.querySelectorAll?.('i')||[])classifyMarker(marker);
}
function classifyAll(){
  for(const layer of document.querySelectorAll('body>div[id*="Layer"]')){
    for(const marker of layer.querySelectorAll(':scope>i'))classifyMarker(marker);
  }
}
function scheduleClassify(nodes=[]){
  for(const node of nodes)classifyTree(node);
  if(classifyQueued)return;
  classifyQueued=true;
  queueMicrotask(()=>{
    classifyQueued=false;
    classifyAll();
  });
}
function makeControl(){
  let root=document.querySelector('#uxSemanticZoom');
  if(root)return root;
  const bar=document.querySelector('#uxModeBar');
  if(!bar)return null;
  root=document.createElement('div');
  root.id='uxSemanticZoom';
  root.setAttribute('aria-label','Semantic zoom');
  root.innerHTML='<button class="ux-zoom-button" id="uxZoomOut" aria-label="Show less detail" title="Show less detail">−</button><div class="ux-zoom-level" id="uxZoomLevel"><span></span><small>detail</small></div><button class="ux-zoom-button" id="uxZoomIn" aria-label="Show more detail" title="Show more detail">+</button>';
  bar.appendChild(root);
  root.querySelector('#uxZoomOut').onclick=()=>step(-1);
  root.querySelector('#uxZoomIn').onclick=()=>step(1);
  return root;
}
function updateControl(){
  const root=makeControl();
  if(!root)return;
  const i=LEVELS.indexOf(level);
  const label=root.querySelector('#uxZoomLevel span');
  if(label)label.textContent=LABELS[level];
  root.querySelector('#uxZoomOut').disabled=i<=0;
  root.querySelector('#uxZoomIn').disabled=i>=LEVELS.length-1;
  root.setAttribute('data-level',level);
}
function applyLevel(next){
  if(!LEVELS.includes(next))next='systems';
  level=next;
  if(document.body.dataset.uxZoom!==level)document.body.dataset.uxZoom=level;
  updateControl();
  classifyAll();
}
function step(delta){
  if(!inOverview())return;
  const i=LEVELS.indexOf(level);
  const next=Math.max(0,Math.min(LEVELS.length-1,i+delta));
  applyLevel(LEVELS[next]);
}
function syncMode(){
  const focused=isFocused()&&inOverview();
  if(!inOverview()){
    wasFocused=false;
    applyLevel('systems');
    return;
  }
  if(focused&&!wasFocused){
    if(level==='systems')applyLevel('institutions');
  }else if(!focused&&wasFocused){
    applyLevel('systems');
  }else{
    updateControl();
  }
  wasFocused=focused;
}
document.addEventListener('keydown',e=>{
  if(!inOverview()||e.metaKey||e.ctrlKey||e.altKey||e.defaultPrevented)return;
  const tag=e.target?.tagName;
  if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT')return;
  if(e.key==='['){
    e.preventDefault();
    step(-1);
  }else if(e.key===']'){
    e.preventDefault();
    step(1);
  }
});

makeControl();
classifyAll();
applyLevel('systems');
wasFocused=isFocused()&&inOverview();

new MutationObserver(records=>{
  const added=[];
  let bodyModeChanged=false;
  for(const record of records){
    if(record.type==='childList')added.push(...record.addedNodes);
    if(record.type==='attributes'&&record.target===document.body)bodyModeChanged=true;
  }
  if(added.length)scheduleClassify(added);
  if(bodyModeChanged)syncMode();
}).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','data-ux-focus']});
})();