const form=document.querySelector("#form");
const search=document.querySelector("#search");
const movie_container=document.getElementById("movie-container");
const modal_btn=document.getElementById("modal-btn");
const modal_container=document.querySelector(".modal-container");
const genre_div=document.querySelector("#genre-div")
const close_btn=document.querySelector("#close-btn")
//API URLS
const highest_rated_url="https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&primary_release_date.lte=2014-10-22&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const kids_url="https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&primary_release_date.lte=2014-10-22&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const comedies_url="https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const drama_url="https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const popular_url="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const IMGPATH = "http://image.tmdb.org/t/p/w92";
const searchURL="https://api.themoviedb.org/3/search/movie?api_key=ad46f36c2b4f56ecbe2b758da6569806&query="
//parent function that takes url as the parameter that will take care of i)fetching
// desired results  under different circumstances taking
//different urls as  arguments ii)display the items in card form by calling 
//displayMovie function
async function loadMovies(url){
	const response= await fetch(url);
    const data= await response.json();
    console.log(data.results);
    displayMovie(data.results);

}
loadMovies(popular_url)
//card will be generated for each if the items of the array from fetched api
displayMovie=items=>{
	const all_items=items.map(item=>{
		return `
		<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card"  id="${item.id}" onClick="getMovieDetail(this.id)" style="cursor:pointer;width: 17rem; height:auto;">
		  <img class="card-img-top" src="${IMGPATH+item.poster_path}">
		  <div class="card-body">
		    <h5 class="card-text">${item.original_title}<span style="color:#7378c5;">(${item.original_language})</span></h5>
		    <h6 class="card-text"><span style="color:#7378c5;">Release-Date:</span> ${item.release_date}</h6>
		    <h6 class="card-text"><span style="color:#7378c5;">Rating:</span>${item.vote_average}</h6>
		  </div>
		</div>
		</div>
		`
	})
	movie_container.innerHTML=all_items.join("")
}
//GIVE A CALL TO THE API TO FETCH DATA AND DISPLAY THEM ON SEARCH
form.addEventListener("submit", (e)=>{
	e.preventDefault();
	// loadSearchedMovies()
	loadMovies(searchURL+search.value)
	search.value=""
})
modal_btn.addEventListener("click",()=>modal_container.classList.remove("hidden"));
genre_div.innerHTML=`
<a style="display:block; cursor:pointer; padding:1rem;" onClick="getGenreMovies(kids_url)">Kids</a>
<a style="display:block; cursor:pointer; padding:1rem;" onClick="getGenreMovies(comedies_url)">Comedies</a>
<a style="display:block; cursor:pointer; padding:1rem;" onClick="getGenreMovies(highest_rated_url)">Highest Rated</a>
<a style="display:block; cursor:pointer; padding:1rem;" onClick="getGenreMovies(drama_url)">Best Dramas</a>
`
closeModal=()=>modal_container.classList.add("hidden")
close_btn.addEventListener("click", ()=>closeModal());
function getGenreMovies(url){
	console.log(url)
	loadMovies(url)
	closeModal()
}
async function getMovieDetail(id){
	console.log(id);
	const url="https://api.themoviedb.org/3/movie/"+id+"?api_key=ad46f36c2b4f56ecbe2b758da6569806"
	const response= await fetch(url)
	const data= await response.json()
	console.log(data)
	displayMovieDetail(data)
}
displayMovieDetail=(movie)=>{
	base_html=`
	<div class="card">
		  <div class="card-header">
		    <h4 style="color:#7378c5;">${movie.original_title}</h4>
		  </div>
		  <div class="card-body">
		  	<img src="${IMGPATH+movie.poster_path}" style="height:auto; width:auto;">
		    <h5 class="card-title" style="color:#7378c5;">${movie.tagline}</h5>
		    <h5 class="card-title"><span style="color:#7378c5;">Release-Date: </span>${movie.release_date}</h5>
		    <h5 class="card-title"><span style="color:#7378c5;">Runtime: </span>${movie.runtime}</h5>
		    <h5 class="card-title"><span style="color:#7378c5;">Budget: </span>${movie.budget}</h5>
		    <p class="card-text"><span style="color:#7378c5;"><b>Overview: </b></span>${movie.overview}.</p>

	`
	if(movie.belongs_to_collection==null){
		console.log(movie.original_title)
	}
	else{
		console.log(movie.original_title)
		base_html+=`
		<h5 class="card-title"><span style="color:#7378c5;">Collection: </span>${movie.belongs_to_collection.name}</h5>
		<img src="${IMGPATH+movie.belongs_to_collection.poster_path}" style="height:auto; width:auto;">

		`

	}
	
	movie_container.innerHTML=base_html
}
