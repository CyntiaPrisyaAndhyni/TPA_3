// TMDB API

const API_key = 'api_key=f3ab55a942665e2cecd627efbd5b8712';
const Base_URL='https://api.themoviedb.org/3';

const API_URL = 'https://api.themoviedb.org/3/discover/movie?&sort_by=popularity.desc&api_key=f3ab55a942665e2cecd627efbd5b8712';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const Cari_URL = Base_URL+'/search/movie?'+API_key;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })

}

function showMovies(data){

    main.innerHTML = '';

    data.forEach(movie => {
        const {poster_path,title,vote_average,release_date,overview} = movie;
        const movieEl  = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
                <img src="${IMG_URL+poster_path}" alt="${title}">

                <div class="info-movie1">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}"><b>${vote_average}</b></span>
                </div>

                <div class="info-movie2">
                    <h6>${release_date}</h6>
                </div>

                <div class="desc-movie">

                    <h3>Overview</h3>
                    <p>${overview}</p>
                </div>
             `

        main.appendChild(movieEl);

    })
}

function getColor(vote_average){
    if(vote_average>=8){
        return 'green'
    } else if (vote_average>=5){
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(Cari_URL+'&query='+searchTerm)
    } else {
        getMovies(API_URL);
    }
})