import{a as L,i as l,S as v}from"./assets/vendor-4fb3e0b3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const S="30189799-59836afbb9e42d0c8f8f60963",q="https://pixabay.com/api/",d=40,h=async(s,t)=>(await L(`${q}`,{params:{key:S,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:d}})).data;function p(s){return s.map(({webformatURL:t,largeImageURL:o,tags:n,likes:e,views:r,comments:a,downloads:b})=>`
      <a href="${o}" class='photo-card'>
        <img class='photo' src='${t}' alt='${n}' loading='lazy' />
        <div class='info'>
          <p class='info-item'>
            <b>Likes</b>
            ${e}
          </p>
          <p class='info-item'>
            <b>Views</b>
            ${r}
          </p>
          <p class='info-item'>
            <b>Comments</b>
            ${a}
          </p>
          <p class='info-item'>
            <b>Downloads</b>
            ${b}
          </p>
        </div>
      </a>
    `).join("")}function w(){l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."})}function E(){l.warning({position:"topRight",message:"You need enter your request query"})}function H(){l.info({position:"topRight",message:"❗️For an another search, enter new query!"})}function R(s){l.success({position:"topRight",message:`Hooray! We found ${s.totalHits} images.`})}function $(){l.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}const g=document.querySelector(".search-form"),f=document.querySelector(".gallery"),c=document.querySelector(".load-more");c.classList.add("hidden");let i=1,m,y,u=!1;g.addEventListener("submit",M);c.addEventListener("click",P);async function M(s){s.preventDefault(),c.classList.add("hidden");const t=s.currentTarget.elements.searchQuery.value.trim();i=1;let o;if(t===""){E();return}if(t===m){H();return}f.innerHTML="",m=t;try{o=await h(t,i)}catch(e){console.log(e)}if(!o.totalHits){w();return}i===1&&R(o),o.totalHits<=i*d&&$(),o.totalHits>i*d&&c.classList.remove("hidden");const n=p(o.hits);f.insertAdjacentHTML("afterbegin",n),y=new v(".gallery a")}async function P(){if(u)return;u=!0;const s=g.elements.searchQuery.value.trim(),t=await h(s,i+=1);f.insertAdjacentHTML("beforeend",p(t.hits)),y.refresh(),c.classList.remove("hidden");const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),u=!1}
//# sourceMappingURL=commonHelpers.js.map
