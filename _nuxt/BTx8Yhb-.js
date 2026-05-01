import{_ as U}from"./Bdk_XQMO.js";import{_ as R}from"./DheUbPtG.js";import{h as L,k as B,c as z,a as r,t as O,b as i,w as p,o as H}from"#entry";const j={class:"border-t-2 border-gray-800 pt-8 mt-12 mb-8"},N={class:"relative"},D={class:"relative bg-gray-900 border-2 border-purple-500/30 rounded-lg p-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]"},E={class:"text-xl font-bold mb-2 text-center"},A={class:"inline-block animate-bounce text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"},M={class:"flex flex-wrap justify-center gap-3"},V=L({__name:"SocialShareButtons",props:{content:{},contentType:{},socialUrls:{}},setup(f){const o=f,{gtag:b}=B(),d=()=>o.content.headline||o.content.title||"",h=()=>o.content.meta_description||o.content.summary||"",m=s=>{b("event","share",{method:s,content_type:o.contentType,item_id:d(),page_location:window.location.href})},x=()=>{m("twitter");let s="";if(o.content.twitter_post)s=o.content.twitter_post;else{const c=d(),l=h();s=`${o.contentType==="article"?"🚨":"📊"} ${c}`;const g=280-s.length-25;if(l&&l!==c&&g>30){const w=l.split(".")[0]||"",I=w&&w.length<g-5?w+".":l.substring(0,g-3)+"...";s+=`

${I}`}}const t=encodeURIComponent(s),e=encodeURIComponent(o.socialUrls?.twitter||window.location.href),a=s.includes("#")?`https://twitter.com/intent/tweet?text=${t}&url=${e}`:`https://twitter.com/intent/tweet?text=${t}&url=${e}&hashtags=cybersecurity,infosec`;window.open(a,"_blank","width=550,height=420")},_=()=>{m("linkedin");const s=encodeURIComponent(o.socialUrls?.linkedin||window.location.href),t=d(),e=h();let n=t;if(e&&e!==t){const c=200-t.length-3,l=e.length>c?e.substring(0,c)+"...":e;n=`${t} - ${l}`}n+=`

#CyberSecurity #InfoSec #ThreatIntelligence`,o.contentType==="article"?n+=" #CyberThreats":n+=" #ThreatReport";const a=encodeURIComponent(n);window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${s}&summary=${a}`,"_blank","width=550,height=420")},k=()=>{m("reddit");const s=encodeURIComponent(o.socialUrls?.reddit||window.location.href),t=encodeURIComponent(d());window.open(`https://reddit.com/submit?url=${s}&title=${t}`,"_blank","width=550,height=500")},$=()=>{m("email");const s=d(),t=encodeURIComponent(o.contentType==="article"?`🚨 Cybersecurity Alert: ${s}`:`📊 Threat Intelligence Report: ${s}`),e=h(),n=o.socialUrls?.email||window.location.href;let a=`Hi,

I wanted to share this important ${o.contentType==="article"?"cybersecurity threat alert":"threat intelligence report"} with you:

`;a+=`${s}

`,e&&e!==s&&(a+=`${e}

`),a+=`You can read the full ${o.contentType} here:
${n}

`,a+=`Stay safe!

---
Shared from CyberNetSec.io`;const c=encodeURIComponent(a);window.location.href=`mailto:?subject=${t}&body=${c}`},v=()=>{m("hacker_news");const s=encodeURIComponent(o.socialUrls?.reddit||window.location.href),t=encodeURIComponent(d());window.open(`https://news.ycombinator.com/submitlink?u=${s}&t=${t}`,"_blank","width=550,height=500")},C=()=>{m("telegram");const s=encodeURIComponent(o.socialUrls?.telegram||window.location.href),t=d(),e=h();let n=`🔐 ${t}`;if(e&&e!==t){const l=e.length>200?e.substring(0,200)+"...":e;n+=`

${l}`}n+=o.contentType==="article"?`

🚨 Cybersecurity Threat Alert`:`

📊 Daily Threat Intelligence Report`;const a=encodeURIComponent(n);window.open(`https://t.me/share/url?url=${s}&text=${a}`,"_blank","width=550,height=420")},T=()=>{m("mastodon");const s=d(),t=h(),e=window.location.href;let n=o.contentType==="article"?"🚨 ":"📊 ";if(n+=s,t&&t!==s){const c=e.length+2,u=500-n.length-c-30;if(u>30){const y=t.length>u?t.substring(0,u-3)+"...":t;n+=`

${y}`}}n+=`

${e}

#CyberSecurity #InfoSec`;const a=encodeURIComponent(n);window.open(`https://mastodon.social/share?text=${a}`,"_blank","width=550,height=600")},S=()=>{m("bluesky");const s=d(),t=h(),e=window.location.href;let n=o.contentType==="article"?"🚨 ":"📊 ";if(n+=s,t&&t!==s){const c=e.length+2,l=300-n.length-c;if(l>30){const u=t.length>l?t.substring(0,l-3)+"...":t;n+=`

${u}`}}n+=`

${e}`;const a=encodeURIComponent(n);window.open(`https://bsky.app/intent/compose?text=${a}`,"_blank","width=550,height=600")};return(s,t)=>{const e=U,n=R;return H(),z("div",j,[r("div",N,[t[9]||(t[9]=r("div",{class:"absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 blur-xl animate-pulse"},null,-1)),r("div",D,[r("h3",E,[r("span",A," 📢 Share This "+O(f.contentType==="article"?"Article":"Publication"),1)]),t[8]||(t[8]=r("p",{class:"text-sm text-gray-400 text-center mb-4"},"Help others stay informed about cybersecurity threats",-1)),r("div",M,[i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share on X (Twitter)",onClick:x},{default:p(()=>[i(e,{name:"simple-icons:x",class:"w-5 h-5"}),t[0]||(t[0]=r("span",{class:"hidden sm:inline"},"X",-1))]),_:1}),i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share on Mastodon",onClick:T},{default:p(()=>[i(e,{name:"simple-icons:mastodon",class:"w-5 h-5"}),t[1]||(t[1]=r("span",{class:"hidden sm:inline"},"Mastodon",-1))]),_:1}),i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share on Bluesky",onClick:S},{default:p(()=>[i(e,{name:"simple-icons:bluesky",class:"w-5 h-5"}),t[2]||(t[2]=r("span",{class:"hidden sm:inline"},"Bluesky",-1))]),_:1}),i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share on LinkedIn",onClick:_},{default:p(()=>[i(e,{name:"simple-icons:linkedin",class:"w-5 h-5"}),t[3]||(t[3]=r("span",{class:"hidden sm:inline"},"LinkedIn",-1))]),_:1}),i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share on Reddit",onClick:k},{default:p(()=>[i(e,{name:"simple-icons:reddit",class:"w-5 h-5"}),t[4]||(t[4]=r("span",{class:"hidden sm:inline"},"Reddit",-1))]),_:1}),i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share on Hacker News",onClick:v},{default:p(()=>[i(e,{name:"simple-icons:ycombinator",class:"w-5 h-5"}),t[5]||(t[5]=r("span",{class:"hidden sm:inline"},"HN",-1))]),_:1}),i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share on Telegram",onClick:C},{default:p(()=>[i(e,{name:"simple-icons:telegram",class:"w-5 h-5"}),t[6]||(t[6]=r("span",{class:"hidden sm:inline"},"Telegram",-1))]),_:1}),i(n,{variant:"primary",size:"md",class:"flex items-center gap-2 hover:scale-105 transition-transform",title:"Share via Email",onClick:$},{default:p(()=>[i(e,{name:"heroicons:envelope-20-solid",class:"w-5 h-5"}),t[7]||(t[7]=r("span",{class:"hidden sm:inline"},"Email",-1))]),_:1})])])])])}}}),Y=Object.assign(V,{__name:"SocialShareButtons"});export{Y as _};
