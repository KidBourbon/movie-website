/*
 * *************
 *   SECTIONS
 * *************
 */

//#region Header
const headerSection = document.getElementById('header');
const headerArrow = document.querySelector('.header__arrow');
const headerTitle = document.querySelector('.header__title');
const headerTitleCategoryView = document.querySelector(
	'.header__title--category-view'
);
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
//#endregion

//#region Trending Preview
const trendingPreviewSection = document.getElementById('trending-preview');
const trendingPreviewHeader = document.querySelector(
	'.trending-preview__header'
);
const trendingPreviewTitle = document.querySelector('.trending-preview__title');
const trendingPreviewBtn = document.querySelector('.trending-preview__btn');
const trendingPreviewMovieList = document.getElementById(
	'trending-preview-movie-list'
);
//#endregion

//#region Categories Preview
const categoriesPreviewSection = document.getElementById('categories-preview');
const categoriesPreviewTitle = document.querySelector(
	'.categories-preview__title'
);
const categoriesPreviewList = document.getElementById(
	'categories-preview-list'
);
//#endregion

//#region Favorites
const favoriteMoviesSection = document.getElementById('favorites');
const favoriteMoviesArticle = document.getElementById('favorites-movie-list');
//#endregion

//#region Generic List
const genericListSection = document.getElementById('generic-list');
//#endregion

//#region Movie Detail
const movieDetailSection = document.getElementById('movie-detail');
const movieDetailTitle = document.querySelector('.movie-detail__title');
const movieDetailScore = document.querySelector('.movie-detail__score');
const movieDetailDescription = document.querySelector(
	'.movie-detail__description'
);
const movieDetailCategoriesList = document.querySelector(
	'.movie-detail__category-list'
);
const relatedMoviesScrollArea = document.querySelector(
	'.related-movies__scroll-area'
);
//#endregion
