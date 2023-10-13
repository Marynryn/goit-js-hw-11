import { refs } from './index.js';
import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const api_key = "39876586-8a2f0cc49d6159d0bf3e975f6";
const url = 'https://pixabay.com/api/';

export async function serviceSeach(data, page) {
 if (data.trim() === '') {
      return;
    }

const params = new URLSearchParams ({
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: 40,
    
} ) 

try {
   const response = await axios.get(`${url}?key=${api_key}&q=${data}&${params}&page=${page}`)
 
   if (response.data.hits.length === 0) {
        refs.gallery.innerHTML = '';
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        refs.btnLoadMore.classList.replace( "load-more","load-more-hidden");
        return;
      }
       return response.data;
     
    } catch (error) {
      Notify.failure(error.message);
    }

  }

 
   
    
     
     
   
  
  