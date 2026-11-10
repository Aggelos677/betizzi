// Μεταφραστής της εφαρμογής στον browser: αλλάζει κάθε αγγλικό κείμενο με τη μετάφραση από το i18n.js.
// Τρέχει πριν αποδοθεί η εφαρμογή και παρακολουθεί κάθε νέα αλλαγή (MutationObserver).
export const TRANSLATOR = `(function(){var D=window.__I18N;if(!D)return;
var K=Object.keys(D).sort(function(a,b){return b.length-a.length;}),M=K.filter(function(k){return /\\s/.test(k);});
var EL=document.documentElement.lang==="el",A=["placeholder","aria-label","title"];
function strip(s){return s.normalize("NFD").replace(/[\\u0301\\u0308]/g,"").normalize("NFC");}
function tr(s){var t=s.trim();if(!t)return s;if(Object.prototype.hasOwnProperty.call(D,t))return s.replace(t,D[t]);
  var o=s;for(var i=0;i<M.length;i++){if(o.indexOf(M[i])>=0)o=o.split(M[i]).join(D[M[i]]);}return o;}
function txt(n){if(n.__bz===n.nodeValue)return; /* δικό μας κείμενο: όχι ξανά (αλλιώς «· model» → «· modelo» → «· modeloo»… κολλάει) */
  var p=n.parentElement;if(!p||p.closest("script,style,.ssrh,.ssra"))return;var v=tr(n.nodeValue);
  if(EL&&/[άέήίόύώΐΰ]/.test(v)&&getComputedStyle(p).textTransform==="uppercase")v=strip(v);if(v!==n.nodeValue){n.__bz=v;n.nodeValue=v;}}
function attrs(e){for(var i=0;i<A.length;i++){var x=e.getAttribute(A[i]);if(x){var y=tr(x);if(y!==x)e.setAttribute(A[i],y);}}}
function walk(r){if(r.nodeType===3)return txt(r);if(r.nodeType!==1)return;attrs(r);
  var w=document.createTreeWalker(r,5),c;while((c=w.nextNode()))c.nodeType===3?txt(c):attrs(c);}
/* 10/11 (Owner: ταχύτητα): η εφαρμογή το καλεί ΠΡΙΝ δείξει την πρώτη καρτέλα, ώστε το κείμενο να είναι ήδη μεταφρασμένο/χωρίς τόνους στα κεφαλαία (αλλιώς ο τίτλος άλλαζε από 2 σε 1 γραμμή και η σελίδα «πηδούσε»). */
window.__bzTrNow=function(){try{walk(document.body);}catch(e){}};
function go(){walk(document.body);new MutationObserver(function(ms){ms.forEach(function(m){
  if(m.type==="characterData")txt(m.target);else m.addedNodes.forEach(walk);});}).observe(document.body,{childList:true,subtree:true,characterData:true});}
document.readyState==="loading"?document.addEventListener("DOMContentLoaded",go):go();})();`;
