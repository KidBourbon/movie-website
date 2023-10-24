// import axios from 'axios';

const apiV3 = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
		Authorization: `Bearer ${ACCESS_TOKEN}`,
	},
});

const posterPathWidth300 = 'https://image.tmdb.org/t/p/w300';
const trendingMoviesPath = '/trending/movie/day';
const categoryPath = '/genre/movie/list';

/**
 * Gets trending movies.
 */
async function getTrendingMoviesPreview() {
	const { data } = await apiV3(trendingMoviesPath);

	const movies = data.results;
	generateTrendingMoviesPreview(movies);
}

/**
 * Generates movie cards for each movie in the list.
 * @param {Array} movies List of movies.
 */
function generateTrendingMoviesPreview(movies) {
	movies.forEach((movie) => {
		trendingPreviewMovieList.innerHTML += `
      <div class="movie">
        <img
          src="${posterPathWidth300}${movie.poster_path}"
          class="movie__img"
          alt="${movie.title}"
        />
      </div>
    `;
	});
}

/**
 * Gets all categories.
 */
async function getCategoriesPreview() {
	const { data } = await apiV3(categoryPath);

	const categories = data.genres;
	generateCategoriesPreview(categories);
}

/**
 * Generates a div for each category in the list.
 * @param {Array} categories List of categories.
 */
function generateCategoriesPreview(categories) {
	categories.forEach((category) => {
		/* HTML STRUCTURE */
		// <div class="category">
		// 	<h3 id="id${category.id}" class="category__title">${category.name}</h3>
		// </div>

		const divCategory = document.createElement('div');
		divCategory.classList.add('category');

		const h3CategoryTitle = document.createElement('h3');
		h3CategoryTitle.id = `id${category.id}`;
		h3CategoryTitle.classList.add('category__title');
		h3CategoryTitle.innerText = `${category.name}`;
		h3CategoryTitle.addEventListener('click', () => {
			setHash(hashCategory + category.id);
		});

		divCategory.appendChild(h3CategoryTitle);
		categoriesPreviewList.appendChild(divCategory);
	});
}
