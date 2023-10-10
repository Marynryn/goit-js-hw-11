
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const api_key = "39876586-8a2f0cc49d6159d0bf3e975f6";
const url = 'https://pixabay.com/api/';



const refs ={
    list:document.querySelector(".search-form"),
    btnSeach:document.querySelector(".seach-button"),
    btnLoadMore:document.querySelector(".load-more"),
    gallery: document.querySelector(".gallery")
}
refs.list.addEventListener('submit', serviceSeach)

    let page = 1;
    refs.btnLoadMore.addEventListener("click", onLoadMore);




    serviceSeach()
    .then((data) => {
    makeMarkUp(data);
    console.log(data);
    console.log(data.hits);
        // if (data.page < data.totalHits) {
        //   refs.btnLoadMore.classList.replace("load-more-hidden", "load-more");
        // }
      })
      .catch((err) => console.log(err));
    

      function onLoadMore({ target }) {
        page += 1;
        target.disabled = true;
      
        serviceMovie(page)
          .then((data) => {
            refs.list.insertAdjacentHTML("beforeend", createMarkup(data.hits));
      
            // if (data.hits >= data.totalHits) {
            //   refs.btnLoadMore.classList.replace("load-more", "load-more-hidden");
            // }
          })
          .catch((err) => console.log(err))
          .finally(() => (target.disabled = false));
      }
 function serviceSeach(page=1) {
    

const params = new URLSearchParams ({
    q : refs.list.searchQuery.value,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
} ) 


    return  axios.get(`${url}?key=${api_key}&${params}`)
.then(( {data} ) => makeMarkUp(hits))
      .catch(console.log);
  
  }

  function makeMarkUp(hits){
     if(!hits){
    
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
        position: 'center-center',
        timeout: 2000,
        width: '400px',
        fontSize: '24px'
    })
  } else {
    refs.gallery.innerHTML  =  createMarkup(hits);
  }}

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
    )}