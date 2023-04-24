let carousel = document.querySelector(".carousel")
let movie_container = document.querySelector(".movie")
const API_KEY = 'api_key=b4b5f9d98442f11bbdd50a5adf70f1d1';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const language = 'language=pt-BR';

function getMovies() {
    for(let i = 1; i < 11; i++) {
    fetch(`${BASE_URL}popular?${API_KEY}&${language}&page=${i}`)
    .then(response => response.json())
    .then(data => (data.results.forEach(movie => {
        carousel.innerHTML += `<img
         onclick="getMovie(${movie.id})" 
         src=${IMG_URL + movie.poster_path} 
         alt="${movie.title} poster" />`
    })))
    }
}

function getMovie(id) {
    fetch(`${BASE_URL + id}?${API_KEY}&${language}`)
    .then(response => response.json())
    .then(movie => {
        movie_container.innerHTML = `<img 
        src="${IMG_URL + movie.poster_path}"
        alt="" />
        <div>
            <h2>${movie.title}</h2>
            <h4>${movie.tagline}</h4>
            <p>${movie.overview}</p>
            <span>Gênero: ${movie.genres.map(genre => " " + genre.name)}</span>
            <span>Data de lançamento: ${movie.release_date.split("-").reverse().join("/")}</span>
        </div>
        `
    })
}

getMovies()


function goLeft() {
    carousel.scrollLeft -= carousel.offsetWidth 
}

function goRight() {
    carousel.scrollLeft += carousel.offsetWidth 
}