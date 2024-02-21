import { fetchBreeds, fillBreedsSelect, fetchCatByBreed, showLoader, hideLoader } from './cat-api.js';
import SlimSelect from 'slim-select';


// Pobierz listę ras kotów przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    showLoader();
  fetchBreeds()
    .then(breeds => {
      // Obsłuż pobraną listę ras kotów, np. wypełnij select.breed-select
        fillBreedsSelect(breeds);
        hideLoader(); // Ukryj loader po pobraniu listy ras
         // Inicjalizacja SlimSelect
    new SlimSelect('.breed-select', {
                placeholder: 'Select a breed',
                searchPlaceholder: 'Search...',
                data: breeds.map(breed => ({ text: breed.name, value: breed.id }))
            });
    })
    .catch(error => {
        console.error('Wystąpił błąd podczas pobierania ras:', error);
        hideLoader(); // Ukryj loader w przypadku błędu
    });
});

// Dodajmy obsługę zdarzenia zmiany w elemencie select
const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

    // Wywołaj funkcję fetchCatByBreed z wybranym identyfikatorem rasy
  showLoader(); // Wyświetl loader podczas pobierania danych o kocie
  // Wywołaj funkcję fetchCatByBreed z wybranym identyfikatorem rasy
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      // Wyświetl dane o kocie na stronie
      catInfoDiv.innerHTML = `
        <img src="${catData.url}" alt="Cat">
        <p>Nazwa rasy: ${catData.breeds[0].name}</p>
        <p>Opis: ${catData.breeds[0].description}</p>
        <p>Temperament: ${catData.breeds[0].temperament}</p>
      `;
        hideLoader(); // Ukryj loader po pobraniu informacji o kocie  
    })
    .catch(error => {
      console.error('Wystąpił błąd podczas pobierania informacji o kocie:', error);
      // Tutaj możesz obsłużyć błąd w inny sposób, jeśli jest to konieczne
    });
});


