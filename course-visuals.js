import {JA_UI} from './course-ja.js?v=9';
const choose=(mode,zh,en,ja)=>mode==='ja'?(ja??JA_UI[zh]??en):mode==='en'?en:mode==='both'?`${zh} / ${en}`:zh;
export const VISUALS=[
 {id:'lifecycle',chapter:1,zh:'資料科學是一個循環',en:'Data science is a cycle'},
 {id:'loss',chapter:4,zh:'一個離群值，兩種摘要',en:'One outlier, two summaries'},
 {id:'wait',chapter:5,zh:'不規則班距與等待時間',en:'Irregular gaps and waiting time'},
 {id:'table',chapter:6,zh:'從每筆旅行到城市摘要',en:'From trips to city summaries'},
 {id:'regression',chapter:15,zh:'直線與殘差',en:'A line and its residuals'},
 {id:'threshold',chapter:19,zh:'移動門檻，改變分類',en:'Move the threshold, change the decisions'},
 {id:'optimization',chapter:20,zh:'沿著梯度走向最低點',en:'Follow the gradient toward a minimum'}
];
export const visualForLesson=id=>VISUALS.find(v=>`LDS1-CH${String(v.chapter).padStart(2,'0')}`===id);
const svg=(label,body)=>`<svg viewBox="0 0 600 280" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="280" fill="white"/>${body}</svg>`;
const line=(x1,y1,x2,y2,color='#dcdde0',extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" ${extra}/>`;
const label=(x,y,s,extra='')=>`<text x="${x}" y="${y}" fill="#202124" font-size="16" font-family="system-ui,Microsoft JhengHei,sans-serif" ${extra}>${s}</text>`;
const dot=(x,y,color='#ae252a',radius=6)=>`<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}"/>`;
export function lossStats(outlier){const x=[2,3,4,5,Number(outlier)];return {mean:x.reduce((a,b)=>a+b)/5,median:[...x].sort((a,b)=>a-b)[2]};}
export function waitingStats(delta){const h=[10-Number(delta),10+Number(delta)];return {headways:h,wait:(h[0]**2+h[1]**2)/40};}
export function classificationStats(threshold){const actual=[1,1,0,0],scores=[.9,.4,.6,.1],pred=scores.map(p=>p>=threshold),tp=pred.filter((v,i)=>v&&actual[i]===1).length,fp=pred.filter((v,i)=>v&&actual[i]===0).length,fn=2-tp;return {actual,scores,pred,tp,fp,fn,precision:tp+fp?tp/(tp+fp):null,recall:tp/2};}
function draw(id,mode,value){
 const t=(z,e)=>choose(mode==='both'?'zh':mode,z,e);
 if(id==='lifecycle'){
  const nodes=[[105,70,t('提問','Question')],[300,70,t('收集','Collect')],[495,70,t('整理','Wrangle')],[495,190,t('探索','Explore')],[300,190,t('建模','Model')],[105,190,t('解讀','Interpret')]];
  return svg(t('資料科學循環','Data science cycle'),`<path d="M105 70H495V190H105Z" fill="none" stroke="#dcdde0" stroke-width="3"/>${nodes.map(([x,y,s],i)=>`<rect x="${x-70}" y="${y-26}" width="140" height="52" rx="3" fill="${i===0?'#ae252a':'#f5f5f6'}" stroke="#dcdde0"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="16" font-family="system-ui,Microsoft JhengHei" fill="${i===0?'white':'#202124'}">${s}</text>`).join('')}${label(300,263,t('依證據回到前一步，修正問題與方法','Return to earlier stages as evidence changes'),'text-anchor="middle"')}`);
 }
 if(id==='loss'){
  const v=Number(value??36),s=lossStats(v),scale=x=>50+x*12;
  return svg(t('平均數與中位數','Mean and median'),`${line(50,165,550,165,'#64676d')}${[0,10,20,30,40].map(x=>label(scale(x),195,x,'text-anchor="middle"')).join('')}${[2,3,4,5,v].map((x,i)=>dot(scale(x),140-(i%2)*20)).join('')}${line(scale(s.mean),75,scale(s.mean),165,'#ae252a','stroke-width="2"')}${line(scale(s.median),85,scale(s.median),165,'#245da8','stroke-width="2" stroke-dasharray="5 4"')}${label(45,40,t('紅線：平均數；藍虛線：中位數','Red: mean; blue dashed: median'))}${label(300,245,t('教學等待時間（分鐘），n = 5','Toy waits in minutes, n = 5'),'text-anchor="middle"')}`);
 }
 if(id==='wait'){
  const s=waitingStats(value??5),w1=s.headways[0]*23,w2=s.headways[1]*23;
  return svg(t('班距與等待','Headways and waits'),`<rect x="60" y="90" width="${w1}" height="70" fill="#dce8f6"/><rect x="${60+w1}" y="90" width="${w2}" height="70" fill="#f4d9d9"/>${line(60,165,520,165,'#64676d')}${[60,60+w1,520].map(x=>line(x,80,x,175,'#202124','stroke-width="2"')).join('')}${label(60+w1/2,130,s.headways[0]+' min','text-anchor="middle"')}${label(60+w1+w2/2,130,s.headways[1]+' min','text-anchor="middle"')}${label(300,40,t('平均班距固定為 10 分鐘','Mean headway held at 10 minutes'),'text-anchor="middle"')}${label(300,220,t('隨機到站較容易落在較長的區間','Random arrivals land more often in longer gaps'),'text-anchor="middle"')}`);
 }
 if(id==='table')return svg(t('群組彙總','Grouped aggregation'),`<rect x="30" y="40" width="230" height="190" fill="#f5f5f6" stroke="#dcdde0"/>${label(45,70,'city          minutes')}${['Taipei         20','Taipei         30','Tainan        15'].map((s,i)=>label(45,110+i*40,s)).join('')}${line(280,135,320,135,'#ae252a','stroke-width="3"')}<rect x="340" y="60" width="230" height="140" fill="#f5f5f6" stroke="#dcdde0"/>${label(355,90,'city           mean')}${label(355,130,'Taipei          25')}${label(355,170,'Tainan         15')}${label(300,265,t('groupby：每列的觀測單位改變了','groupby changes the observational unit'),'text-anchor="middle"')}`);
 if(id==='regression'){
  const pts=[[1,3],[2,4],[3,7],[4,8],[5,11]],sx=x=>65+x*83,sy=y=>240-y*17;
  return svg(t('線性關係與殘差','Linear relationship and residuals'),`${line(65,240,555,240,'#64676d')}${line(65,240,65,30,'#64676d')}${line(sx(0),sy(0),sx(5.5),sy(11),'#ae252a','stroke-width="2"')}${pts.map(([x,y])=>line(sx(x),sy(y),sx(x),sy(2*x),'#245da8','stroke-width="2" stroke-dasharray="4 3"')+dot(sx(x),sy(y),'#202124')).join('')}${label(90,35,t('藍虛線：觀測值 − 預測值','Blue dashed: observed minus predicted'))}${label(300,272,'x','text-anchor="middle"')}${label(34,45,'y')}`);
 }
 if(id==='threshold'){
  const s=classificationStats(Number(value??.5)),sx=p=>65+p*470;
  return svg(t('分類門檻','Classification threshold'),`${line(65,190,535,190,'#64676d')}${[0,.25,.5,.75,1].map(p=>label(sx(p),220,p,'text-anchor="middle"')).join('')}${s.scores.map((p,i)=>`<circle cx="${sx(p)}" cy="${95+i%2*40}" r="12" fill="${s.actual[i]?'#ae252a':'white'}" stroke="${s.actual[i]?'#ae252a':'#202124'}" stroke-width="2"/>${label(sx(p),75+i%2*40,s.pred[i]?'+':'−','text-anchor="middle"')}`).join('')}${line(sx(Number(value??.5)),45,sx(Number(value??.5)),190,'#245da8','stroke-width="2" stroke-dasharray="5 4"')}${label(300,260,t('實心＝真實正類；空心＝真實負類；符號＝預測','Filled: positive; open: negative; sign: prediction'),'text-anchor="middle"')}`);
 }
 const sx=x=>65+x*75,sy=y=>235-y*18;let w=0,points=[0];for(let i=0;i<7;i++){w-=.1*2*(w-3);points.push(w);}let d='';for(let i=0;i<=60;i++){const x=i/10;d+=`${i?'L':'M'}${sx(x)},${sy((x-3)**2)} `;}
 return svg(t('梯度下降','Gradient descent'),`${line(65,235,535,235,'#64676d')}<path d="${d}" fill="none" stroke="#64676d" stroke-width="2"/>${points.map((x,i)=>dot(sx(x),sy((x-3)**2),'#ae252a',i?4:7)).join('')}${label(300,35,'f(w) = (w − 3)², learning rate = 0.1','text-anchor="middle"')}${label(300,270,t('紅點：從 w = 0 開始的前 7 次更新','Red dots: the first 7 updates from w = 0'),'text-anchor="middle"')}`);
}
export function labReadout(id,mode,value){
 const t=(z,e,j)=>choose(mode,z,e,j);
 if(id==='loss'){const s=lossStats(value);return t(`平均數 ${s.mean.toFixed(2)} 分鐘 · 中位數 ${s.median.toFixed(2)} 分鐘`,`Mean ${s.mean.toFixed(2)} min · Median ${s.median.toFixed(2)} min`,`平均値 ${s.mean.toFixed(2)} 分・中央値 ${s.median.toFixed(2)} 分`);}
 if(id==='wait'){const s=waitingStats(value);return t(`班距 ${s.headways.join(' / ')} 分鐘 · 理想平均等待 ${s.wait.toFixed(2)} 分鐘`,`Gaps ${s.headways.join(' / ')} min · Modeled mean wait ${s.wait.toFixed(2)} min`,`運行間隔 ${s.headways.join(' / ')} 分・モデル上の平均待ち時間 ${s.wait.toFixed(2)} 分`);}
 const s=classificationStats(value);return `TP ${s.tp} · FP ${s.fp} · FN ${s.fn} · ${mode==='ja'?'適合率':'Precision'} ${s.precision===null?t('未定義','undefined'):s.precision.toFixed(2)} · ${mode==='ja'?'再現率':'Recall'} ${s.recall.toFixed(2)}`;
}
export function renderVisual(id,mode='zh',options={}){
 const v=VISUALS.find(v=>v.id===id);if(!v)return '';
 if(options.compact)return `<div class="science-diagram compact-diagram">${draw(id,mode)}</div>`;
 const t=(z,e)=>choose(mode,z,e),lab=['loss','wait','threshold'].includes(id),value=id==='loss'?36:id==='wait'?5:.5;
 return `<figure class="visual-guide" id="visual-${id}" data-block-id="visual-${id}"><div class="visual-guide-top"><div><span class="eyebrow">${t('INDEPENDENT TEACHING DIAGRAM','INDEPENDENT TEACHING DIAGRAM')}</span><h2>${t(v.zh,v.en)}</h2></div>${options.enlarge===false?'':`<button class="secondary-button" data-enlarge-visual="${id}">${t('放大圖解','Enlarge diagram')}</button>`}</div><div class="science-diagram" data-lab-drawing="${id}">${draw(id,mode,value)}</div>${lab?`<div class="lab-controls"><label>${id==='loss'?t('第五筆等待時間','Fifth wait'):id==='wait'?t('班距偏離 10 分鐘','Deviation from a 10-minute gap'):t('分類門檻','Decision threshold')}<input type="range" data-lab="${id}" aria-label="${t(v.zh,v.en)}" min="${id==='loss'?5:0}" max="${id==='loss'?40:id==='wait'?9:1}" step="${id==='threshold'?.05:1}" value="${value}"></label><output data-lab-output="${id}">${labReadout(id,mode,value)}</output></div>`:''}<figcaption>${t('本站自編圖解與教學數值，非原書圖表。','Original site diagram with teaching values, not a source-book figure.')}${id==='wait'?t('假設乘客獨立均勻到站、班距過程穩定；E[W] = E[H²] / (2E[H])。','Assumes independent uniform passenger arrivals and stationary headways; E[W] = E[H²]/(2E[H]).'):id==='regression'?t('固定示例直線 y = 2x；虛線示範垂直殘差。','Fixed example line y = 2x; dashed lines show vertical residuals.'):''}</figcaption></figure>`;
}
export function bindLabs(container,mode){container.querySelectorAll('[data-lab]').forEach(input=>input.addEventListener('input',()=>{const id=input.dataset.lab,figure=input.closest('figure');figure.querySelector('[data-lab-drawing]').innerHTML=draw(id,mode,input.value);figure.querySelector('output').textContent=labReadout(id,mode,input.value);}));}
export function visualGallery(mode){const t=(z,e,j)=>choose(mode,z,e,j);return `<div class="page"><div class="page-heading"><p class="eyebrow">SEE THE IDEA · TEST THE ASSUMPTION</p><h1>${t('把概念變成看得見的實驗。','Turn concepts into visible experiments.')}</h1><p>${t('調整參數，看摘要、等待與分類如何改變。每張圖連回對應章節。','Adjust parameters to see summaries, waiting times, and classifications change. Each diagram links back to its chapter.')}</p></div>${VISUALS.map(v=>`<section>${renderVisual(v.id,mode)}<p><a class="text-button" href="#/lesson/LDS1-CH${String(v.chapter).padStart(2,'0')}">${t('回到第 '+v.chapter+' 章','Read chapter '+v.chapter,'第'+v.chapter+'章を読む')}</a></p></section>`).join('')}</div>`;}
