import{a as b,i as c,S as L}from"./assets/vendor-4fb3e0b3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const i of n.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const S="30189799-59836afbb9e42d0c8f8f60963",v="https://pixabay.com/api/",d=40,m=async(r,t)=>(await b(`${v}`,{params:{key:S,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:d}})).data;function h(r){return r.map(({webformatURL:t,largeImageURL:o,tags:s,likes:e,views:n,comments:i,downloads:y})=>`
      <a href="${o}" class='photo-card'>
        <img class='photo' src='${t}' alt='${s}' loading='lazy' />
        <div class='info'>
          <p class='info-item'>
            <b>Likes</b>
            ${e}
          </p>
          <p class='info-item'>
            <b>Views</b>
            ${n}
          </p>
          <p class='info-item'>
            <b>Comments</b>
            ${i}
          </p>
          <p class='info-item'>
            <b>Downloads</b>
            ${y}
          </p>
        </div>
      </a>
    `).join("")}function w(){c.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."})}function H(){c.info({position:"topRight",message:"❗️For an another search, enter new query!"})}function E(r){c.success({position:"topRight",message:`Hooray! We found ${r.totalHits} images.`})}function q(){c.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}const p=document.querySelector(".search-form"),u=document.querySelector(".gallery"),$=document.querySelector(".load-more");$.classList.add("hidden");let a=1,f,g,l=!1;p.addEventListener("submit",R);function R(r){r.preventDefault();const t=r.currentTarget.elements.searchQuery.value.trim();if(t===f){H();return}u.innerHTML="",f=t,m(t,a).then(o=>{if(!o.totalHits){w();return}a===1&&E(o),o.totalHits<=a*d&&q();const s=h(o.hits);u.insertAdjacentHTML("afterbegin",s),g=new L(".gallery a")}).catch(o=>{console.log(o)})}async function M(){if(l)return;l=!0,a+=1;const r=p.elements.searchQuery.value.trim(),t=await m(r,a+1);u.insertAdjacentHTML("beforeend",h(t.hits)),g.refresh();const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),l=!1}window.addEventListener("scroll",()=>{const{scrollTop:r,scrollHeight:t,clientHeight:o}=document.documentElement;o+r>=t*.9&&M()});
//# sourceMappingURL=commonHelpers.js.map
