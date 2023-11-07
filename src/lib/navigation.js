let currentPage = 1;
let infiniteScrollFunction;
let query;
let categoryId;

const hashTrends = '#trends';
const hashSearch = '#search=';
const hashMovie = '#movie=';
const hashCategory = '#category=';
const hashHome = '#home';

window.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('hashchange', navigator);
window.addEventListener(
	'scroll',
	() => {
		if (canScroll()) {
			infiniteScrollFunction(++currentPage);
		}
	},
	{ passive: false }
);

searchBtn.addEventListener('click', () => {
	setHash(hashSearch + searchInput.value);
});

trendingPreviewBtn.addEventListener('click', () => {
	setHash(hashTrends);
});

headerArrow.addEventListener('click', () => {
	history.back();
});

function navigator() {
	const currentHash = getHash();

	if (currentHash.startsWith(hashTrends)) {
		loadTrendsPage();
	} else if (currentHash.startsWith(hashSearch)) {
		loadSearchPage();
	} else if (currentHash.startsWith(hashMovie)) {
		loadMovieDetailPage();
	} else if (currentHash.startsWith(hashCategory)) {
		loadCategoriesPage();
	} else {
		loadHomePage();
	}

	resetCurrentPage();
	resetScroll();
}

function loadTrendsPage() {
	headerSection.classList.remove('header--long');
	headerSection.style.background = '';
	headerArrow.classList.remove('inactive');
	headerArrow.classList.remove('header__arrow--white');
	headerTitle.classList.add('inactive');
	headerTitleCategoryView.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericListSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');
	favoriteMoviesSection.classList.add('inactive');

	headerTitleCategoryView.innerText = 'Trending';
	infiniteScrollFunction = getPaginatedTrendingMovies;
	getTrendingMovies();
}

function loadSearchPage() {
	headerSection.classList.remove('header--long');
	headerSection.style.background = '';
	headerArrow.classList.remove('inactive');
	headerArrow.classList.remove('header__arrow--white');
	headerTitle.classList.add('inactive');
	headerTitleCategoryView.classList.add('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericListSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');
	favoriteMoviesSection.classList.add('inactive');

	query = location.hash.split('=')[1];
	infiniteScrollFunction = getPaginatedMoviesBySearch;
	getMoviesBySearch();
}

function loadMovieDetailPage() {
	headerSection.classList.add('header--long');
	headerArrow.classList.remove('inactive');
	headerArrow.classList.add('header__arrow--white');
	headerTitle.classList.add('inactive');
	headerTitleCategoryView.classList.add('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericListSection.classList.add('inactive');
	movieDetailSection.classList.remove('inactive');
	favoriteMoviesSection.classList.add('inactive');

	const movieId = location.hash.split('=')[1];
	getMovieById(movieId);
}

function loadCategoriesPage() {
	headerSection.classList.remove('header--long');
	headerSection.style.background = '';
	headerArrow.classList.remove('inactive');
	headerArrow.classList.remove('header__arrow--white');
	headerTitle.classList.add('inactive');
	headerTitleCategoryView.classList.remove('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericListSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');
	favoriteMoviesSection.classList.add('inactive');

	const categoryData = location.hash.split('=')[1];
	const [id, name] = categoryData.split('-');

	categoryId = id;
	headerTitleCategoryView.innerText = name.replace('+', ' ');
	infiniteScrollFunction = getPaginatedMoviesByCategory;
	getMoviesByCategory(categoryId);
}

function loadHomePage() {
	headerSection.classList.remove('header--long');
	headerSection.style.background = '';
	headerArrow.classList.add('inactive');
	headerArrow.classList.remove('header__arrow--white');
	headerTitle.classList.remove('inactive');
	headerTitleCategoryView.classList.add('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.remove('inactive');
	categoriesPreviewSection.classList.remove('inactive');
	genericListSection.classList.add('inactive');
	movieDetailSection.classList.add('inactive');
	favoriteMoviesSection.classList.remove('inactive');

	getTrendingMoviesPreview();
	getCategoriesPreview();
	getFavoriteMovies();

	infiniteScrollFunction = undefined;
}

function ScrolledToBottom() {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

	return scrollTop + clientHeight >= scrollHeight - 900;
}

function resetCurrentPage() {
	currentPage = 1;
}

function resetScroll() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

function canScroll() {
	return infiniteScrollFunction && currentPage < maxPages && ScrolledToBottom();
}

function isTrendingSectionActive() {
	return !trendingPreviewSection.classList.contains('inactive');
}

function setHash(newHash) {
	location.hash = newHash;
}

function getHash() {
	return location.hash;
}
