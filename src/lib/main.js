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
 * *************
 *   VARIABLES
 * *************
 */

let maxPages;

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

	createMovies(movies, trendingPreviewMovieList, {
		lazyLoad: true,
		clear: true,
	});
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
async function getMoviesByCategory() {
	const { data } = await apiV3(pathDiscoverMovie, {
		params: {
			with_genres: categoryId,
		},
	});
	const movies = data.results;

	maxPages = data.total_pages;

	createMovies(movies, genericListSection, {
		lazyLoad: true,
		clear: true,
	});
}

/** Gets movies by category and page.
 * @param {Number} page The page number.
 */
async function getPaginatedMoviesByCategory(page) {
	const { data } = await apiV3(pathDiscoverMovie, {
		params: {
			page,
			with_genres: categoryId,
		},
	});
	const movies = data.results;

	createMovies(movies, genericListSection, {
		lazyLoad: true,
		clear: false,
	});
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
 */
async function getMoviesBySearch() {
	const { data } = await apiV3(pathSearchMovie, {
		params: { query },
	});
	const movies = data.results;

	maxPages = data.total_pages;

	createMovies(movies, genericListSection, {
		lazyLoad: true,
		clear: true,
	});
}

/** Gets movies by search and page.
 * @param {Number} page The page number.
 */
async function getPaginatedMoviesBySearch(page) {
	const { data } = await apiV3(pathSearchMovie, {
		params: {
			page,
			query,
		},
	});
	const movies = data.results;

	createMovies(movies, genericListSection, {
		lazyLoad: true,
		clear: false,
	});
}

/** Gets related movies given the ID of a movie.
 * @param {Number} movieId The ID of the movie.
 */
async function getRelatedMoviesById(movieId) {
	const { data } = await apiV3(getPathMovieRecommendations(movieId));

	const relatedMovies = data.results;
	createMovies(relatedMovies, relatedMoviesScrollArea, {
		lazyLoad: true,
		clear: true,
	});
}

/** Gets all trending movies.
 */
async function getTrendingMovies() {
	const { data } = await apiV3(pathTrendingMovies);
	const movies = data.results;

	maxPages = data.total_pages;

	createMovies(movies, genericListSection, {
		lazyLoad: true,
		clear: true,
	});
}

/** Gets all trending movies by page.
 * @param {Number} page The page number.
 */
async function getPaginatedTrendingMovies(page) {
	const { data } = await apiV3(pathTrendingMovies, {
		params: {
			page,
		},
	});
	const movies = data.results;

	createMovies(movies, genericListSection, {
		lazyLoad: true,
		clear: false,
	});
}

function getFavoriteMovies() {
	const favoriteMoviesObj = getFavoriteMoviesList();
	const favoriteMoviesList = Object.values(favoriteMoviesObj);

	createMovies(favoriteMoviesList, favoriteMoviesArticle, {
		lazyLoad: true,
		clear: true,
	});
}

/*
 * ***********
 *   CREATE
 * ***********
 */

/**
 * Creates movie cards for each movie in the list and places them in a container.
 * @param {Array} movies List of movies.
 * @param {HTMLElement} container HTML element as container.
 * @param {Object} options Set of options.
 */
function createMovies(movies, container, { lazyLoad = false, clear = true }) {
	clearContainer(container, clear);

	movies.forEach((movie) => {
		const movieDiv = createMovieDiv(movie);
		const movieImg = createMovieImg(movie, lazyLoad);
		const movieBtn = createMovieBtn(movie);

		addItemToLazyLoader(movieImg, lazyLoad);

		movieDiv.appendChild(movieImg);
		movieDiv.appendChild(movieBtn);
		container.appendChild(movieDiv);
	});
}

function createMovieDiv(movie) {
	const movieDiv = document.createElement('div');
	movieDiv.id = movie.id;
	movieDiv.classList.add('movie');

	return movieDiv;
}

function createMovieImg(movie, lazyLoad) {
	const movieImg = document.createElement('img');
	movieImg.classList.add('movie__img');
	movieImg.setAttribute(
		lazyLoad ? 'poster-path' : 'src',
		`${posterPathWidth300}${movie.poster_path}`
	);
	movieImg.setAttribute('alt', `${movie.title}`);
	movieImg.addEventListener('click', () => {
		setHash(hashMovie + movie.id);
	});
	movieImg.addEventListener('error', () => {
		movieImg.setAttribute('src', 'imgs/no-image.png');
	});

	return movieImg;
}

function createMovieBtn(movie) {
	const movieBtn = document.createElement('button');
	movieBtn.classList.add('movie__btn');
	movieBtn.addEventListener('click', () => {
		favoritizeMovie(movie);
		favoritizeMovieBtn(movie, movieBtn);
		getFavoriteMovies();
		isTrendingSectionActive() && updateFavoriteMovieBtn(movie);
	});

	favoritizeMovieBtn(movie, movieBtn);

	return movieBtn;
}

function favoritizeMovieBtn(movie, movieBtn) {
	if (getFavoriteMoviesList()[movie.id]) {
		movieBtn.classList.add('movie__btn--favorite');
	} else {
		movieBtn.classList.remove('movie__btn--favorite');
	}
}

function updateFavoriteMovieBtn(movie) {
	const movieDivList = trendingPreviewMovieList.childNodes;

	movieDivList.forEach((movieDiv) => {
		if (movieDiv.id == movie.id) {
			favoritizeMovieBtn(movie, movieDiv.childNodes.item(1));
		}
	});
}

/** Creates a HTML structure for each category in the list.
 * @param {Array} categories List of categories.
 * @param {HTMLElement} container HTML element as container.
 */
function createCategories(categories, container) {
	container.innerHTML = '';

	categories.forEach((category) => {
		const divCategory = document.createElement('div');
		divCategory.classList.add('category');

		const h3CategoryTitle = document.createElement('h3');
		h3CategoryTitle.id = `id${category.id}`;
		h3CategoryTitle.classList.add('category__title');
		h3CategoryTitle.innerText = `${category.name}`;
		h3CategoryTitle.addEventListener('click', () => {
			setHash(
				`${hashCategory}${category.id}-${category.name.replace(' ', '+')}`
			);
		});

		divCategory.appendChild(h3CategoryTitle);
		container.appendChild(divCategory);
	});
}

/*
 * ********
 *   DATA
 * ********
 */

function getFavoriteMoviesList() {
	return JSON.parse(localStorage.getItem('favoriteMovies')) || {};
}

function favoritizeMovie(movie) {
	const favoriteMovies = getFavoriteMoviesList();

	if (favoriteMovies[movie.id]) {
		favoriteMovies[movie.id] = undefined;
	} else {
		favoriteMovies[movie.id] = movie;
	}

	localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
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

function clearContainer(container, clear) {
	if (clear) {
		container.innerHTML = '';
	}
}

function addItemToLazyLoader(item, lazyLoad) {
	if (lazyLoad) {
		lazyLoader.observe(item);
	}
}
