const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  Headers:  {
    'Content-Type': 'application/json;charset=utf-8',
  }, 
  params: {
    'api_key': API_KEY,
  }
});

// Utils

function createMovies(movies, container) {
  container.innerHTML = '';

  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    container.appendChild(movieContainer);
  });
}

function createCategories(categories, container) {
  container.innerHTML = "";

  categories.forEach(category => {  
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

// Llamado a la API


async function getTrendingMoviesPreview() {
    /* const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json(); */
  const { data } = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);

  /* trendingMoviesPreviewList.innerHTML = "";
  movies.forEach(movie => {
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-container');

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie-img');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute(
      'src',
      'https://image.tmdb.org/t/p/w300' + movie.poster_path,
    );

    movieContainer.appendChild(movieImg);
    trendingMoviesPreviewList.appendChild(movieContainer);
  }); */
}

async function getCategoriesPreview() {
/* const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);*/    
    const { data } = await api('genre/movie/list');
/* const data = await res.json(); */    
  
  const categories = data.genres;

  categoriesPreviewList.innerHTML = "";

  createCategories(categories, categoriesPreviewList)  ;
/*   categories.forEach(category => {

    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
  
    const categoryTitle = document.createElement('h3');
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id);
    categoryTitle.addEventListener('click', () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainer);

  }); */
}

async function getMoviesByCategory(id) {

const { data } = await api('discover/movie', {
  params: {
    with_genres: id
  }
});
const movies = data.results;

createMovies(movies, genericSection);

/* genericSection.innerHTML = "";
movies.forEach(movie => {
  const movieContainer = document.createElement('div');
  movieContainer.classList.add('movie-container');

  const movieImg = document.createElement('img');
  movieImg.classList.add('movie-img');
  movieImg.setAttribute('alt', movie.title);
  movieImg.setAttribute(
    'src',
    'https://image.tmdb.org/t/p/w300' + movie.poster_path,
  );

  movieContainer.appendChild(movieImg);
  genericSection.appendChild(movieContainer);
}); */
}