//ACCESS ALL DOM DIVS TO BE POPULATED BY API DATA
const chr_container=document.getElementById("chr-container");
const search=document.getElementById("search");
const btns=document.querySelectorAll(".btn");
const modal_container=document.querySelector(".modal-container");
const close_btn=document.querySelector("#close-btn");
const house_div=document.querySelector("#house-div");
//////////////////////////////////////////////////////////////////////////
let characters=[]
//API URLS
const chr_url="http://hp-api.herokuapp.com/api/characters"
const house_url="http://hp-api.herokuapp.com/api/characters/house/"
const student_url="http://hp-api.herokuapp.com/api/characters/students"
const staff_url="http://hp-api.herokuapp.com/api/characters/staff"
////////////////////////////////////////////////////////////////////////////////
//GIVE A CALL TO THE API TO FETCH DATA AND DISPLAY THEM ON DOM LOAD
async function loadCharacters(url){
	const response=await fetch(url)
	characters=await response.json()
	displayCharacter(characters)
	console.log(characters)
}
loadCharacters(chr_url)
displayCharacter=persons=>{
	const all_persons=persons.map(person=>{
		return `
		<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card" style="width: 17rem; height:auto;">
		  <img class="card-img-top" src="${person.image}">
		  <div class="card-body">
		    <h5 class="card-text">${person.name}</h5>
		    <p class="card-text"><span style="color:#7378c5;"><b>Played By</b></span>${person.actor}</p>
		    <h6 class="card-text"><span style="color:#7378c5;">House:</span> ${person.house}</h6>
		    <h6 class="card-text"><span style="color:#7378c5;">Belongs To:</span>${person.ancestry}</h6>
			<h6 class="card-text"><span style="color:#7378c5;">Core:</span>${person.wand.core}</h6>
			<h6 class="card-text"><span style="color:#7378c5;">Wood:</span>${person.wand.wood}</h6>
		  </div>
		</div>
		</div>
		`

	})
	chr_container.innerHTML=all_persons.join("")
}
//GIVE A CALL TO THE API TO FETCH DATA AND DISPLAY THEM ON SEARCH
search.addEventListener('keyup', (e)=>{
	console.log(e.target.value)
	const searched_chr=characters.filter(chr=>{
		return(
			chr.name.toLowerCase().includes(e.target.value.toLowerCase())||
			chr.house.toLowerCase().includes(e.target.value.toLowerCase())
			)
	})
	displayCharacter(searched_chr)
})
//RENDERING LIST OF ALL HOUSES WHICH THE USER CAN CLICK ON TO GET PEOPLE OF THAT
// PARTICULAR HOUSE
house_div.innerHTML=`
<a style="display:block; padding:1rem; cursor:pointer;" onClick="getHouseChrs(this.textContent)">Gryffindor</a>
<a style="display:block; padding:1rem; cursor:pointer;" onClick="getHouseChrs(this.textContent)">Hufflepuff</a>
<a style="display:block; padding:1rem; cursor:pointer;" onClick="getHouseChrs(this.textContent)">Ravenclaw</a>
<a style="display:block; padding:1rem; cursor:pointer;" onClick="getHouseChrs(this.textContent)">Slytherin</a>
`
///////////////////////////////////////////////////////////////////////////////
openModal=()=>modal_container.classList.remove("hidden")
closeModal=()=>modal_container.classList.add("hidden")
btns.forEach(btn=>{
	btn.addEventListener("click", function(){
		switch(this.textContent){
			case "Houses":
			console.log("Houses clicked");
			openModal()
			break;
			case "Students":
			console.log("Students clicked");
			loadCharacters(student_url)
			break;
			case "Staffs":
			console.log("Staffs clicked");
			loadCharacters(staff_url)
			break;
		}
	})
})

//BTN FOR CLOSING THE MODAL
close_btn.addEventListener("click", ()=>closeModal());
//GIVE A CALL TO THE API TO FETCH  DATA FILTERED BY HOUSE NAMES AND DISPLAY THEM 
//ON CLICKING ON ANY OF THE NAMES + CLOSE THE MODAL
function getHouseChrs(text){
	console.log(`${text} clicked`);
	loadCharacters(house_url+text)
	closeModal()
}


