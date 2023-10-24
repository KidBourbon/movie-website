const hashTrends = '#trends';
const hashSearch = '#search=';
const hashMovie = '#movie=';
const hashCategory = '#category=';
const hashHome = '#home';

window.addEventListener('DOMContentLoaded', navigator);
window.addEventListener('hashchange', navigator);

searchBtn.addEventListener('click', () => {
	setHash(hashSearch);
});

trendingPreviewBtn.addEventListener('click', () => {
	setHash(hashTrends);
});

headerArrow.addEventListener('click', () => {
	setHash(hashHome);
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

	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
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
}

function loadSearchPage() {
	headerSection.classList.remove('header--long');
	headerSection.style.background = '';
	headerArrow.classList.remove('inactive');
	headerArrow.classList.remove('header__arrow--white');
	headerTitle.classList.add('inactive');
	headerTitleCategoryView.classList.remove('inactive');
	searchForm.classList.remove('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericListSection.classList.remove('inactive');
	movieDetailSection.classList.add('inactive');
}

function loadMovieDetailPage() {
	headerSection.classList.add('header--long');
	//headerSection.style.background = '';
	headerArrow.classList.remove('inactive');
	headerArrow.classList.add('header__arrow--white');
	headerTitle.classList.add('inactive');
	headerTitleCategoryView.classList.add('inactive');
	searchForm.classList.add('inactive');

	trendingPreviewSection.classList.add('inactive');
	categoriesPreviewSection.classList.add('inactive');
	genericListSection.classList.add('inactive');
	movieDetailSection.classList.remove('inactive');
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

	const categoryData = location.hash.split('=')[1];
	const [categoryId, categoryName] = categoryData.split('-');

	headerTitleCategoryView.innerText = categoryName;
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

	getTrendingMoviesPreview();
	getCategoriesPreview();
}

function setHash(newHash) {
	location.hash = newHash;
}

function getHash() {
	return location.hash;
}
