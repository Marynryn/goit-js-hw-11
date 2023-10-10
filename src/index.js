
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
refs.list.addEventListener('submit', handleSumbit)


refs.btnLoadMore.classList.replace( "load-more","load-more-hidden");
    refs.btnLoadMore.addEventListener("click", onLoadMore);

let page = 1
 
function handleSumbit(event){
    event.preventDefault()
   refs.btnSeach.disabled = true


    serviceSeach()
.then(({data}) => {
    makeMarkUp(data.hits);
    
    Notify.success(`✅ Hooray! We found ${data.totalHits} images.`, {
        position: 'center-center',
        timeout: 2000,
        width: '400px',
        fontSize: '24px'
    });

        if (data.hits.length * page  < data.totalHits) {
          refs.btnLoadMore.classList.replace("load-more-hidden", "load-more");
        }
      })
      .catch((err) => console.log(err));
    
}
      function onLoadMore({ target }) {
        
        page += 1;   
        target.disabled = true;
   
        serviceSeach(page)
          .then(({data}) => {
             makeMarkUp(data.hits);
      
            if (data.hits.length * page >= data.totalHits) {
              refs.btnLoadMore.classList.add("is-hidden");
              
    Notify.failure("We're sorry, but you've reached the end of search results.", {
        position: 'center-center',
        timeout: 2000,
        width: '400px',
        fontSize: '24px'
    })
            }
          })
          .catch((err) => console.log(err))
          .finally(() => (target.disabled = false));
      }
 function serviceSeach() {
    const formData = refs.list.elements.searchQuery.value;

const params = new URLSearchParams ({
    q : formData,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40,
    page,
   
} ) 
    return  axios.get(`${url}?key=${api_key}&${params}`)

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
    refs.gallery.insertAdjacentHTML("beforeend", createMarkup(hits) ) ;
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
    ).join("");

}
refs.form.reset()