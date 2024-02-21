import axios from "axios";
const API_KEY = "live_4r2pEDDPlC874ZavAPrFAx3tbspmQ9t3PPOokFzL8tkbXG21Ww3kHKu8QGCSNyui";
axios.defaults.headers.common["x-api-key"] = API_KEY;

const showLoader = () => {
 const loader = document.querySelector('.loader');
  loader.style.display = 'block'; // Wyświetl animację ładowania
};
const hideLoader = () => {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none'; // Ukryj animację ładowania
};
const showError = (message) => {
  const errorElement = document.querySelector('.error');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
};
const hideError = () => {
  const errorElement = document.querySelector('.error');
  errorElement.style.display = 'none';
};
const fetchBreeds = () => {
  // Wyświetl loader i ukryj ewentualne błędy
  showLoader();
  hideError();

  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then(response => {
      // Ukryj loader po odebraniu odpowiedzi
      hideLoader();
      // Przetwórz dane otrzymane z serwera
      const breeds = response.data;
      // Wypełnij select.breed-select opcjami
      fillBreedsSelect(breeds);
      // Zwróć dane otrzymane z serwera
      return breeds;
    })
    .catch(error => {
      // Ukryj loader w przypadku błędu
      hideLoader();
      // Wyświetl błąd
      showError("Wystąpił błąd podczas pobierania ras: " + error.message);
      // Odrzuć obietnicę, aby obsłużyć błąd na wyższym poziomie
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
      throw error;
    });
};

export { fetchBreeds, fillBreedsSelect, fetchCatByBreed, showLoader, hideLoader };
