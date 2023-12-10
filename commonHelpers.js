import{a as v,i as u,S}from"./assets/vendor-4fb3e0b3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const H="30189799-59836afbb9e42d0c8f8f60963",q="https://pixabay.com/api/",l=40,h=async(s,t)=>(await v(`${q}`,{params:{key:H,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:l}})).data;function p(s){return s.map(({webformatURL:t,largeImageURL:o,tags:i,likes:e,views:r,comments:c,downloads:L})=>`
      <a href="${o}" class='photo-card'>
        <img class='photo' src='${t}' alt='${i}' loading='lazy' />
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
            ${c}
          </p>
          <p class='info-item'>
            <b>Downloads</b>
            ${L}
          </p>
        </div>
      </a>
    `).join("")}function w(){u.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again."})}function E(){u.warning({position:"topRight",message:"You need enter your request query"})}function R(){u.info({position:"topRight",message:"❗️For an another search, enter new query!"})}function $(s){u.success({position:"topRight",message:`Hooray! We found ${s.totalHits} images.`})}function g(){u.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})}const y=document.querySelector(".search-form"),f=document.querySelector(".gallery"),a=document.querySelector(".load-more");a.classList.add("hidden");let n=1,m,b,d=!1;y.addEventListener("submit",M);a.addEventListener("click",P);async function M(s){s.preventDefault(),a.classList.add("hidden");const t=s.currentTarget.elements.searchQuery.value.trim();n=1;let o;if(t===""){E();return}if(t===m){R();return}f.innerHTML="",m=t;try{o=await h(t,n)}catch(e){console.log(e)}if(!o.totalHits){w();return}n===1&&$(o),console.log(n*l),console.log(o.totalHits),o.totalHits<=n*l&&g(),o.totalHits>n*l&&a.classList.remove("hidden");const i=p(o.hits);f.insertAdjacentHTML("afterbegin",i),b=new S(".gallery a")}async function P(){if(d)return;d=!0;const s=y.elements.searchQuery.value.trim(),t=await h(s,n+=1);f.insertAdjacentHTML("beforeend",p(t.hits)),b.refresh(),a.classList.remove("hidden"),t.totalHits<=n*l&&(a.classList.add("hidden"),g());const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"}),d=!1}
//# sourceMappingURL=commonHelpers.js.map
