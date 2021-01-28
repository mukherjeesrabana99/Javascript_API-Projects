//ACCESS ALL DOM DIVS TO BE POPULATED BY API DATA
const meal_container=document.querySelector("#meal-container");
const form=document.getElementById("form")
const search=document.querySelector("#search");
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
displayMeal=(meals)=>{
	all_meals=meals.map(meal=>{
		return`
		<img src="${meal.strMealThumb}">
		<h3>${meal.strCategory}</h3>
		<h3>Type: ${meal.strArea}</h3>
		`
	})
	meal_container.innerHTML=all_meals.join("");
}
//GIVE A CALL TO THE API TO FETCH DATA AND DISPLAY THEM ON SEARCH
form.addEventListener("submit",(e)=>{
	e.preventDefault();
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
	meal_container.innerHTML=all_cats.join("");
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
	meal_container.innerHTML=all_area.join("");
}
////////////////////////////////////////////////////////////////////
//DISPLAY AREA AND CATEGORY LIST ON BTN CLICK
btns.forEach(btn=>{
	btn.addEventListener("click", function(){
		switch(this.id){
			case "cats-btn":
			console.log("cats clicked")
			loadCats();
			break;
			case "area-btn":
			console.log("area clicked")
			loadArea();
			break;
		}
	})
})
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
//GIVE A CALL TO THE API TO FETCH  DATA FILTERED BY CAT OR AREA AND DISPLAY THEM 
//ON CLICKING ON ANY OF AREA OR CATEGORY NAMES
async function getFilteredMeal(item,url){
	console.log(item)
	const response=await fetch(url)
	const data=await response.json()
	console.log(data)
	displayFilteredMeal(data.meals)
}
displayFilteredMeal=(meals)=>{
	filtered_meals=meals.map(meal=>{
		return`
		<img src="${meal.strMealThumb}">
		<h3>${meal.strMeal}</h3>
		`
	})
	meal_container.innerHTML=filtered_meals.join("");
}
///////////////////////////////////////////////////////////////////////////////