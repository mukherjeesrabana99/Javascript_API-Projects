//ACCESS ALL DOM DIVS TO BE POPULATED BY API DATA
const meal_container=document.querySelector("#meal-container");
const form=document.getElementById("form")
const search=document.querySelector("#search");
const modal_container=document.querySelector(".modal-container");
const close_btn=document.querySelector("#close-btn");
const param_list_div=document.querySelector(".param-div");
////////////////////////////////////////////////////////////
const btns=document.querySelectorAll(".btn")
//SEARCH URL TO FETCH SEARCHED MEAL
const search_url="https://www.themealdb.com/api/json/v1/1/search.php?s="
//RANDOM URL TO FETCH RANDOM MEAL
const random_url="https://www.themealdb.com/api/json/v1/1/random.php"
//GET CATEGORY AND AREA LIST URLS
const cats_list_url="https://www.themealdb.com/api/json/v1/1/list.php?c=list"
const area_list_url="https://www.themealdb.com/api/json/v1/1/list.php?a=list"
//////////////////////////////////////////////////////////////////////////
//GET A PARTIUCULAR MEAL WITH THE ID PASSED IN THE URL
const id_url="https://www.themealdb.com/api/json/v1/1/lookup.php?i="
//URLS TO GET DATA BASED ON FILTER PARAMETERS
const cat_url="https://www.themealdb.com/api/json/v1/1/filter.php?c="
const area_url="https://www.themealdb.com/api/json/v1/1/filter.php?a="
//////////////////////////////////////////////////////////////////////////////
//GIVE A CALL TO THE API TO FETCH DATA AND DISPLAY THEM ON DOM LOAD
const loadMeals=async(url)=>{
	const response=await fetch(url)
	const data=await response.json()
	console.log(data)
	displayMeal(data.meals)
}
loadMeals(random_url)
//GIVE IMAGE THE ID OF THE MEAL SO THAT WHEN IT'S CLICKED IT FETCHES ALL THAT 
//PARTICULAR MEAL WITH THAT PARTICULAR ID
displayMeal=(meals)=>{
	all_meals=meals.map(meal=>{
		return`
			<div class="col-lg-3 col-md-6 col-sm-6">
			<div class="card" style="width: 17rem; height:auto;">
			  <img class="card-img-top" style="cursor:pointer;" id="${meal.idMeal}" onClick="getDetail(this.id)" src="${meal.strMealThumb}">
			  <div class="card-body">
			    <h6 class="card-text">${meal.strMeal}</h6>
			    <h6 class="card-text"><span style="color:#7378c5;">Type: </span>${meal.strArea},${meal.strCategory}</h6>
			  </div>
			</div>
			</div>
		`
	})
	meal_container.innerHTML=all_meals.join("");
}
//GIVE A CALL TO THE API TO FETCH DATA AND DISPLAY THEM ON SEARCH
form.addEventListener("submit",(e)=>{
	e.preventDefault();
	modal_container.classList.add("hidden")
	if(search.value){
	loadMeals(search_url+search.value);	
	}
	
	search.value=""
})

/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//GIVE A CALL TO THE API TO FETCH CATEGORY LIST
async function loadCats(){
	const response=await fetch(cats_list_url)
	const data=await response.json()
	console.log(data.meals)
	displayCat(data.meals)

}
displayCat=(cats)=>{
	all_cats=cats.map(cat=>{
		return`
		<li style="cursor:pointer;" onClick="getFilteredMeal(this.textContent,cat_url+this.textContent)">${cat.strCategory}</li>
		`
	})
	param_list_div.innerHTML=all_cats.join("");
}
///////////////////////////////////////////////////////////////
//GIVE A CALL TO THE API TO FETCH AREA LIST
async function loadArea(){
	const response=await fetch(area_list_url)
	const data=await response.json()
	
	console.log(data.meals)
	displayArea(data.meals)

}
displayArea=(areas)=>{
	all_area=areas.map(area=>{
		return`
		<li style="cursor:pointer;" onClick="getFilteredMeal(this.textContent,area_url+this.textContent)">${area.strArea}</li>
		`
	})
	param_list_div.innerHTML=all_area.join("");
}
////////////////////////////////////////////////////////////////////
//DISPLAY AREA AND CATEGORY LIST ON BTN CLICK
btns.forEach(btn=>{
	btn.addEventListener("click", function(){
		switch(this.id){
			case "cats-btn":
			console.log("cats clicked")
			modal_container.classList.remove("hidden")
			loadCats();
			break;
			case "area-btn":
			console.log("area clicked")
			modal_container.classList.remove("hidden")
			loadArea();
			break;
		}
	})
})
//BTN FOR CLOSING THE MODAL
close_btn.addEventListener("click", ()=>modal_container.classList.add("hidden"));
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//GIVE A CALL TO THE API TO FETCH  DATA FILTERED BY CAT OR AREA AND DISPLAY THEM 
//ON CLICKING ON ANY OF AREA OR CATEGORY NAMES + CLOSE THE MODAL
async function getFilteredMeal(item,url){
	console.log(item)
	const response=await fetch(url)
	const data=await response.json()
	console.log(data)
	displayFilteredMeal(data.meals)
	modal_container.classList.add("hidden")
}
//GIVE IMAGE THE ID OF THE MEAL SO THAT WHEN IT'S CLICKED IT FETCHES ALL THAT 
//PARTICULAR MEAL WITH THAT PARTICULAR ID
displayFilteredMeal=(meals)=>{
	filtered_meals=meals.map(meal=>{
		return`
		<div class="col-lg-3 col-md-6 col-sm-6">
			<div class="card" style="width: 17rem; height:auto;">
			  <img class="card-img-top" style="cursor:pointer;" id="${meal.idMeal}" onClick="getDetail(this.id)" src="${meal.strMealThumb}">
			  <div class="card-body">
			    <h6 class="card-text">${meal.strMeal}</h6>
			  </div>
			</div>
			</div>
		`
	})
	meal_container.innerHTML=filtered_meals.join("");
}
//GET EVERY DETAIL OF A MEAL BY CLICKING ON THE IMAGE
async function getDetail(id){
	console.log(id)
	const response=await fetch(id_url+id)
	const data=await response.json()
	console.log(data.meals)
	displayMealDetail(data.meals)
}
displayMealDetail=(foods)=>{
	all_food=foods.map(food=>{
		return`
		  <div class="card">
		  <div class="card-header">
		    <h4 style="color:#7378c5;">${food.strMeal}</h4>
		  </div>
		  <div class="card-body">
		  	<img src="${food.strMealThumb}" style="height:auto; width:190px;">
		    <h5 class="card-title" style="color:#7378c5;">${food.strCategory},${food.strArea}</h5>
		    <p class="card-text"><span style="color:#7378c5;"><b>Instructions: </b></span>${food.strInstructions}.</p>
		  </div>
		</div>

		`
	})
	meal_container.innerHTML=all_food.join("")
}

///////////////////////////////////////////////////////////////////////////////