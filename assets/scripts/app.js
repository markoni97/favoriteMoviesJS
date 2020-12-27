// const addMovieModal = document.querySelector('#add-modal');
// const addMovieModal = document.body.children[1];
const addMovieModal = document.getElementById('add-modal');
const backdrop = document.getElementById('backdrop');

//const startAddMovieButton = document.querySelector('header').lastElementChild;
const startAddMovieButton = document.querySelector('header button');
const cancleAddMovieButton = addMovieModal.querySelector('.btn--passive');

const toggleMovieModal = () => {
    addMovieModal.classList.toggle('visible');
    backdrop.classList.toggle('visible');
};

const cancleAddMovieHandler = () => {
    toggleMovieModal();
};

const backdrodClickHandler = () => {
    toggleMovieModal();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
cancleAddMovieButton.addEventListener('click', cancleAddMovieHandler);
backdrop.addEventListener('click', backdrodClickHandler);