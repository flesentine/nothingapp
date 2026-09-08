(()=>{
const priorRenderAll=renderAll;
const priorPanel=panel;
const CATEGORY_DEFS=[
  {id:'stabilization',label:'Stabilization & governance',re:/stabil|fund|board|quota|surveil|conditional|recap|recoup|restitution|replenish|drawing|governance|majority/i},
  {id:'monetary',label:'Monetary supervision',re:/monetary|facility|lender|capital|collateral|margin|steriliz|refinanc|cash sweep|cross.?default|netting|interest|supervis/i},
  {id:'external',label:'External economy & markets',re:/\bfx\b|foreign|trade|currency|carry|exchange|treaty|debt|claim|repo|title|derivative|clearing|recovery|bond|market/i},
  {id:'civic',label:'Institutions & civic stack',re:/trial|testimony|transcript|redact|leak|consensus|mandate|constitution|judici|ruling|law|warrant|border|citizen|franchise|office|administration|election|quorum|supply|procurement|oversight|standard|insurance/i},
  {id:'system',label:'System',re:/.*/}
];
const FOCUS_CATEGORY={stabilization:'stabilization',supervision:'monetary',external:'external'};
let open=false;
let search='';
let pendingDanger=null;
let refreshQueued=false;

function inOverview(){
  return document.body.classList.contains('ux-overview');
}
function categoryFor(button){
  const hay=(button.id+' '+button.textContent).trim();
  return CATEGORY_DEFS.find(c=>c.re.test(hay))||CATEGORY_DEFS[CATEGORY_DEFS.length-1];
}
function isDanger(button){
  return button.id==='forget'||/\b(?:forget|reset|clear all|erase)\b/i.test(button.textContent||'');
}
function collectActions(){
  return [...document.querySelectorAll('#app>.controls>button')]
    .filter(button=>!button.hidden&&button.style.display!=='none'&&String(button.textContent||'').trim())
    .map((button,index)=>{
      const category=categoryFor(button);
      return{
        key:button.id||('control-'+index),
        id:button.id||'',
        label:String(button.textContent||'').trim().replace(/\s+/g,' '),
        category:category.id,
        categoryLabel:category.label,
        disabled:button.disabled,
        danger:isDanger(button),
        source:button
      };
    });
}
function categoryRank(id){
  const focus=FOCUS_CATEGORY[document.body.dataset.uxFocus||''];
  if(focus&&id===focus)return-1;
  return CATEGORY_DEFS.findIndex(c=>c.id===id);
}
function filteredActions(){
  const q=search.trim().toLowerCase();
  const all=collectActions();
  const filtered=q?all.filter(a=>(a.label+' '+a.id+' '+a.categoryLabel).toLowerCase().includes(q)):all;
  filtered.sort((a,b)=>
    categoryRank(a.category)-categoryRank(b.category)||
    Number(a.disabled)-Number(b.disabled)||
    a.label.localeCompare(b.label)
  );
  return{all,filtered};
}
function makeUI(){
  let toggle=document.querySelector('#uxActionToggle');
  if(!toggle){
    const bar=document.querySelector('#uxModeBar');
    if(bar){
      toggle=document.createElement('button');
      toggle.id='uxActionToggle';
      toggle.type='button';
      toggle.innerHTML='<span>Actions</span><span class="ux-action-key">⌘K</span>';
      toggle.setAttribute('aria-label','Open action palette');
      toggle.setAttribute('aria-expanded','false');
      toggle.onclick=()=>open?closePalette():openPalette();
      bar.appendChild(toggle);
    }
  }
  let backdrop=document.querySelector('#uxActionBackdrop');
  if(!backdrop){
    backdrop=document.createElement('div');
    backdrop.id='uxActionBackdrop';
    backdrop.onclick=()=>closePalette();
    document.body.appendChild(backdrop);
  }
  let panelEl=document.querySelector('#uxActionPalette');
  if(!panelEl){
    panelEl=document.createElement('aside');
    panelEl.id='uxActionPalette';
    panelEl.setAttribute('role','dialog');
    panelEl.setAttribute('aria-modal','true');
    panelEl.setAttribute('aria-label','Actions');
    panelEl.innerHTML='<div class="ux-action-head"><div><div class="ux-action-eyebrow">Original controls, one place</div><div class="ux-action-title">Actions</div></div><button class="ux-action-close" type="button" aria-label="Close actions">×</button></div><div class="ux-action-search-wrap"><span>⌕</span><input id="uxActionSearch" type="search" autocomplete="off" spellcheck="false" placeholder="Search actions…" aria-label="Search actions"></div><div class="ux-action-meta"><span id="uxActionCount"></span><span id="uxActionContext"></span></div><div id="uxActionList"></div><div class="ux-action-foot"><span>Enter an action to run its original control.</span><span>Esc closes · ⌘/Ctrl K toggles</span></div>';
    document.body.appendChild(panelEl);
    panelEl.querySelector('.ux-action-close').onclick=()=>closePalette();
    const input=panelEl.querySelector('#uxActionSearch');
    input.oninput=()=>{
      search=input.value;
      pendingDanger=null;
      render();
    };
  }
  return{toggle,backdrop,panel:panelEl};
}
function closeCompetingSurfaces(){
  const timeline=document.querySelector('#uxTimelineToggle');
  if(timeline?.getAttribute('aria-expanded')==='true')timeline.click();
  if(document.querySelector('#uxInspector.open'))closePanel();
}
function openPalette(){
  if(!inOverview())return;
  closeCompetingSurfaces();
  open=true;
  search='';
  pendingDanger=null;
  document.body.classList.add('ux-action-open');
  const {toggle,panel}=makeUI();
  toggle?.classList.add('active');
  toggle?.setAttribute('aria-expanded','true');
  const input=panel.querySelector('#uxActionSearch');
  input.value='';
  render();
  queueMicrotask(()=>input.focus());
}
function closePalette(){
  if(!open&&!document.body.classList.contains('ux-action-open'))return;
  open=false;
  pendingDanger=null;
  document.body.classList.remove('ux-action-open');
  const toggle=document.querySelector('#uxActionToggle');
  toggle?.classList.remove('active');
  toggle?.setAttribute('aria-expanded','false');
}
function actionButton(a){
  const button=document.createElement('button');
  button.type='button';
  button.className='ux-action-item';
  if(a.danger)button.dataset.danger='true';
  if(a.disabled)button.disabled=true;
  const label=document.createElement('span');
  label.className='ux-action-label';
  label.textContent=(pendingDanger===a.key?'Confirm · ':'')+a.label;
  const meta=document.createElement('span');
  meta.className='ux-action-source';
  meta.textContent=a.id||a.categoryLabel;
  button.append(label,meta);
  button.onclick=()=>{
    if(a.disabled||!a.source?.isConnected)return;
    if(a.danger&&pendingDanger!==a.key){
      pendingDanger=a.key;
      render();
      document.querySelector('[data-ux-action-key="'+CSS.escape(a.key)+'"]')?.focus();
      return;
    }
    closePalette();
    a.source.click();
  };
  button.dataset.uxActionKey=a.key;
  return button;
}
function render(){
  const {panel}=makeUI();
  if(!open)return;
  const {all,filtered}=filteredActions();
  const count=panel.querySelector('#uxActionCount');
  count.textContent=search?filtered.length+' of '+all.length+' actions':all.length+' actions';
  const focus=document.body.dataset.uxFocus;
  const context=panel.querySelector('#uxActionContext');
  context.textContent=focus?({stabilization:'Stabilization focus',supervision:'Monetary Supervision focus',external:'External Economy focus'}[focus]||'Focused view'):'Overview';
  const list=panel.querySelector('#uxActionList');
  list.innerHTML='';
  if(!filtered.length){
    const empty=document.createElement('div');
    empty.className='ux-action-empty';
    empty.textContent='No matching original control.';
    list.appendChild(empty);
    return;
  }
  const byCategory=new Map();
  for(const action of filtered){
    if(!byCategory.has(action.category))byCategory.set(action.category,[]);
    byCategory.get(action.category).push(action);
  }
  for(const [category,actions] of byCategory){
    const section=document.createElement('section');
    section.className='ux-action-group';
    if(FOCUS_CATEGORY[focus]===category)section.dataset.current='true';
    const head=document.createElement('div');
    head.className='ux-action-group-head';
    const def=CATEGORY_DEFS.find(c=>c.id===category);
    head.innerHTML='<span></span><small></small>';
    head.querySelector('span').textContent=def?.label||category;
    head.querySelector('small').textContent=actions.length;
    const grid=document.createElement('div');
    grid.className='ux-action-grid';
    for(const action of actions)grid.appendChild(actionButton(action));
    section.append(head,grid);
    list.appendChild(section);
  }
}
function scheduleRefresh(){
  if(!open||refreshQueued)return;
  refreshQueued=true;
  queueMicrotask(()=>{
    refreshQueued=false;
    if(open)render();
  });
}

renderAll=function(...args){
  const out=priorRenderAll.apply(this,args);
  scheduleRefresh();
  return out;
};
panel=function(...args){
  if(open)closePalette();
  return priorPanel.apply(this,args);
};

document.addEventListener('keydown',event=>{
  if((event.metaKey||event.ctrlKey)&&!event.altKey&&event.key.toLowerCase()==='k'){
    event.preventDefault();
    event.stopPropagation();
    if(inOverview())open?closePalette():openPalette();
    return;
  }
  if(event.key==='Escape'&&open){
    event.preventDefault();
    event.stopImmediatePropagation();
    closePalette();
  }
},true);

new MutationObserver(()=>{
  if(!inOverview()||document.body.classList.contains('ux-timeline-open'))closePalette();
  else scheduleRefresh();
}).observe(document.body,{attributes:true,attributeFilter:['class','data-ux-focus','data-ux-zoom']});

const controls=document.querySelector('#app>.controls');
if(controls)new MutationObserver(scheduleRefresh).observe(controls,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled','hidden']});

makeUI();
})();