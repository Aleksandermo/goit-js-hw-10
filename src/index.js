import { fetchBreeds, fillBreedsSelect, fetchCatByBreed, showLoader, hideLoader } from './cat-api.js';
import Notiflix from 'notiflix';

document.addEventListener('DOMContentLoaded', () => {
  showLoader();
  fetchBreeds()
    .then(breeds => {
      fillBreedsSelect(breeds);
      hideLoader();
    })
    .catch(error => {
      console.error('Wystąpił błąd podczas pobierania ras:', error);
      hideLoader();
      Notiflix.Notify.failure('Wystąpił błąd podczas pobierania ras: ' + error);
    });
})
const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
       hideLoader();
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="Cat">
        <p>Nazwa rasy: ${catData.breeds[0].name}</p>
        <p>Opis: ${catData.breeds[0].description}</p>
        <p>Temperament: ${catData.breeds[0].temperament}</p>
      `;
    })
    .catch(error => {
      catInfoDiv.innerHTML = '';
      hideLoader();
      Notiflix.Notify.failure('Wystąpił błąd podczas pobierania informacji o kocie: ' + error);
    });
});