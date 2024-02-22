import { fetchBreeds, fillBreedsSelect, fetchCatByBreed, showLoader, hideLoader } from './cat-api.js';
import SlimSelect from 'slim-select';

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
    });
})
const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  showLoader();
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="Cat">
        <p>Nazwa rasy: ${catData.breeds[0].name}</p>
        <p>Opis: ${catData.breeds[0].description}</p>
        <p>Temperament: ${catData.breeds[0].temperament}</p>
      `;
        hideLoader();
    })
    .catch(error => {
      console.error('Wystąpił błąd podczas pobierania informacji o kocie:', error);
    });
});