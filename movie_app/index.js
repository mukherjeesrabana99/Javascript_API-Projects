const form=document.querySelector("#form");
const search=document.querySelector("#search");
const main=document.getElementById("main");
const btns=document.querySelectorAll(".btn")
//API URLS
const highest_rated_url="https://api.themoviedb.org/3/discover/movie?certification_country=US&certification=R&sort_by=vote_average.desc&primary_release_date.lte=2014-10-22&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const kids_url="https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&primary_release_date.lte=2014-10-22&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const comedies_url="https://api.themoviedb.org/3/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const drama_url="https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const popular_url="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ad46f36c2b4f56ecbe2b758da6569806"
const IMGPATH = "http://image.tmdb.org/t/p/w92";
const searchURL="https://api.themoviedb.org/3/search/movie?api_key=ad46f36c2b4f56ecbe2b758da6569806&query="
//parent function that takes url as the parameter that will take care of i)fetching desired results on passing 
//different urls as  arguments ii)display the items in card form by calling 
//displayMovie function
async function loadMovies(url){
	const response= await fetch(url);
    const data= await response.json();
    console.log(data.results);
    displayMovie(data.results);

}
loadMovies(popular_url)
//card will be generated for each of the items of the array ; fetched from the api
displayMovie=items=>{
	const all_items=items.map(item=>{
		return `
		<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card" style="width: 17rem; height:auto;">
		  <img class="card-img-top" src="${IMGPATH+item.poster_path}">
		  <div class="card-body">
		    <h5 class="card-text">${item.original_title}<span style="color:#7378c5;">(lang:${item.original_language})</span></h5>
		    <p class="card-text">${item.overview}</p>
		    <h6 class="card-text"><span style="color:#7378c5;">Release-Date:</span> ${item.release_date}</h6>
		    <h6 class="card-text"><span style="color:#7378c5;">Rating:</span>${item.vote_average}</h6>
		  </div>
		</div>
		</div>
		`
	})
	main.innerHTML=all_items.join("")
}
form.addEventListener("submit", (e)=>{
	e.preventDefault();
	loadSearchedMovies()
})
// async function loadSearchedMovies(){
// 	const form_url=searchURL+search.value
// 	const res=await fetch(form_url)
// 	const respData=await res.json()
// 	console.log(respData)
// 	displayMovie(respData.results)
// }
//Instead of repeating the same lines of code in order to fetch the data from apis
//we can define one single parent function that will take care of calling different
 //apis and displaying the movies  for loading the data  and pass url as 

//the parameter as that is the only thing varying in the function

function loadSearchedMovies(){
	const form_url=searchURL+search.value
	loadMovies(form_url)
	search.value=""
}
btns.forEach(btn=>{
	btn.addEventListener("click",function(){
		switch(this.id){
			case "kids":
			console.log("kids")
			loadMovies(kids_url);
			break;
			case "rated":
			console.log("rated")
			loadMovies(highest_rated_url);
			break;
			case "comedies":
			console.log("comedies")
			loadMovies(comedies_url);
			break;
			case "dramas":
			console.log("dramas")
			loadMovies(drama_url);
			break;
		}
	})
})
