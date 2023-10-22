const apiUrlV3 = 'https://api.themoviedb.org/3';

const moviePath = '/movie';
const trendingMoviesPath = '/trending/movie';
const categoryPath = '/genre/movie/list';

const trendingPreviewMovieList = document.getElementById(
	'trending-preview-movie-list'
);

async function fetchData(urlApi, options) {
	const response = await fetch(urlApi, options);
	const data = response.json();
	return data;
}

async function getTrendingMoviesPreview() {
	const response = await fetchData(
		apiUrlV3 + trendingMoviesPath + '/day?language=en-US',
		{
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization: `Bearer ${ACCESS_TOKEN}`,
			},
		}
	);

	const movies = response.results;
	generateTrendingMoviesPreview(movies);
}

function generateTrendingMoviesPreview(movies) {
	movies.forEach((movie) => {
		trendingPreviewMovieList.innerHTML += `
      <div class="movie">
        <img
          src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
          class="movie__img"
          alt="${movie.title}"
        />
      </div>
    `;
	});
}

getTrendingMoviesPreview();
