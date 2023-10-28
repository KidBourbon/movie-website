// import axios from 'axios';

/*
 * *********
 *   AXIOS
 * *********
 */

const apiV3 = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		Authorization: `Bearer ${ACCESS_TOKEN}`,
	},
});

/*
 * *********
 *   PATHS
 * *********
 */

const posterPathWidth300 = 'https://image.tmdb.org/t/p/w300';
const posterPathWidth500 = 'https://image.tmdb.org/t/p/w500';
const pathMovie = '/movie';
const pathTrendingMovies = '/trending/movie/day';
const pathMovieGenres = '/genre/movie/list';
const pathDiscoverMovie = '/discover/movie';
const pathSearchMovie = '/search/movie';

function getPathMovieRecommendations(movieId) {
	return `${pathMovie}/${movieId}/recommendations`;
}

/*
 * *******
 *   GET
 * *******
 */

/** Gets all trending movies.
 */
async function getTrendingMoviesPreview() {
	const { data } = await apiV3(pathTrendingMovies);
	const movies = data.results;

	createMovies(movies, trendingPreviewMovieList, true);
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
 * @param {Number} categoryId The ID of the category.
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

/** Gets a movie by its id.
 * @param {Number} movieId The ID of the movie.
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

	createCategories(movie.genres, movieDetailCategoriesList);
	getRelatedMoviesById(movie.id);
}

/** Gets movies by search.
 * @param {String} query Query made by user
 */
async function getMoviesBySearch(query) {
	const { data } = await apiV3(pathSearchMovie, {
		params: { query },
	});
	const movies = data.results;

	console.log(movies);

	createMovies(movies, genericListSection);
}

/** Gets related movies given the ID of a movie.
 * @param {Number} movieId The ID of the movie.
 */
async function getRelatedMoviesById(movieId) {
	const { data } = await apiV3(getPathMovieRecommendations(movieId));

	const relatedMovies = data.results;
	createMovies(relatedMovies, relatedMoviesScrollArea);
}

/** Gets all trending movies.
 */
async function getTrendingMovies() {
	const { data } = await apiV3(pathTrendingMovies);
	const movies = data.results;

	createMovies(movies, genericListSection);
}

/*
 * ***********
 *   CREATE
 * ***********
 */

/** Creates movie cards for each movie in the list and places them in a container.
 * @param {Array} movies List of movies.
 * @param {HTMLElement} container HTML element as container.
 */
function createMovies(movies, container, lazyLoad = false) {
	container.innerHTML = '';

	movies.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('movie');
		div.addEventListener('click', () => {
			setHash(hashMovie + movie.id);
		});

		const img = document.createElement('img');
		img.classList.add('movie__img');
		img.setAttribute(
			lazyLoad ? 'poster-path' : 'src',
			`${posterPathWidth300}${movie.poster_path}`
		);
		img.setAttribute('alt', `${movie.title}`);

		if (lazyLoad) {
			lazyLoader.observe(img);
		}

		div.appendChild(img);
		container.appendChild(div);
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

/*
 * *********
 *   UTILS
 * *********
 */

const lazyLoader = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			const imgSrc = entry.target.getAttribute('poster-path');
			entry.target.setAttribute('src', imgSrc);
		}
	});
});