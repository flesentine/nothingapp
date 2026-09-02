(()=>{
const BR46F=renderAll;
function reconcileGovernance46(){
  for(const n of (S.namespaces46||[])){
    const open=(S.namespaceDisputes46||[]).some(d=>d.namespaceId===n.id&&d.status==='open'&&d.reason==='maintainer-abandoned');
    if(n.owner==='nobody'&&open&&n.status==='disputed')n.status='abandoned';
  }
  for(const s of (S.sboms45||[]).filter(s=>s.status==='current')){
    const hits=(S.advisories45||[]).filter(a=>a.status!=='withdrawn'&&s.components?.includes(a.packageId)).map(a=>a.id);
    s.vulnerable=hits;
    const a=(S.buildArtifacts44||[]).find(a=>a.id===s.artifactId);
    if(a&&hits.length&&a.status==='built')a.status='known-vulnerable';
    if(a&&!hits.length&&a.status==='known-vulnerable')a.status='built';
  }
}
renderAll=function(){reconcileGovernance46();BR46F()};
setInterval(reconcileGovernance46,800);
reconcileGovernance46();renderAll();
})();
