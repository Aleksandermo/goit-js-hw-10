import axios from "axios";
import Notiflix from 'notiflix';

const API_KEY = "live_4r2pEDDPlC874ZavAPrFAx3tbspmQ9t3PPOokFzL8tkbXG21Ww3kHKu8QGCSNyui";
axios.defaults.headers.common["x-api-key"] = API_KEY;

const showLoader = () => {
 const loader = document.querySelector('.loader');
  loader.style.display = 'block';
};
const hideLoader = () => {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
};
const showError = (message) => {
 Notiflix.Notify.failure('Błąd! ' + message);
};
const hideError = () => {
  const errorElement = document.querySelector('.error');
  errorElement.style.display = 'none';
};
const fetchBreeds = () => {
  showLoader();
  hideError();

  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      hideLoader();
      const breeds = response.data;
      fillBreedsSelect(breeds);
      return breeds;
    })
    .catch(error => {
      hideLoader();
       Notiflix.Notify.failure('Błąd! Wystąpił problem podczas pobierania ras: ' + error.message);
      throw error;
    });
};
const fillBreedsSelect = (breeds) => {
  const selectElement = document.querySelector('.breed-select');

  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    selectElement.appendChild(option);
  });
};
const fetchCatByBreed = (breedId) => {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const catData = response.data[0];
      return catData;
    })
    .catch(error => {
       Notiflix.Notify.failure('Błąd! Wystąpił problem podczas pobierania informacji o kocie: ' + error.message);
      throw error;
    });
};
export { fetchBreeds, fillBreedsSelect, fetchCatByBreed, showLoader, hideLoader };
