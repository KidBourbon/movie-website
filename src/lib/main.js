// import axios from 'axios';

const apiV3 = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		Authorization: `Bearer ${ACCESS_TOKEN}`,
	},
});

const posterPathWidth300 = 'https://image.tmdb.org/t/p/w300';
const posterPathWidth500 = 'https://image.tmdb.org/t/p/w500';
const pathMovie = '/movie';
const pathTrendingMovies = '/trending/movie/day';
const pathMovieGenres = '/genre/movie/list';
const pathDiscoverMovie = '/discover/movie';
const pathSearchMovie = '/search/movie';

/** Gets all trending movies.
 */
async function getTrendingMoviesPreview() {
	const { data } = await apiV3(pathTrendingMovies);
	const movies = data.results;

	createMovies(movies, trendingPreviewMovieList);
}

/** Gets all categories.
 *
 */
async function getCategoriesPreview() {
	const { data } = await apiV3(pathMovieGenres);
	const categories = data.genres;

	createCategories(categories, categoriesPreviewList);
}

/** Gets movies by category.
 */
async function getMoviesByCategory(categoryId) {
	const { data } = await apiV3(pathDiscoverMovie, {
		params: {
			with_genres: categoryId,
		},
	});
	const movies = data.results;

	createMovies(movies, genericListSection);
}

/** Gets a movie by id.
 */
async function getMovieById(movieId) {
	const { data: movie } = await apiV3(`${pathMovie}/${movieId}`);

	const movieImg = posterPathWidth500 + movie.poster_path;
	headerSection.style.background = `
		linear-gradient(
			179deg, 
			rgba(0, 0, 0, 0.35) 19.27%, 
			rgba(0, 0, 0, 0) 29.17%
		),
		url(${movieImg})
	`;
	headerSection.style.backgroundSize = 'cover';

	movieDetailTitle.textContent = movie.title;
	movieDetailScore.textContent = movie.vote_average;
	movieDetailDescription.textContent = movie.overview;

	createCategories(movie.genres, categoriesList);
}

/** Gets movies by search.
 */
async function getMoviesBySearch(query) {
	const { data } = await apiV3(pathSearchMovie, {
		params: { query },
	});
	const movies = data.results;

	console.log(movies);

	createMovies(movies, genericListSection);
}

/** Gets all trending movies.
 */
async function getTrendingMovies() {
	const { data } = await apiV3(pathTrendingMovies);
	const movies = data.results;

	createMovies(movies, genericListSection);
}

/** Creates movie cards for each movie in the list and places them in a container.
 * @param {Array} movies List of movies.
 * @param {HTMLElement} container HTML element as container.
 */
function createMovies(movies, container) {
	container.innerHTML = '';

	movies.forEach((movie) => {
		/* HTML STRUCTURE */
		// <div class="movie">
		//   <img
		//     src="${posterPathWidth300}${movie.poster_path}"
		//     class="movie__img"
		//     alt="${movie.title}"
		//   />
		// </div>

		const divMovie = document.createElement('div');
		divMovie.classList.add('movie');
		divMovie.addEventListener('click', () => {
			setHash(hashMovie + movie.id);
		});

		const img = document.createElement('img');
		img.classList.add('movie__img');
		img.setAttribute('src', `${posterPathWidth300}${movie.poster_path}`);
		img.setAttribute('alt', `${movie.title}`);

		divMovie.appendChild(img);
		container.appendChild(divMovie);
	});
}

/** Creates a HTML structure for each category in the list.
 * @param {Array} categories List of categories.
 * @param {HTMLElement} container HTML element as container.
 */
function createCategories(categories, container) {
	container.innerHTML = '';

	categories.forEach((category) => {
		/* HTML STRUCTURE */
		// <div class="category">
		// 	 <h3 id="id${category.id}" class="category__title">${category.name}</h3>
		// </div>

		const divCategory = document.createElement('div');
		divCategory.classList.add('category');

		const h3CategoryTitle = document.createElement('h3');
		h3CategoryTitle.id = `id${category.id}`;
		h3CategoryTitle.classList.add('category__title');
		h3CategoryTitle.innerText = `${category.name}`;
		h3CategoryTitle.addEventListener('click', () => {
			setHash(`${hashCategory}${category.id}-${category.name}`);
		});

		divCategory.appendChild(h3CategoryTitle);
		container.appendChild(divCategory);
	});
}
