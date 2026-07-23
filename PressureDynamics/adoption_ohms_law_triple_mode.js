(function(){
  var cfg = ADOPTION_CONFIG;
  var titles = cfg.titles, L = cfg.labels, fills = cfg.fills, cells = cfg.cells;

  var svg=document.getElementById('plane');
  var probe=document.getElementById('probe'), ray=document.getElementById('ray');
  var bulb=document.getElementById('bulb'), halo=document.getElementById('halo'), fil=document.getElementById('filament');
  var watercol=document.getElementById('watercol'), pipe=document.getElementById('pipe');
  var s1=document.getElementById('stream1'), s2=document.getElementById('stream2'), outpool=document.getElementById('outpool'), headtick=document.getElementById('headtick');
  var wall=document.getElementById('wall'), push=document.getElementById('push');
  var X0=50,X1=350,Y0=20,Y1=320;
  var mode='biz';
  function lerp(a,b,t){return a+(b-a)*t;}
  function qual(x,lo,hi){return x<lo?'Low':(x<hi?'Med':'High');}

  var N=8, ballState=[];
  (function initBalls(){
    var g=document.getElementById('balls');
    for(var i=0;i<N;i++){
      var c=document.createElementNS('http://www.w3.org/2000/svg','circle');
      c.setAttribute('r','6'); c.setAttribute('cy', 56 + i*12 + 4);
      c.setAttribute('cx','40'); c.setAttribute('fill','#888780');
      c.style.transition='cx .25s ease, fill .25s ease';
      g.appendChild(c); ballState.push(c);
    }
  })();
  function curKey(px,py){var right=px>200, top=py<170; return top?(right?'tr':'tl'):(right?'br':'bl');}
  function draw(px,py){
    px=Math.max(X0,Math.min(X1,px)); py=Math.max(Y0,Math.min(Y1,py));
    probe.setAttribute('cx',px); probe.setAttribute('cy',py);
    ray.setAttribute('x2',px); ray.setAttribute('y2',py);
    var R=(px-X0)/(X1-X0)*0.9+0.1;
    var V=(Y1-py)/(Y1-Y0)*1.0; V=Math.max(0.001,V);
    var I=V/R, P=V*I;
    if(mode==='biz'){
      document.getElementById('vval').textContent=qual(V,0.33,0.66);
      document.getElementById('rval').textContent=qual(R,0.4,0.7);
      document.getElementById('ival').textContent=qual(I,0.7,1.4);
      document.getElementById('pval').textContent=qual(P,0.5,1.3);
    } else {
      document.getElementById('vval').textContent=V.toFixed(2);
      document.getElementById('rval').textContent=R.toFixed(2);
      document.getElementById('ival').textContent=I.toFixed(2);
      document.getElementById('pval').textContent=P.toFixed(2);
    }
    var b=Math.max(0,Math.min(1,P/2.5));
    var rr=Math.round(lerp(241,250,b)), gg=Math.round(lerp(239,199,b)), bb2=Math.round(lerp(232,39,b));
    bulb.setAttribute('fill','rgb('+rr+','+gg+','+bb2+')');
    fil.setAttribute('stroke', b>0.15?'#854F0B':'#B4B2A9');
    halo.setAttribute('opacity',(b*0.55).toFixed(2)); halo.setAttribute('r',(18+b*16).toFixed(1));
    var colH=20+V*116; watercol.setAttribute('height',colH.toFixed(1)); watercol.setAttribute('y',(138-colH).toFixed(1));
    headtick.setAttribute('y1',(138-colH).toFixed(1)); headtick.setAttribute('y2',(138-colH).toFixed(1));
    var ph=10-R*8; pipe.setAttribute('height',ph.toFixed(1)); pipe.setAttribute('y',(131-ph/2).toFixed(1));
    var fl=Math.max(0,Math.min(1,I/2.5));
    s1.setAttribute('opacity',fl); s2.setAttribute('opacity',fl);
    s1.setAttribute('stroke-width',(1+fl*3).toFixed(1)); s2.setAttribute('stroke-width',(1+fl*3).toFixed(1));
    var oh=Math.max(2,Math.min(46,b*46)); outpool.setAttribute('height',oh.toFixed(1)); outpool.setAttribute('y',(168-oh).toFixed(1));
    var wh=20+R*116; wall.setAttribute('height',wh.toFixed(1)); wall.setAttribute('y',(152-wh).toFixed(1));
    var pw=8+V*40; push.setAttribute('x2',(116+pw).toFixed(1));
    var ck=curKey(px,py);
    var frac=Math.max(0,Math.min(1,I/2.0));
    var crossed=Math.round(frac*N); var col=fills[ck];
    for(var i=0;i<N;i++){
      ballState[i].setAttribute('cx', i<crossed?(180+(i%4)*18+8).toFixed(0):(28+(i%3)*16).toFixed(0));
      ballState[i].setAttribute('fill', i<crossed?col:'#B4B2A9');
    }
    var c=cells[ck], v=document.getElementById('verdict');
    v.style.background=c.bg; v.style.color=c.fg;
    var tt=titles[mode];
    var title=tt[ck];
    var signs = mode==='phys'?c.signsP:(mode==='water'?c.signsW:c.signsB);
    var act = mode==='phys'?c.actP:(mode==='water'?c.actW:c.actB);
    v.innerHTML='<div class="story-head"><span class="story-dot" style="background:'+fills[ck]+'"></span><span class="story-title">'+title+'</span></div>'+
      '<div class="story-line"><span class="label">Signs </span>'+signs+'</div>'+
      '<div class="story-line"><span class="label">Action </span>'+act+'</div>';
  }
  function relabel(){
    var s=L[mode], tt=titles[mode];
    document.getElementById('xaxis').textContent=s.x;
    document.getElementById('yaxis').textContent=s.y;
    document.getElementById('xlo').textContent=s.xlo;
    document.getElementById('xhi').textContent=s.xhi;
    document.getElementById('ylo').textContent=s.ylo;
    document.getElementById('yhi').textContent=s.yhi;
    document.getElementById('t-v').textContent=s.v;
    document.getElementById('t-r').textContent=s.r;
    document.getElementById('t-i').textContent=s.i;
    document.getElementById('t-p').textContent=s.p;
    document.getElementById('c-tl').textContent=tt.tl;
    document.getElementById('c-tr').textContent=tt.tr;
    document.getElementById('c-bl').textContent=tt.bl;
    document.getElementById('c-br').textContent=tt.br;
    document.getElementById('circuit').style.display=mode==='phys'?'block':'none';
    document.getElementById('water').style.display=mode==='water'?'block':'none';
    document.getElementById('barrier').style.display=mode==='biz'?'block':'none';
    function setbtn(id,on){var b=document.getElementById(id); b.style.background=on?'var(--text-accent)':'transparent'; b.style.color=on?'#fff':'var(--text-secondary)';}
    setbtn('m-phys',mode==='phys'); setbtn('m-water',mode==='water'); setbtn('m-biz',mode==='biz');
  }
  function setMode(m){mode=m; relabel(); draw(parseFloat(probe.getAttribute('cx')),parseFloat(probe.getAttribute('cy')));}
  document.getElementById('m-phys').addEventListener('click',function(){setMode('phys');});
  document.getElementById('m-water').addEventListener('click',function(){setMode('water');});
  document.getElementById('m-biz').addEventListener('click',function(){setMode('biz');});
  function toSvg(e){var pt=svg.createSVGPoint(); var t=e.touches?e.touches[0]:e; pt.x=t.clientX; pt.y=t.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse());}
  var dragging=false;
  function start(e){dragging=true; var p=toSvg(e); draw(p.x,p.y); e.preventDefault();}
  function move(e){if(!dragging)return; var p=toSvg(e); draw(p.x,p.y); e.preventDefault();}
  svg.addEventListener('mousedown',start); window.addEventListener('mousemove',move); window.addEventListener('mouseup',function(){dragging=false;});
  svg.addEventListener('touchstart',start); svg.addEventListener('touchmove',move); window.addEventListener('touchend',function(){dragging=false;});
  relabel(); draw(125,95);
})();
