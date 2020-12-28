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
const rootList = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal')

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

const showMovieModal = () => {
    addMovieModal.classList.add('visible');
    toggleBackdrop();
};

const removeMovieModal = () => {
    addMovieModal.classList.remove('visible');
};

const toggleBackdrop = () => {
    backdrop.classList.toggle('visible');
};

const cancleAddMovieHandler = () => {
    clearUserInputs();
    removeMovieModal();
    toggleBackdrop();
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove('visible');
};

const deleteMovieHandler = (movieId) => {
    let movieIndex = 0;
    for(const movie of moviesList){
        if(movie.id === movieId){
            break;
        }
        movieIndex++;
    }
    moviesList.splice(movieIndex, 1);
    rootList.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = movieId => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();

    const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
    confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click', closeMovieDeletionModal);
    cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);

    confirmDeletionButton.addEventListener('click', deleteMovieHandler.bind(null, movieId));

    //deleteMovie(movieId)
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
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
    newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id));
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
            id: Math.random(),
            title: titleValue,
            image: imgUrlValue,
            rating: ratingValue
        };

        moviesList.push(newMovie);
        console.log(moviesList);
        removeMovieModal();
        toggleBackdrop();
        clearUserInputs();
        updateUI();
        renderNewMovieElement(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
        
    }
};

const backdrodClickHandler = () => {
    removeMovieModal();
    closeMovieDeletionModal();
    clearUserInputs();
};

startAddMovieButton.addEventListener('click', showMovieModal);
cancleAddMovieButton.addEventListener('click', cancleAddMovieHandler);
backdrop.addEventListener('click', backdrodClickHandler);
confirmAddMovieButton.addEventListener('click', confirmAddMovieHandler);