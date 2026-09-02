(()=>{
const BR44F=renderAll;
function prioritizeActiveBuilders(){
  if(!Array.isArray(S.builders44))return;
  S.builders44.sort((a,b)=>{
    if(a.reality!==b.reality)return a.reality.localeCompare(b.reality);
    if(a.role!==b.role)return a.role.localeCompare(b.role);
    const pa=a.status==='active'?0:a.status==='compromised'?1:2;
    const pb=b.status==='active'?0:b.status==='compromised'?1:2;
    return pa-pb;
  });
}
renderAll=function(){prioritizeActiveBuilders();BR44F()};
setInterval(prioritizeActiveBuilders,700);
prioritizeActiveBuilders();renderAll();
})();
