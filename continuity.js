(()=>{
const BS25=save,BR25=renderAll,O25=JSON.parse(localStorage.getItem('nothing-state-v25')||'null')||{},pick=a=>a&&a.length?a[Math.floor(Math.random()*a.length)]:null,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
S.custodians=O25.custodians||[];S.continuityOrders=O25.continuityOrders||[];S.custodianSerial=O25.custodianSerial||0;S.continuityOrderSerial=O25.continuityOrderSerial||0;S.emergencyDeclarations=O25.emergencyDeclarations||0;S.emergencyExtensions=O25.emergencyExtensions||0;S.handoverDemands=O25.handoverDemands||0;S.refusedHandovers=O25.refusedHandovers||0;S.continuitySuccessions=O25.continuitySuccessions||0;S.emergencyCrises=O25.emergencyCrises||0;S.lastEmergencyCrisis=O25.lastEmergencyCrisis||0;
S.custodians=S.custodians.map((c,i)=>({id:c.id||'E'+(i+1),reality:c.reality||'A',source:c.source||'continuity office',status:c.status||'acting',authority:Number.isFinite(c.authority)?c.authority:.62,declared:c.declared||Date.now(),expiresAt:c.expiresAt||Date.now()+18000,extensions:c.extensions||0,refusals:c.refusals||0,orders:c.orders||0,reason:c.reason||'institutional continuity',predecessorId:c.predecessorId||null,promisedExit:c.promisedExit||'when normal authority is restored',x:Number.isFinite(c.x)?c.x:12+Math.random()*76,y:Number.isFinite(c.y)?c.y:12+Math.random()*68}));
S.continuityOrders=S.continuityOrders.map((o,i)=>({id:o.id||'EO'+(i+1),custodianId:o.custodianId||null,reality:o.reality||'A',kind:o.kind||'stay',targetType:o.targetType||null,targetId:o.targetId||null,status:o.status||'active',previousStatus:o.previousStatus||null,text:o.text||'Emergency continuity order',created:o.created||Date.now(),x:Number.isFinite(o.x)?o.x:12+Math.random()*76,y:Number.isFinite(o.y)?o.y:12+Math.random()*68}));
function save25(){BS25();localStorage.setItem('nothing-state-v25',JSON.stringify({custodians:S.custodians,continuityOrders:S.continuityOrders,custodianSerial:S.custodianSerial,continuityOrderSerial:S.continuityOrderSerial,emergencyDeclarations:S.emergencyDeclarations,emergencyExtensions:S.emergencyExtensions,handoverDemands:S.handoverDemands,refusedHandovers:S.refusedHandovers,continuitySuccessions:S.continuitySuccessions,emergencyCrises:S.emergencyCrises,lastEmergencyCrisis:S.lastEmergencyCrisis}))}save=save25;
const charter=id=>[...S.constitutions].reverse().find(c=>c.reality===id&&c.status==='ratified'),highCourt=id=>[...S.courts].reverse().find(c=>c.reality===id&&c.status!=='dissolved'),activeCustodian=id=>[...S.custodians].reverse().find(c=>c.reality===id&&['acting','entrenched'].includes(c.status)),ordersFor=c=>S.continuityOrders.filter(o=>o.custodianId===c.id&&o.status==='active');
function emergencyReason(id){
  let c=highCourt(id),con=charter(id);
  if(c?.status==='orphaned')return'an orphaned constitutional court is issuing opinions without a valid charter';
  if(c&&!con)return'the high court survives but its founding constitution does not';
  if(S.circuitSplits>0&&S.supremacyCrises>0)return'constitutional authorities are issuing incompatible final answers';
  if(S.legitimacyCrises>1)return'no institution can establish uncontested sovereignty';
  if(S.constitutionalPartitions>0&&S.circuitSplits>0)return'the realities have incompatible constitutions and incompatible precedent';
  return null;
}
function appointSource(id,reason){
  let c=highCourt(id),con=charter(id);
  if(c?.status==='orphaned'||(c&&!con))return'orphaned high court';
  if(S.mandates.some(m=>m.status==='active'&&(m.scope==='both'||m.scope===id))&&S.legitimacyCrises)return'electorate';
  if(S.laws.some(l=>l.status==='active'))return'archive continuity office';
  if(S.transcripts.some(t=>t.status==='certified'))return'certified record';
  return'lived memory';
}
function declareEmergency(id=S.active,forced=false,predecessor=null){
  let existing=activeCustodian(id);if(existing)return existing;
  let reason=forced?'continuity was declared before anyone agreed it was necessary':emergencyReason(id);
  if(!reason&&!forced)return null;
  let source=predecessor?'continuity succession':appointSource(id,reason),base=source==='orphaned high court'?.68:source==='electorate'?.64:source==='archive continuity office'?.66:.6;
  let c={id:'E'+(++S.custodianSerial),reality:id,source,status:'acting',authority:base,declared:Date.now(),expiresAt:Date.now()+17000+Math.random()*7000,extensions:0,refusals:0,orders:0,reason,predecessorId:predecessor?.id||null,promisedExit:'when normal authority is restored',x:12+Math.random()*76,y:12+Math.random()*68};
  S.custodians.push(c);S.custodians=S.custodians.slice(-28);S.emergencyDeclarations++;
  remember('EMERGENCY CONTINUITY: '+c.id+' appointed by '+source,S.real[id]);if(typeof place==='function')place('cold','temporary office',S.real[id]);
  S.bailiffMood='taking temporary instructions from '+c.id;
  $('#msg').textContent='Reality '+id+' appointed '+c.id+' as continuity custodian. It promises to leave later.';
  renderContinuity();save25();return c;
}
function targetCandidates(c){
  let id=c.reality,out=[];
  for(const l of S.laws.filter(l=>l.status==='active'))out.push({type:'law',id:l.id,obj:l,label:l.title||l.id});
  for(const m of S.mandates.filter(m=>m.status==='active'&&(m.scope==='both'||m.scope===id)))out.push({type:'mandate',id:m.id,obj:m,label:m.id+' mandate'});
  for(const k of S.reviewCases.filter(k=>k.reality===id&&['filed','arguing'].includes(k.status)))out.push({type:'case',id:k.id,obj:k,label:k.id+' constitutional case'});
  for(const w of S.warrants.filter(w=>w.status==='active'))out.push({type:'warrant',id:w.id,obj:w,label:w.id+' warrant'});
  for(const z of S.redactions.filter(z=>z.status==='sealed'))out.push({type:'redaction',id:z.id,obj:z,label:z.id+' sealed redaction'});
  return out.filter(x=>!S.continuityOrders.some(o=>o.status==='active'&&o.targetType===x.type&&o.targetId===x.id));
}
function issueOrder(c){
  if(!c||!['acting','entrenched'].includes(c.status))return;
  let t=pick(targetCandidates(c));
  if(!t){
    remember('CONTINUITY ORDER: ordinary procedure is suspended until ordinary procedure returns',S.real[c.reality]);
    c.orders++;c.authority=cl(c.authority+.01,.4,.99);$('#msg').textContent=c.id+' issued an order with no identifiable target.';save25();return;
  }
  let previous=t.obj.status,kind='stay';
  if(t.type==='redaction'){kind='preserve';t.obj.authority=cl((t.obj.authority||.7)+.04,.2,.99)}
  else t.obj.status='emergency-stayed';
  let o={id:'EO'+(++S.continuityOrderSerial),custodianId:c.id,reality:c.reality,kind,targetType:t.type,targetId:t.id,status:'active',previousStatus:previous,text:(kind==='preserve'?'Emergency preservation of ':'Emergency stay of ')+t.label,created:Date.now(),x:12+Math.random()*76,y:12+Math.random()*68};
  S.continuityOrders.push(o);S.continuityOrders=S.continuityOrders.slice(-40);c.orders++;c.authority=cl(c.authority+.012,.4,.99);
  remember('CONTINUITY ORDER '+o.id+': '+o.text,S.real[c.reality]);$('#msg').textContent=c.id+' issued '+o.id+'. Temporary authority just froze '+t.label+'.';renderAll();save25();
}
function restoreOrders(c){
  for(const o of ordersFor(c)){
    let obj=o.targetType==='law'?S.laws.find(x=>x.id===o.targetId):o.targetType==='mandate'?S.mandates.find(x=>x.id===o.targetId):o.targetType==='case'?S.reviewCases.find(x=>x.id===o.targetId):o.targetType==='warrant'?S.warrants.find(x=>x.id===o.targetId):o.targetType==='redaction'?S.redactions.find(x=>x.id===o.targetId):null;
    if(obj&&obj.status==='emergency-stayed')obj.status=o.previousStatus||'active';
    o.status='expired';
  }
}
function stability(id){
  let con=charter(id),c=highCourt(id),score=0;
  if(con)score+=2;if(c&&c.status==='active')score+=2;if(c?.status==='orphaned')score-=3;
  if(S.legitimacyCrises===0)score++;if(S.supremacyCrises===0)score++;if(S.circuitSplits===0)score++;
  if(S.mandates.some(m=>m.status==='active'&&(m.scope==='both'||m.scope===id))&&S.laws.some(l=>l.status==='active'))score--;
  return score;
}
function handover(c,forced=false){
  if(!c||!['acting','entrenched'].includes(c.status))return;
  S.handoverDemands++;let stable=stability(c.reality),chance=.22+stable*.08-c.authority*.12-c.refusals*.07+(forced?.08:0);
  if(Math.random()<cl(chance,.08,.72)){
    c.status='retired';restoreOrders(c);S.continuitySuccessions++;remember('POWER RETURNED: '+c.id+' ended emergency rule',S.real[c.reality]);if(typeof place==='function')place('warm','returned keys',S.real[c.reality]);S.bailiffMood='looking for ordinary authority';$('#msg').textContent=c.id+' accepted the handover demand. The emergency ended, but its orders remain in history.';
  }else{
    c.refusals++;S.refusedHandovers++;c.extensions++;S.emergencyExtensions++;c.expiresAt=Date.now()+15000+Math.random()*8000;c.authority=cl(c.authority+.055,.4,.99);if(c.refusals>=2)c.status='entrenched';
    remember('HANDOVER REFUSED: '+c.id+' found continued emergency necessary',S.real[c.reality]);if(typeof place==='function')place('cold','temporary office with permanent locks',S.real[c.reality]);$('#msg').textContent=c.id+' refused to leave. Surviving the handover demand increased its continuity authority.';
  }
  closePanel();renderAll();save25();
}
function recognize(c){
  if(!c||!['acting','entrenched'].includes(c.status))return;c.authority=cl(c.authority+.06,.4,.99);c.expiresAt+=5000;remember('CONTINUITY RECOGNIZED: '+c.id,S.real[c.reality]);$('#msg').textContent='You recognized '+c.id+'. Its temporary mandate became easier to renew.';openCustodian(c);save25();
}
function successor(c){
  if(!c||!['acting','entrenched'].includes(c.status))return null;
  c.status='transitioned';restoreOrders(c);S.continuitySuccessions++;let n=declareEmergency(c.reality,true,c);if(n){n.authority=cl(c.authority-.03,.55,.95);n.reason='the previous temporary custodian transferred continuity before normal government resumed';n.promisedExit='after the transition from the previous emergency is complete';remember('SUCCESSION: '+c.id+' transferred emergency continuity to '+n.id,S.real[c.reality]);$('#msg').textContent=c.id+' stepped down by appointing '+n.id+'. The office survived the resignation.';}return n;
}
function emergencyConflict(c){
  if(!c||!['acting','entrenched'].includes(c.status)||Date.now()-S.lastEmergencyCrisis<10000)return false;
  let con=charter(c.reality),courtNow=highCourt(c.reality),why=null;
  if(con&&c.authority>.7)why='a temporary custodian claims powers under a restored constitution';
  if(courtNow?.status==='active'&&c.source==='orphaned high court'&&con)why='the institution that appointed emergency rule has regained ordinary jurisdiction';
  if(c.status==='entrenched'&&S.mandates.some(m=>m.status==='active'&&(m.scope==='both'||m.scope===c.reality)))why='popular government demands succession while emergency government refuses';
  if(!why)return false;
  S.emergencyCrises++;S.lastEmergencyCrisis=Date.now();let r=S.real[c.reality];r.timelineDrift+=2;r.disputes++;remember('SUCCESSION CRISIS: '+why,r);if(typeof place==='function')place('dream','government waiting room',r);S.bailiffMood='waiting for the emergency to end';$('#msg').textContent='SUCCESSION CRISIS: '+why+'.';return true;
}
function termTick(c){
  if(!c||!['acting','entrenched'].includes(c.status)||Date.now()<c.expiresAt)return;
  let s=stability(c.reality);
  if(c.status==='entrenched'||c.authority>.78||s<3){
    c.extensions++;S.emergencyExtensions++;c.expiresAt=Date.now()+15000+Math.random()*8000;c.authority=cl(c.authority+.025,.4,.99);remember('EMERGENCY EXTENDED: '+c.id+' determined that transition remains unsafe',S.real[c.reality]);
    if(c.extensions>=3&&Math.random()<.28)successor(c);else $('#msg').textContent=c.id+' extended its own emergency because the conditions for ending it were not met.';
  }else if(Math.random()<.42)handover(c,false);else successor(c);
}
function openOrder(o){panel(o.id+' · '+o.status+' continuity order',o.text,'Reality '+o.reality+' · '+o.targetType+' '+o.targetId+' · issued by '+o.custodianId,[['close',closePanel]])}
function openCustodian(c){
  let b=[];if(['acting','entrenched'].includes(c.status))b.push(['issue continuity order',()=>{issueOrder(c);openCustodian(c)}],['demand handover',()=>handover(c,true)],['recognize emergency',()=>recognize(c)]);if(c.status==='entrenched')b.push(['ask for named successor',()=>{let n=successor(c);closePanel();renderAll();if(n)openCustodian(n)}]);b.push(['close',closePanel]);
  panel(c.id+' · '+c.status+' continuity custodian','Reality '+c.reality+' emergency authority\n\nAppointed by: '+c.source+'\nReason: '+c.reason+'\nPromise: leave '+c.promisedExit,'authority '+Math.round(c.authority*100)+'% · extensions '+c.extensions+' · refused handovers '+c.refusals+' · orders '+c.orders+(c.predecessorId?' · predecessor '+c.predecessorId:''),b);
}
function renderContinuity(){
  let l=$('#continuityLayer');if(!l){l=document.createElement('div');l.id='continuityLayer';document.body.appendChild(l)}l.innerHTML='';
  for(const c of S.custodians.slice(-14)){let n=document.createElement('i');n.className='custodian '+c.status;n.dataset.label=c.id+' '+c.reality;n.style.left=c.x+'%';n.style.top=c.y+'%';n.onclick=()=>openCustodian(c);l.appendChild(n)}
  for(const o of S.continuityOrders.slice(-18)){let n=document.createElement('i');n.className='continuityorder '+o.status;n.dataset.label=o.id;n.style.left=o.x+'%';n.style.top=o.y+'%';n.onclick=()=>openOrder(o);l.appendChild(n)}
  let line=$('#continuityline');if(!line){line=document.createElement('div');line.id='continuityline';line.className='line';($('#judiciaryline')||$('#constitutionline')||$('#enforcement')).after(line)}
  line.textContent='continuity: '+S.custodians.filter(c=>['acting','entrenched'].includes(c.status)).length+' custodians · '+S.emergencyDeclarations+' declarations · '+S.emergencyExtensions+' extensions · '+S.refusedHandovers+' refused handovers · '+S.continuitySuccessions+' successions · '+S.emergencyCrises+' succession crises';
  let ctr=document.querySelector('#app .controls');
  if(ctr&&!$('#emergencyButton')){let b=document.createElement('button');b.id='emergencyButton';b.textContent='declare emergency';b.onclick=()=>{let c=declareEmergency(S.active,true);c?openCustodian(c):$('#msg').textContent='Emergency authority is already occupied.'};ctr.prepend(b)}
  if(ctr&&!$('#continuityButton')){let b=document.createElement('button');b.id='continuityButton';b.textContent='open continuity office';b.onclick=()=>{let c=activeCustodian(S.active)||[...S.custodians].reverse().find(c=>c.reality===S.active);c?openCustodian(c):($('#msg').textContent='No continuity office exists in this reality yet.')};ctr.prepend(b)}
}
renderAll=function(){BR25();for(const id of['A','B']){let reason=emergencyReason(id);if(reason&&!activeCustodian(id)&&Math.random()<.08)declareEmergency(id,false);let c=activeCustodian(id);if(c){emergencyConflict(c);termTick(c)}}renderContinuity()};
let f=$('#forget');if(f)f.onclick=()=>{for(let i=2;i<=25;i++)localStorage.removeItem('nothing-state-v'+i);location.reload()};
setInterval(()=>{for(const id of['A','B']){let reason=emergencyReason(id);if(reason&&!activeCustodian(id)&&Math.random()<.04)declareEmergency(id,false);let c=activeCustodian(id);if(c){if(Math.random()<.06)issueOrder(c);termTick(c);emergencyConflict(c)}}renderContinuity();save25()},1600);
renderAll();save25();
})();