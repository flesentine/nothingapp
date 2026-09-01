/* Nothing — Build 16: trial by reality */
(()=>{
  const baseSave=save, baseServeWarrant=serveWarrant, baseContestWarrant=contestWarrant, baseRenderAll=renderAll;
  const old16=JSON.parse(localStorage.getItem('nothing-state-v16')||'null')||{};

  S.trials=old16.trials||[];
  S.trialSerial=old16.trialSerial||0;
  S.verdicts=old16.verdicts||0;
  S.convictions=old16.convictions||0;
  S.acquittals=old16.acquittals||0;
  S.mistrials=old16.mistrials||0;
  S.nullifications=old16.nullifications||0;
  S.testimony=old16.testimony||0;
  S.objections=old16.objections||0;
  S.juryContamination=old16.juryContamination||0;

  S.trials=S.trials.map((t,i)=>({
    id:t.id||'T'+(i+1),warrantId:t.warrantId||null,target:t.target||'thing',lawId:t.lawId||null,
    reason:t.reason||'unresolved accusation',status:t.status||'closed',started:t.started||Date.now(),
    deliberatingAt:t.deliberatingAt||Date.now()+9000,verdictAt:t.verdictAt||Date.now()+18000,
    evidence:t.evidence||[],jury:t.jury||[],votes:t.votes||[],verdict:t.verdict||null,
    interventions:t.interventions||0,x:Number.isFinite(t.x)?t.x:12+Math.random()*76,
    y:Number.isFinite(t.y)?t.y:12+Math.random()*68,notes:t.notes||[]
  }));

  function save16(){
    baseSave();
    localStorage.setItem('nothing-state-v16',JSON.stringify({
      trials:S.trials,trialSerial:S.trialSerial,verdicts:S.verdicts,convictions:S.convictions,
      acquittals:S.acquittals,mistrials:S.mistrials,nullifications:S.nullifications,
      testimony:S.testimony,objections:S.objections,juryContamination:S.juryContamination
    }));
  }
  save=save16;

  function openTrials(){return S.trials.filter(t=>t.status==='hearing'||t.status==='deliberating')}
  function trialForWarrant(w){return S.trials.find(t=>t.warrantId===w.id&&(t.status==='hearing'||t.status==='deliberating'))}
  function sample(a){return a&&a.length?a[Math.floor(Math.random()*a.length)]:null}
  function evidenceItem(type,text,side,weight=1){return{id:'e'+Date.now()+Math.random(),type,text,side,weight}}
  function lawFor(t){return S.laws.find(l=>l.id===t.lawId)||null}
  function warrantFor(t){return S.warrants.find(w=>w.id===t.warrantId)||null}

  function assembleEvidence(w){
    const r=R(),o=O(),law=S.laws.find(l=>l.id===w.lawId),ev=[];
    ev.push(evidenceItem('warrant',w.reason,'prosecution',2));
    if(law)ev.push(evidenceItem('statute',law.title+' · '+law.text,'prosecution',1.8+law.entrenched*.25));
    const mem=sample(r.memories); if(mem)ev.push(evidenceItem('memory',mem,/CITATION|OFFICIAL|bailiff/i.test(mem)?'prosecution':'defense',1.25));
    const p=sample(r.places.filter(x=>!x.impounded)); if(p)ev.push(evidenceItem('place',p.name,p.type==='cold'?'prosecution':p.type==='warm'?'defense':Math.random()<.5?'defense':'prosecution',1.2));
    const m=sample(S.msgs.filter(x=>x.status==='kept'||x.status==='delivered')); if(m)ev.push(evidenceItem('letter','“'+m.text+'”',m.forged?'prosecution':Math.random()<.55?'defense':'prosecution',m.forged?1.7:1));
    const f=sample(r.futures.filter(x=>x.status==='pending')); if(f)ev.push(evidenceItem('future',Math.round(f.prob*100)+'% · '+f.text,f.prob>.7?'prosecution':'defense',1.1));
    const om=sample(o.memories); if(om)ev.push(evidenceItem('other reality',om,Math.random()<.5?'defense':'prosecution',1.35));
    const d=sample(S.dead); if(d)ev.push(evidenceItem('dead letter','“'+d.text+'”',d.forged?'prosecution':'defense',d.forged?1.8:1.1));
    return ev.slice(0,7);
  }

  function makeJury(){
    const pool=['a memory','a letter','a prophecy','the other reality','a dead letter','a revised place','an unsigned sentence','a vacated ruling'];
    return Array.from({length:5},(_,i)=>({id:'j'+i,name:pool[(i+Math.floor(Math.random()*pool.length))%pool.length],bias:(Math.random()-.5)*1.5,vote:null}));
  }

  function startTrial(w,requested=false){
    if(!w||w.status!=='active')return null;
    const existing=trialForWarrant(w); if(existing)return existing;
    w.trials=(w.trials||0)+1;
    if(w.trials>2&&!requested){baseServeWarrant(w);return null}
    const now=Date.now(),t={
      id:'T'+(++S.trialSerial),warrantId:w.id,target:w.target,lawId:w.lawId,reason:w.reason,
      status:'hearing',started:now,deliberatingAt:now+8000+Math.random()*4000,
      verdictAt:now+17000+Math.random()*6000,evidence:assembleEvidence(w),jury:makeJury(),votes:[],verdict:null,
      interventions:0,x:12+Math.random()*76,y:12+Math.random()*68,notes:[requested?'hearing requested by accused':'hearing ordered before service']
    };
    w.status='trial';S.trials.push(t);S.trials=S.trials.slice(-24);S.bailiffMood='waiting outside '+t.id;
    $('#msg').textContent=w.id+' has been stayed for '+t.id+'. The room is assembling a jury.';
    renderTrialUI();save16();return t;
  }

  function evidenceScore(t){
    let s=0;
    for(const e of t.evidence)s+=(e.side==='prosecution'?1:-1)*(e.weight||1);
    const w=warrantFor(t); if(w)s+=(S.contempt[w.target]||0)*.35;
    const law=lawFor(t); if(law)s+=(law.entrenched||0)*.25;
    s+=S.juryContamination*.08;
    return s;
  }

  function deliberate(t){
    if(t.status!=='hearing')return;
    t.status='deliberating';t.notes.push('jury began deliberating');
    $('#msg').textContent=t.id+' is deliberating. One juror claims to remember the verdict already.';
    renderTrialUI();save16();
  }

  function resolveTrial(t,forced=false){
    if(!t||(t.status!=='hearing'&&t.status!=='deliberating'))return;
    const w=warrantFor(t),law=lawFor(t),score=evidenceScore(t);let convict=0,acquit=0;
    t.votes=[];
    for(const j of t.jury){
      const v=j.bias+score*.22+(Math.random()-.5)*1.8;
      j.vote=v>0?'convict':'acquit';t.votes.push(j.vote);j.vote==='convict'?convict++:acquit++;
    }
    let verdict;
    const nullify=law&&law.status==='active'&&acquit>=4&&Math.random()<.22;
    if(nullify)verdict='nullification';
    else if(convict===acquit||Math.abs(convict-acquit)<=1&&Math.random()<.28)verdict='mistrial';
    else verdict=convict>acquit?'convicted':'acquitted';
    t.verdict=verdict;t.status=verdict;t.notes.push((forced?'early ':'')+'verdict '+verdict+' · '+convict+'-'+acquit);S.verdicts++;

    if(verdict==='convicted'){
      S.convictions++;
      if(w){w.status='active';baseServeWarrant(w)}
      if(t.target==='archive'){
        const active=sample(AL());if(active){active.status='suspended';t.notes.push(active.title+' suspended as sanction')}
      }
      $('#msg').textContent=t.id+' returned a conviction. The bailiff is authorized to act.';
    }else if(verdict==='acquitted'){
      S.acquittals++;
      if(w){w.status='dismissed';S.contempt[w.target]=Math.max(0,(S.contempt[w.target]||0)-1)}
      if(t.target==='archive')S.precedent++;
      $('#msg').textContent=t.id+' acquitted '+t.target+'. The warrant is dismissed.';
    }else if(verdict==='nullification'){
      S.nullifications++;
      if(w)w.status='dismissed';
      if(law){law.status='suspended';law.challenges=(law.challenges||0)+1;t.notes.push('jury refused to enforce '+law.title)}
      for(const r of[S.real.A,S.real.B])r.timelineDrift++;
      $('#msg').textContent=t.id+' nullified the law instead of deciding the accused.';
    }else{
      S.mistrials++;
      if(w){w.status='active';w.reason=w.reason+' / unresolved after '+t.id}
      R().timelineDrift++;R().disputes++;
      $('#msg').textContent=t.id+' ended in mistrial. The warrant returns to the room.';
    }
    renderAll();renderTrialUI();save16();
  }

  function submitMemory(t){
    if(!t||t.status!=='hearing')return;
    const p=sample(R().places.filter(p=>!p.impounded));
    if(p)t.evidence.push(evidenceItem('testimony: place',p.name,p.type==='warm'?'defense':p.type==='cold'?'prosecution':Math.random()<.5?'defense':'prosecution',1.8));
    else{const m=sample(R().memories);if(m)t.evidence.push(evidenceItem('testimony: memory',m,'defense',1.4))}
    t.interventions++;S.testimony++;t.verdictAt+=2500;$('#msg').textContent='A memory was admitted into '+t.id+'.';openTrial(t);save16();
  }

  function submitLetter(t){
    if(!t||t.status!=='hearing')return;
    const m=sample(S.msgs.filter(m=>m.status==='kept'||m.status==='delivered'));
    if(m){t.evidence.push(evidenceItem('testimony: letter','“'+m.text+'”',m.forged?'prosecution':'defense',m.forged?2:1.5));if(m.forged)S.juryContamination++}
    else t.evidence.push(evidenceItem('testimony: absence','No admissible letter could be produced.','defense',1));
    t.interventions++;S.testimony++;$('#msg').textContent='Correspondence entered '+t.id+' as testimony.';openTrial(t);save16();
  }

  function objectEvidence(t){
    if(!t||t.status!=='hearing'||!t.evidence.length)return;
    const removable=t.evidence.filter(e=>e.type!=='warrant');
    if(!removable.length)return;
    const e=sample(removable);S.objections++;t.interventions++;
    if(Math.random()<.52){t.evidence=t.evidence.filter(x=>x.id!==e.id);t.notes.push('objection sustained: '+e.type);$('#msg').textContent='Objection sustained. '+e.type+' was removed.'}
    else{e.weight=(e.weight||1)+.35;t.notes.push('objection overruled: '+e.type);$('#msg').textContent='Objection overruled. The evidence became harder to ignore.'}
    openTrial(t);save16();
  }

  function openTrial(t){
    const tally=t.jury.reduce((a,j)=>(j.vote&&(a[j.vote]++),a),{convict:0,acquit:0});
    const ev=t.evidence.map(e=>(e.side==='prosecution'?'+':'−')+' '+e.type+': '+e.text).join('\n');
    const meta='status '+t.status+' · target '+t.target+' · evidence '+t.evidence.length+' · interventions '+t.interventions+(t.verdict?' · verdict '+t.verdict+' · votes '+tally.convict+'/'+tally.acquit:'');
    const buttons=[];
    if(t.status==='hearing'){
      buttons.push(['submit memory',()=>submitMemory(t)],['submit letter',()=>submitLetter(t)],['object',()=>objectEvidence(t)],['request verdict',()=>{deliberate(t);resolveTrial(t,true);closePanel()}]);
    }else if(t.status==='deliberating')buttons.push(['request verdict',()=>{resolveTrial(t,true);closePanel()}]);
    buttons.push(['close',closePanel]);
    panel(t.id+' · trial of '+t.target,(ev||'No evidence survived.'),meta,buttons);
  }

  function renderTrialUI(){
    let layer=$('#trialLayer');
    if(!layer){
      layer=document.createElement('div');layer.id='trialLayer';document.body.appendChild(layer);
      const stats=document.querySelector('.stats');if(stats&&!$('#trs')){const span=document.createElement('span');span.innerHTML='trials <b id="trs">0</b>';stats.insertBefore(span,stats.lastElementChild)}
      const enforcement=$('#enforcement');if(enforcement&&!$('#courtline')){const line=document.createElement('div');line.id='courtline';line.className='line';enforcement.after(line)}
      const controls=document.querySelector('#app .controls');if(controls&&!$('#docket')){const b=document.createElement('button');b.id='docket';b.textContent='open docket';b.onclick=()=>{const t=[...S.trials].reverse().find(x=>x.status==='hearing'||x.status==='deliberating')||S.trials.at(-1);t?openTrial(t):($('#msg').textContent='The docket is blank for the moment.')};controls.prepend(b)}
    }
    layer.innerHTML='';
    for(const t of S.trials.slice(-12)){
      const n=document.createElement('i');n.className='trial '+t.status;n.dataset.label=t.id+' '+t.target;n.style.left=t.x+'%';n.style.top=t.y+'%';n.onclick=()=>openTrial(t);layer.appendChild(n)
    }
    const open=openTrials();if($('#trs'))$('#trs').textContent=open.length;
    if($('#courtline'))$('#courtline').textContent='court: '+open.length+' open hearings · '+S.convictions+' convictions · '+S.acquittals+' acquittals · '+S.mistrials+' mistrials · '+S.nullifications+' nullifications';
  }

  serveWarrant=function(w){
    if(!w||w.status!=='active')return;
    if(!trialForWarrant(w)&&(w.trials||0)<2&&Math.random()<.68)return startTrial(w,false);
    return baseServeWarrant(w);
  };

  contestWarrant=function(w){
    if(!w||w.status!=='active')return;
    w.contests=(w.contests||0)+1;
    if(Math.random()<.78){startTrial(w,true);closePanel();renderAll();return}
    baseContestWarrant(w);
  };

  renderAll=function(){baseRenderAll();renderTrialUI()};

  const forget=$('#forget');
  if(forget)forget.onclick=()=>{for(let i=2;i<=16;i++)localStorage.removeItem('nothing-state-v'+i);location.reload()};

  setInterval(()=>{
    const now=Date.now();
    for(const t of openTrials()){
      if(t.status==='hearing'&&now>=t.deliberatingAt)deliberate(t);
      if((t.status==='hearing'||t.status==='deliberating')&&now>=t.verdictAt)resolveTrial(t,false);
    }
    if(S.dead.filter(d=>d.forged).length>3&&Math.random()<.04){S.juryContamination++;const t=sample(openTrials());if(t)t.notes.push('an unsigned sentence reached the jury room')}
    renderTrialUI();save16();
  },1300);

  renderTrialUI();save16();
})();
