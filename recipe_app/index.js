const meal_container=document.querySelector("#meal-container");
const form=document.getElementById("form")
const search=document.querySelector("#search");
const category=document.querySelector("#cat");
const area=document.querySelector("#area");
const btns=document.querySelectorAll(".btn")
const search_url="https://www.themealdb.com/api/json/v1/1/search.php?s="
const random_url="https://www.themealdb.com/api/json/v1/1/random.php"
const cats_url="https://www.themealdb.com/api/json/v1/1/list.php?c=list"
const area_url="https://www.themealdb.com/api/json/v1/1/list.php?a=list"
const loadMeals=async(url)=>{
	const response=await fetch(url)
	const meals=await response.json()
	console.log(meals)
	displayMeal(meals.meals)
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
form.addEventListener("submit",(e)=>{
	e.preventDefault();
	if(search.value){
	loadMeals(search_url+search.value);	
	}
	
	search.value=""
})
async function loadCats(){
	const response=await fetch(cats_url)
	const data=await response.json()
	console.log(data.meals)
	displayCat(data.meals)

}
displayCat=(cats)=>{
	all_cats=cats.map(cat=>{
		return`
		<li class="cat-link">${cat.strCategory}</li>
		`
	})
	category.innerHTML=all_cats.join("");
}
async function loadArea(){
	const response=await fetch(area_url)
	const data=await response.json()
	
	console.log(data.meals)
	displayArea(data.meals)

}
displayArea=(areas)=>{
	all_area=areas.map(area=>{
		return`
		<li class="area-link">${area.strArea}</li>
		`
	})
	area.innerHTML=all_area.join("");
}
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
