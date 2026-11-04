// Backoffice betizzi (/admin). Μόνο για τον Owner· ελληνικά (εσωτερική σελίδα, δεν μεταφράζεται, noindex).
// Τα δεδομένα έρχονται από το engine (/admin/api/* → betizzi-engine /admin/*), μόνο με δικαίωμα admin.
export const ADMIN_HTML = `<!doctype html>
<html lang="el"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>betizzi · Backoffice</title>
<style>
:root{--bg:#0c0f0d;--p:#141a16;--p2:#1b231e;--ln:#2a352e;--fg:#eef3ee;--mu:#9aa89f;--lime:#b6f23a;--win:#3ccf6e;--bad:#ff6b6b;--gold:#e8b931}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--fg);font:14px/1.45 Manrope,system-ui,sans-serif}
header{position:sticky;top:0;z-index:5;background:var(--bg);border-bottom:1px solid var(--ln);padding:10px 16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap}
.logo{font:800 22px system-ui}.logo i{color:var(--lime)}nav{display:flex;gap:6px;flex-wrap:wrap}
nav button,.btn{appearance:none;border:1px solid var(--ln);background:var(--p2);color:var(--fg);border-radius:10px;padding:8px 12px;font:700 13px inherit;cursor:pointer}
nav button.on{background:var(--lime);color:#14200a;border-color:var(--lime)}.btn.main{background:var(--lime);color:#14200a;border-color:var(--lime)}
.btn.bad{border-color:rgba(255,107,107,.5);color:var(--bad)}.who{margin-left:auto;color:var(--mu);font-size:12px}
main{max-width:1180px;margin:0 auto;padding:16px}h2{margin:18px 0 8px;font-size:18px}h3{margin:0 0 8px;font-size:14px;color:var(--mu);font-weight:700}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px}
.card{background:var(--p);border:1px solid var(--ln);border-radius:14px;padding:12px}
.kpi b{display:block;font:800 26px 'JetBrains Mono',monospace}.kpi small{color:var(--mu)}
.two{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:10px}
table{width:100%;border-collapse:collapse;font-size:13px}th,td{text-align:left;padding:7px 8px;border-bottom:1px solid var(--ln);vertical-align:top}th{color:var(--mu);font-weight:700}
td.n{font-family:'JetBrains Mono',monospace;text-align:right}.pos{color:var(--win)}.neg{color:var(--bad)}.mu{color:var(--mu)}
input,select,textarea{background:var(--bg);border:1px solid var(--ln);color:var(--fg);border-radius:8px;padding:7px 9px;font:inherit}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:8px 0}
.st{font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;border:1px solid var(--ln)}
.st.live{background:rgba(60,207,110,.15);color:var(--win)}.st.signed{color:var(--lime)}.st.talks,.st.replied{color:var(--gold)}.st.no{color:var(--bad)}
.err{color:var(--bad)}.ok{color:var(--win)}dialog{background:var(--p);color:var(--fg);border:1px solid var(--ln);border-radius:14px;max-width:560px;width:calc(100% - 24px)}
dialog label{display:block;margin:8px 0 2px;color:var(--mu);font-size:12px}dialog input,dialog textarea,dialog select{width:100%}
.tg{font-size:9px;font-weight:800;letter-spacing:.06em;padding:1px 6px;border-radius:999px;border:1px solid}.tg.r{color:var(--win);border-color:rgba(60,207,110,.5)}.tg.u{color:var(--gold);border-color:rgba(232,185,49,.5)}.tg.n{color:var(--mu);border-color:var(--ln)}
.spk{display:flex;align-items:flex-end;gap:2px;height:64px}.spk i{flex:1;border-radius:2px 2px 0 0;min-width:2px}
.bar{height:6px;border-radius:99px;background:var(--ln);overflow:hidden}.bar i{display:block;height:6px;background:var(--lime)}
</style></head><body>
<header><span class="logo">bet<i>izzi</i> · admin</span><nav id="nav"></nav><span class="who" id="who"></span></header>
<main id="main"><p class="mu">Φόρτωση…</p></main>
<dialog id="dlg"></dialog>
<script>
var T=[["today","Σήμερα"],["users","Πελάτες"],["mkt","Marketing"],["partners","Συνεργάτες"],["leagues","Λίγκες"],["health","Υγεία"],["audit","Ιστορικό"]],cur=location.hash.slice(1)||"today";
var ST={todo:"να σταλεί",sent:"στάλθηκε",replied:"απάντησε",talks:"συζήτηση",signed:"υπογραφή",live:"live",no:"όχι"};
function $(i){return document.getElementById(i);}
function e(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
function api(p,o){return fetch("/admin/api/"+p,o?{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(o)}:{}).then(function(r){if(r.status===403)throw new Error("Δεν έχεις πρόσβαση. Μπες με τον λογαριασμό σου ή με το μυστικό link.");return r.json();});}
function dt(t){if(!t)return"—";var d=new Date(t*1000);return d.toLocaleDateString("el-GR",{day:"2-digit",month:"2-digit"})+" "+d.toLocaleTimeString("el-GR",{hour:"2-digit",minute:"2-digit"});}
function nav(){$("nav").innerHTML=T.map(function(x){return '<button data-t="'+x[0]+'" class="'+(x[0]===cur?"on":"")+'">'+x[1]+'</button>';}).join("");
  Array.prototype.forEach.call(document.querySelectorAll("[data-t]"),function(b){b.onclick=function(){cur=b.dataset.t;location.hash=cur;go();};});}
function list(a){return a&&a.length?'<table>'+a.map(function(x){return '<tr><td>'+e(x[0])+'</td><td class="n">'+x[1]+'</td></tr>';}).join("")+'</table>':'<p class="mu">Τίποτα ακόμα.</p>';}
function go(){nav();var m=$("main");m.innerHTML='<p class="mu">Φόρτωση…</p>';
  ({today:today,users:users,mkt:mkt,partners:partners,leagues:leagues,health:health,audit:audit}[cur]||today)(m).catch(function(x){m.innerHTML='<p class="err">'+e(x.message)+'</p>';});}
function today(m){return api("today").then(function(d){
  var k=function(v,l,s){return '<div class="card kpi"><small>'+l+'</small><b>'+v+'</b>'+(s?'<small>'+s+'</small>':'')+'</div>';};
  m.innerHTML='<h2>Σήμερα · '+e(d.day)+' (UTC)</h2><div class="grid">'+k(d.pv,"Επισκέψεις σελίδας","χθες "+d.pvY)+k(d.signups,"Νέες εγγραφές",d.users+" σύνολο")+k(d.logins,"Συνδέσεις")+k(d.bk,"Clicks σε bookmaker")
   +k(d.suOpen,"Άνοιξαν την εγγραφή")+k((d.tips.free||0)+" + "+(d.tips.vip||0),"Tips Free + VIP")+k(d.coupons,"Παρολί")+k('<span class="pos">'+d.yesterday.w+'</span>/'+(d.yesterday.w+d.yesterday.l),"Χθες κέρδισαν",d.yesterday.w+d.yesterday.l?Math.round(d.yesterday.w*100/(d.yesterday.w+d.yesterday.l))+"%":"")+k(d.newsYes,"Ναι στο newsletter")+'</div>'
   +'<div class="two" style="margin-top:10px"><div class="card"><h3>Ανά γλώσσα</h3>'+list(d.byLang)+'</div><div class="card"><h3>Ανά χώρα</h3>'+list(d.byCountry)+'</div><div class="card"><h3>Από πού ήρθαν (καμπάνια)</h3>'+list(d.bySrc)+'</div><div class="card"><h3>Clicks σε bookmaker</h3>'+list((d.bkBySrc||[]).map(function(x){return[x.src||"—",x.n];}))+'</div></div>'
   +'<p class="mu">Link καμπάνιας: πρόσθεσε <b>?src=telegram</b> (ή facebook, tiktok…) στο τέλος της διεύθυνσης, π.χ. betizzi.com/el/?src=telegram. Μετριούνται σελίδες, όχι άνθρωποι· χωρίς cookies.</p>';});}
var uq="",up=1;
function users(m){return api("users?q="+encodeURIComponent(uq)+"&page="+up).then(function(d){
  m.innerHTML='<h2>Πελάτες ('+d.total+')</h2><div class="row"><input id="uq" placeholder="Email ή χώρα" value="'+e(uq)+'"><button class="btn" id="us">Αναζήτηση</button><a class="btn main" href="/admin/api/export">⬇ Εξαγωγή newsletter (μόνο «ναι»)</a></div>'
   +'<div class="card" style="overflow:auto"><table><tr><th>#</th><th>Email</th><th>Χώρα</th><th>Γλώσσα</th><th>Credits</th><th>News</th><th>Εγγραφή</th><th>Τελευταία</th><th>Κατάσταση</th><th>Σημείωση</th><th></th></tr>'
   +d.rows.map(function(u){return '<tr><td class="mu">'+u.id+'</td><td>'+e(u.email)+(u.role==="admin"?' <span class="st signed">admin</span>':'')+'</td><td>'+e(u.country)+'</td><td>'+e(u.lang)+'</td><td class="n">'+u.credits+'</td><td>'+(u.news?'<span class="ok">ναι</span>':'<span class="mu">όχι</span>')+'</td><td>'+dt(u.created_at)+'</td><td>'+dt(u.last_seen)+'</td><td>'+(u.status==="active"?'<span class="ok">ενεργός</span>':'<span class="err">μπλοκ</span>')+'</td><td>'+e(u.note||"")+'</td>'
     +'<td style="white-space:nowrap"><button class="btn" data-cr="'+u.id+'">+credits</button> <button class="btn" data-nt="'+u.id+'">σημείωση</button> <button class="btn bad" data-bl="'+u.id+'" data-s="'+u.status+'">'+(u.status==="active"?"μπλοκ":"ξεμπλοκ")+'</button></td></tr>';}).join("")+'</table></div>'
   +'<div class="row">'+(up>1?'<button class="btn" id="pp">←</button>':'')+'<span class="mu">σελίδα '+up+' / '+Math.max(1,Math.ceil(d.total/d.per))+'</span>'+(up*d.per<d.total?'<button class="btn" id="np">→</button>':'')+'</div>';
  $("us").onclick=function(){uq=$("uq").value.trim();up=1;go();};$("uq").onkeydown=function(x){if(x.key==="Enter")$("us").click();};
  if($("pp"))$("pp").onclick=function(){up--;go();};if($("np"))$("np").onclick=function(){up++;go();};
  var act=function(o){return api("user",o).then(function(r){if(r.error)alert("Λάθος: "+r.error);go();});};
  Array.prototype.forEach.call(m.querySelectorAll("[data-cr]"),function(b){b.onclick=function(){var a=prompt("Πόσα credits; (αρνητικό για αφαίρεση)","100");if(!a)return;var r=prompt("Λόγος (π.χ. δώρο, διόρθωση)","δώρο");act({id:+b.dataset.cr,action:"credits",amount:+a,reason:r||""});};});
  Array.prototype.forEach.call(m.querySelectorAll("[data-nt]"),function(b){b.onclick=function(){var t=prompt("Σημείωση για τον πελάτη","");if(t===null)return;act({id:+b.dataset.nt,action:"note",text:t});};});
  Array.prototype.forEach.call(m.querySelectorAll("[data-bl]"),function(b){b.onclick=function(){var bl=b.dataset.s==="active";if(!confirm(bl?"Μπλοκάρισμα; Θα αποσυνδεθεί αμέσως.":"Ξεμπλοκάρισμα;"))return;act({id:+b.dataset.bl,action:bl?"block":"unblock"});};});});}
var PD=null;
function partners(m){return api("partners").then(function(d){PD=d;var by={};d.rows.forEach(function(p){by[p.status]=(by[p.status]||0)+1;});
  m.innerHTML='<h2>Συνεργάτες (bookmakers)</h2><div class="row">'+d.statuses.map(function(s){return '<span class="st '+s+'">'+ST[s]+' · '+(by[s]||0)+'</span>';}).join(" ")+' <button class="btn main" id="pa">+ Νέος</button></div>'
   +'<div class="card" style="overflow:auto"><table><tr><th>Bookmaker</th><th>Όμιλος</th><th>Χώρες</th><th>Email</th><th>Κατάσταση</th><th>Επαφή</th><th>Συμφωνία</th><th>Clicks 30 μ.</th><th>Σημειώσεις</th><th></th></tr>'
   +d.rows.map(function(p){return '<tr><td><b>'+e(p.name)+'</b></td><td class="mu">'+e(p.grp)+'</td><td>'+e(p.countries)+'</td><td>'+(p.tier==="A"?"A":"B")+'</td><td><select data-ps="'+p.id+'">'+d.statuses.map(function(s){return '<option value="'+s+'"'+(s===p.status?" selected":"")+'>'+ST[s]+'</option>';}).join("")+'</select></td>'
     +'<td>'+e(p.contact||"")+(p.email?'<br><a href="mailto:'+e(p.email)+'" style="color:var(--lime)">'+e(p.email)+'</a>':'')+'</td><td>'+e(p.deal||"")+'</td><td class="n">'+(d.clicks30[String(p.name).toLowerCase().replace(/[^a-z0-9_-]/g,"")]||0)+'</td><td class="mu">'+e(p.notes||"")+'</td><td><button class="btn" data-pe="'+p.id+'">✎</button></td></tr>';}).join("")+'</table></div>'
   +'<p class="mu">«Email»: A = ανοιχτοί και σε αποκλειστικότητα, B = «θέλετε να συμμετάσχετε;». Τα κείμενα είναι στο project «Επαφές bookmakers».</p>';
  Array.prototype.forEach.call(m.querySelectorAll("[data-ps]"),function(s){s.onchange=function(){var p=PD.rows.filter(function(x){return x.id===+s.dataset.ps;})[0];p.status=s.value;api("partners",p).then(go);};});
  Array.prototype.forEach.call(m.querySelectorAll("[data-pe]"),function(b){b.onclick=function(){pform(PD.rows.filter(function(x){return x.id===+b.dataset.pe;})[0]);};});
  $("pa").onclick=function(){pform({status:"todo",tier:"A"});};});}
function pform(p){var d=$("dlg"),F=[["name","Bookmaker"],["grp","Όμιλος"],["countries","Χώρες (π.χ. CY,GR)"],["tier","Email (A ή B)"],["contact","Υπεύθυνος"],["email","Email επαφής"],["deal","Συμφωνία (π.χ. CPA 50€ / RevShare 30%)"],["links","Affiliate links ανά χώρα (μία ανά γραμμή: GR https://…)"],["notes","Σημειώσεις"]];
  d.innerHTML='<h3>'+(p.id?"Αλλαγή":"Νέος")+' συνεργάτης</h3>'+F.map(function(f){var big=f[0]==="links"||f[0]==="notes";return '<label>'+f[1]+'</label>'+(big?'<textarea rows="3" id="f_'+f[0]+'">'+e(p[f[0]]||"")+'</textarea>':'<input id="f_'+f[0]+'" value="'+e(p[f[0]]||"")+'">');}).join("")
   +'<label>Κατάσταση</label><select id="f_status">'+PD.statuses.map(function(s){return '<option value="'+s+'"'+(s===p.status?" selected":"")+'>'+ST[s]+'</option>';}).join("")+'</select>'
   +'<div class="row" style="margin-top:12px"><button class="btn main" id="fs">Αποθήκευση</button><button class="btn" id="fc">Κλείσιμο</button>'+(p.id?'<button class="btn bad" id="fd" style="margin-left:auto">Διαγραφή</button>':'')+'</div>';
  d.showModal();$("fc").onclick=function(){d.close();};
  $("fs").onclick=function(){var o={id:p.id};F.forEach(function(f){o[f[0]]=$("f_"+f[0]).value;});o.status=$("f_status").value;api("partners",o).then(function(r){if(r.error)return alert("Λάθος: "+r.error);d.close();go();});};
  if($("fd"))$("fd").onclick=function(){if(confirm("Διαγραφή του "+p.name+";"))api("partners",{id:p.id,del:1}).then(function(){d.close();go();});};}
var TAG={R:'<span class="tg r">ΠΡΑΓΜΑΤΙΚΟ</span>',U:'<span class="tg u">ΜΗ ΕΠΙΒΕΒΑΙΩΜΕΝΟ</span>',N:'<span class="tg n">ΔΕΝ ΥΠΑΡΧΕΙ ΑΚΟΜΑ</span>'};
function spark(rows,col){var mx=Math.max(1,Math.max.apply(null,rows.map(function(r){return r[1];})));
  return '<div class="spk">'+rows.map(function(r){return '<i title="'+e(r[0])+': '+r[1]+'" style="height:'+Math.max(2,Math.round(r[1]*60/mx))+'px;background:'+(col||"var(--lime)")+'"></i>';}).join("")+'</div><div class="row mu" style="justify-content:space-between;font-size:11px"><span>'+e(rows[0][0])+'</span><span>'+e(rows[rows.length-1][0])+'</span></div>';}
function mkt(m){return api("mkt").then(function(d){var u=d.users,tr=d.traffic,k=function(v,l,tag,s){return '<div class="card kpi"><small>'+l+'</small><b>'+v+'</b>'+(s?'<small>'+s+'</small> ':'')+tag+'</div>';};
  m.innerHTML='<h2>Marketing</h2><p class="mu">Μόνο ανάγνωση · μόνο συγκεντρωτικά νούμερα, κανένα email ή όνομα · χώρες με κάτω από 3 πάνε στο «Άλλες» · δεν μετράνε admin, «+test» και emails μιας χρήσης ('+d.excluded.disposable+').</p>'
   +'<h2>Εγγραφές</h2><div class="grid">'+k(u.total,"Σύνολο",TAG.R)+k(u.d1,"Τελευταίες 24 ώρες",TAG.R)+k(u.d7,"7 μέρες",TAG.R)+k(u.d30,"30 μέρες",TAG.R)+k(u.active7,"Ενεργοί 7 ημερών",TAG.R)+k(d.news.yes,"Ναι στο newsletter",TAG.R,d.news.pct+"%")+'</div>'
   +'<div class="card" style="margin-top:10px"><h3>Νέες εγγραφές ανά μέρα (30 μέρες)</h3>'+spark(u.perDay)+'</div>'
   +'<div class="two" style="margin-top:10px"><div class="card"><h3>Εγγραφές ανά χώρα</h3>'+list(u.byCountry)+'</div><div class="card"><h3>Εγγραφές ανά γλώσσα</h3>'+list(u.byLang)+'</div></div>'
   +'<h2>Κίνηση (δικός μας μετρητής, χωρίς cookies)</h2><div class="grid">'+k(tr.pv7,"Προβολές σελίδας 7 μ.",TAG.R)+k(tr.suOpen7,"Άνοιξαν την εγγραφή 7 μ.",TAG.R)+k(tr.signups7,"Γράφτηκαν 7 μ.",TAG.R,tr.suOpen7?Math.round(tr.signups7*100/tr.suOpen7)+"% μετατροπή":"")+k(tr.bk7,"Clicks σε bookmaker 7 μ.",TAG.R)+'</div>'
   +'<div class="card" style="margin-top:10px"><h3>Προβολές ανά μέρα</h3>'+spark(tr.perDay)+'</div>'
   +'<div class="two" style="margin-top:10px"><div class="card"><h3>Από πού ήρθαν (7 μ.) · ?src=…</h3>'+list(tr.src7)+'</div><div class="card"><h3>Χώρες (7 μ.)</h3>'+list(tr.country7)+'</div><div class="card"><h3>Γλώσσες (7 μ.)</h3>'+list(tr.lang7)+'</div><div class="card"><h3>Clicks σε bookmaker ανά μέρα</h3>'+spark(tr.bkPerDay,"var(--gold)")+'</div></div>'
   +'<h2>Έσοδα</h2><div class="grid">'+k("—","Affiliate (επιβεβαιωμένα από τον Owner)",TAG.N)+k("—","Affiliate (μη επιβεβαιωμένα)",TAG.N)+'</div><p class="mu">Δεν έχουμε ακόμα συμφωνία με bookmaker. Τα ποσά θα τα περνάει ο Owner με το χέρι, όχι αυτόματα.</p>'
   +'<p class="mu">Ενημέρωση: '+dt(d.updated)+'. Οι προβολές μετράνε σελίδες, όχι ανθρώπους.</p>';});}
var LF="on\",LQ="",LD=null;
function pc(a,b){return b?Math.round(a*100/b)+"%":"—";}
function cls(a,b){if(!b)return"mu";var v=a/b;return v>=.95?"pos":v>=.5?"":"neg";}
function leagues(m){return api("leagues").then(function(d){LD=d;
  var on=d.rows.filter(function(l){return l.enabled;}).length;
  m.innerHTML='<h2>Λίγκες · '+on+' ενεργές από '+d.rows.length+'</h2><div class="row"><button class="btn'+(LF==="on"?" main":"")+'" data-lf="on">Ενεργές</button><button class="btn'+(LF==="off"?" main":"")+'" data-lf="off">Ανενεργές</button><button class="btn'+(LF==="all"?" main":"")+'" data-lf="all">Όλες</button><button class="btn'+(LF==="bad"?" main":"")+'" data-lf="bad">⚠ Ενεργές με πρόβλημα</button>'
   +'<input id="lq" placeholder="Χώρα ή λίγκα" value="'+e(LQ)+'"><button class="btn" id="lsync" style="margin-left:auto">↻ Τράβα αγώνες τώρα</button></div>'
   +'<p class="mu">Τελευταίες 7 μέρες (+ 2 επόμενες). Πράσινο = όλα καλά, κόκκινο = λείπουν. Μια λίγκα που ενεργοποιείς φέρνει αγώνες στο επόμενο τράβηγμα (κάθε πρωί 05:05) ή αμέσως με το «Τράβα αγώνες τώρα».</p><div class="card" style="overflow:auto"><table id="lt"></table></div>';
  function draw(){var q=LQ.toLowerCase(),R=LD.rows.filter(function(l){if(q&&(l.country+" "+l.name).toLowerCase().indexOf(q)<0)return false;
      if(LF==="on")return l.enabled;if(LF==="off")return !l.enabled;if(LF==="bad")return l.enabled&&l.s&&(l.s.res<l.s.done||l.s.wo<l.s.n*.5||l.s.stuck);return true;});
    $("lt").innerHTML='<tr><th>Ενεργή</th><th>Χώρα</th><th>Λίγκα</th><th>Αγώνες</th><th>Αποτελέσματα</th><th>Με αποδόσεις</th><th>Bet365</th><th>Tips W–L</th></tr>'
     +R.map(function(l){var s=l.s||{n:0,done:0,res:0,wo:0,b365:0,stuck:0},t=l.t||{w:0,l:0};
       return '<tr><td><input type="checkbox" data-lg="'+l.id+'"'+(l.enabled?" checked":"")+'></td><td>'+e(l.country)+'</td><td>'+e(l.name)+(l.type==="Cup"?' <span class="mu">κύπελλο</span>':l.tier>1?' <span class="mu">'+l.tier+'η</span>':'')+'</td>'
        +'<td class="n">'+s.n+'</td><td class="n '+cls(s.res,s.done)+'">'+(s.done?s.res+"/"+s.done:"—")+(s.stuck?' <span class="neg">⚠'+s.stuck+'</span>':'')+'</td><td class="n '+cls(s.wo,s.n)+'">'+pc(s.wo,s.n)+'</td><td class="n '+cls(s.b365,s.n)+'">'+pc(s.b365,s.n)+'</td><td class="n">'+(t.w+t.l?'<span class="pos">'+t.w+'</span>–<span class="neg">'+t.l+'</span>':'—')+'</td></tr>';}).join("")||'<tr><td class="mu">Τίποτα.</td></tr>';
    Array.prototype.forEach.call($("lt").querySelectorAll("[data-lg]"),function(c){c.onchange=function(){var on=c.checked,l=LD.rows.filter(function(x){return x.id===+c.dataset.lg;})[0];
      if(!on&&!confirm("Απενεργοποίηση: "+l.country+" – "+l.name+"; Οι μελλοντικοί αγώνες της χωρίς tip θα σβηστούν από τη σελίδα."))return void(c.checked=true);
      api("leagues",{id:l.id,on:on}).then(function(r){if(r.error)return alert("Λάθος: "+r.error);l.enabled=on?1:0;});};});}
  draw();
  Array.prototype.forEach.call(m.querySelectorAll("[data-lf]"),function(b){b.onclick=function(){LF=b.dataset.lf;leagues(m);};});
  $("lq").oninput=function(){LQ=this.value;draw();};
  $("lsync").onclick=function(){var b=this;b.disabled=true;b.textContent="Τραβάω…";api("sync",{}).then(function(r){alert(r.error==="wait"?"Έγινε πριν από λίγο. Ξαναδοκίμασε σε 10 λεπτά.":"Έτοιμο: "+(r.result||0)+" αγώνες.");leagues(m);});};});}
function health(m){return api("health").then(function(d){var a=d.api||{},pct=a.limit?Math.round(a.current*100/a.limit):0;
  m.innerHTML='<h2>Υγεία</h2><div class="grid"><div class="card kpi"><small>API-Football σήμερα (κοινό κλειδί)</small><b class="'+(pct>85?"neg":"")+'">'+(a.current!=null?a.current+" / "+a.limit:"—")+'</b><div class="bar"><i style="width:'+pct+'%"></i></div><small>'+e(a.plan||a.error||"")+'</small></div>'
   +'<div class="card kpi"><small>Tips χωρίς αποτέλεσμα (3+ ώρες μετά)</small><b class="'+(d.pendingOld?"neg":"pos")+'">'+d.pendingOld+'</b></div><div class="card kpi"><small>Αγώνες «κολλημένοι» (4+ ώρες)</small><b>'+d.stuck+'</b></div>'
   +'<div class="card kpi"><small>Email (Brevo)</small><b class="'+(d.brevo?"pos":"neg")+'">'+(d.brevo?"OK":"λείπει το κλειδί")+'</b></div></div>'
   +'<div class="two" style="margin-top:10px"><div class="card"><h3>Κλήσεις API σήμερα ανά εργασία</h3>'+list(d.byJob.map(function(x){return[x.job+" ("+x.runs+")",x.calls||0];}))+'</div>'
   +'<div class="card"><h3>Λάθη 24 ωρών</h3>'+(d.errors.length?'<table>'+d.errors.map(function(x){return '<tr><td class="mu">'+e(x.at)+'</td><td class="err">'+e(x.note)+'</td><td class="n">×'+x.n+'</td></tr>';}).join("")+'</table>':'<p class="ok">Κανένα.</p>')+'</div></div>'
   +'<h2>Τελευταίες εργασίες</h2><div class="card"><table>'+d.last.map(function(x){return '<tr><td class="mu">'+e(x.at)+'</td><td>'+e(x.job)+'</td><td>'+(x.ok?'<span class="ok">ok</span>':'<span class="err">λάθος</span>')+'</td><td class="n">'+(x.calls||0)+'</td><td class="mu">'+e(x.note)+'</td></tr>';}).join("")+'</table></div>'
   +(d.mailFail.length?'<h2>Email που απέτυχαν</h2><div class="card"><table>'+d.mailFail.map(function(x){return '<tr><td>'+e(x.at)+'</td><td>'+e(x.target)+'</td><td class="err">'+e(x.detail)+'</td></tr>';}).join("")+'</table></div>':'');});}
function audit(m){return api("audit").then(function(r){m.innerHTML='<h2>Ιστορικό αλλαγών</h2><div class="card"><table><tr><th>Πότε (UTC)</th><th>Ποιος</th><th>Τι</th><th>Σε τι</th><th></th></tr>'+r.map(function(x){return '<tr><td class="mu">'+e(x.at)+'</td><td>'+e(x.who)+'</td><td>'+e(x.action)+'</td><td>'+e(x.target)+'</td><td class="mu">'+e(x.detail||"")+'</td></tr>';}).join("")+'</table></div>';});}
api("me").then(function(r){if(r.role==="mkt"){T=[["mkt","Marketing"]];cur="mkt";}$("who").textContent=r.email||(r.role==="mkt"?"marketing":"μυστικό link");go();}).catch(function(x){nav();
  $("main").innerHTML='<p class="err">'+e(x.message)+'</p><div class="row"><input id="ak" type="password" placeholder="Κωδικός (ADMIN_TOKEN)" style="min-width:260px"><button class="btn main" id="ako">Είσοδος</button></div><p class="mu">Ή σύνδεση με τον λογαριασμό σου από τη <a href="/el/" style="color:var(--lime)">σελίδα</a>.</p>';
  $("ako").onclick=function(){var v=$("ak").value.trim();if(v)location.href="/admin?k="+encodeURIComponent(v);};$("ak").onkeydown=function(ev){if(ev.key==="Enter")$("ako").click();};});
</script></body></html>`;
