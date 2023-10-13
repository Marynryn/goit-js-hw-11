

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { serviceSeach } from "./api";


export const refs ={
    list:document.querySelector(".search-form"),
    btnSeach:document.querySelector(".seach-button"),
    btnLoadMore:document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery")
}
refs.list.addEventListener('submit', handleSumbit);

refs.btnLoadMore.classList.replace( "load-more","load-more-hidden");
let page = 1;
 const request = refs.list.elements.searchQuery;

function handleSumbit(event){
    event.preventDefault()
   refs.btnSeach.disabled = true


    serviceSeach(request.value, page)
.then(resp => {
  
    refs.gallery.innerHTML = createMarkup(resp.hits);
    refs.btnLoadMore.classList.replace("load-more-hidden", "load-more");
    Notify.success(`✅ Hooray! We found ${resp.totalHits} images.`, {
        position: 'center-center',
        timeout: 2000,
        width: '400px',
        fontSize: '24px'
        })
  
        if (resp.hits.length * page  < resp.totalHits) {
            refs.btnLoadMore.classList.replace("load-more-hidden", "load-more");
        }
      })
      .catch((err) => console.log(err))
      .finally(refs.btnSeach.disabled = false)
}

refs.btnLoadMore.addEventListener("click", onLoadMore);
      function onLoadMore(event) {
        
        page += 1;   
     
   
        serviceSeach(request.value, page)
          .then(resp => {
            refs.gallery.insertAdjacentHTML('beforeend', createMarkup(resp.hits));
           
            if (resp.hits.length * page >= resp.totalHits) {
                console.log(resp.hits.length * page)
                refs.btnLoadMore.classList.replace( "load-more","load-more-hidden");
              
    Notify.failure("We're sorry, but you've reached the end of search results.", {
        position: 'center-center',
        timeout: 2000,
        width: '400px',
        fontSize: '24px'
    })
            }
          })
          .catch((err) => console.log(err))
          .finally(() => (refs.btnSeach.disabled = false));
      }


 
  function createMarkup(arr){
   
    return arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
    `<div class="photo-card">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b> 
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b> 
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b> 
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b> 
        ${downloads}
      </p>
    </div>
  </div>`
    ).join("");

}
