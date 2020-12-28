// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');
const userInputs = addMovieModal.querySelectorAll('input');

//const startAddMovieButton = document.querySelector('header').lastElementChild;
const startAddMovieButton = document.querySelector('header button');
const cancleAddMovieButton = addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton = cancleAddMovieButton.nextElementSibling;
const movieSection = document.getElementById('entry-text');

const moviesList = [];

const clearUserInputs = () => {
    for(const userInput of userInputs){
        userInput.value = '';
    }
};

const updateUI = () => {
    if(moviesList.length === 0){
        movieSection.style.display = 'block';
    } else {
        movieSection.style.display = 'none';
    }
};

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
};

const cancleAddMovieHandler = () => {
    toggleMovieModal();
    clearUserInputs();
};

const renderNewMovieElement = (title, imageUrl, rating) => {
    const newMovieElement = document.createElement('li');
    newMovieElement.className = 'movie-element';
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${imageUrl}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2>${title}</h2>
            <p>${rating}/5 stars</p>
        </div>
    `;
    const rootList = document.getElementById('movie-list');
    rootList.append(newMovieElement);
};

const confirmAddMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imgUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if(
        titleValue.trim() === '' || 
        imgUrlValue.trim() === '' || 
        ratingValue.trim() === '' || 
        +ratingValue < 1 || 
        +ratingValue > 5){
            alert('Please enter valid values (rating between 1 and 5)');
    } else {
        const newMovie = {
            title: titleValue,
            image: imgUrlValue,
            rating: ratingValue
        };

        moviesList.push(newMovie);
        clearUserInputs();
        updateUI();
        renderNewMovieElement(newMovie.title, newMovie.image, newMovie.rating);
        console.log(moviesList);
    }
};

const backdrodClickHandler = () => {
    toggleMovieModal();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
cancleAddMovieButton.addEventListener('click', cancleAddMovieHandler);
backdrop.addEventListener('click', backdrodClickHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler);