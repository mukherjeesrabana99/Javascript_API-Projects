const chr_container=document.getElementById("chr-container");
const search=document.getElementById("search");
const btns=document.querySelectorAll(".btn");
let characters=[]
const chr_url="http://hp-api.herokuapp.com/api/characters"
const house_url="http://hp-api.herokuapp.com/api/characters/house/"
const student_url="http://hp-api.herokuapp.com/api/characters/students"
const staff_url="http://hp-api.herokuapp.com/api/characters/staff"
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
btns.forEach(btn=>{
	btn.addEventListener("click", function(){
		switch(this.textContent){
			case "Gryffindor":
			console.log("Gryffindor clicked");
			loadCharacters(house_url+this.textContent)
			break;
			case "Hufflepuff":
			console.log("Hufflepuff clicked");
			loadCharacters(house_url+this.textContent)
			break;
			case "Ravenclaw":
			console.log("Ravenclaw clicked");
			loadCharacters(house_url+this.textContent)
			break;
			case "Slytherin":
			console.log("Slytherin clicked");
			loadCharacters(house_url+this.textContent)
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


