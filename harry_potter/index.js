const chr_container=document.getElementById("chr-container");
const chr_url="http://hp-api.herokuapp.com/api/characters"
async function loadCharacters(url){
	const response=await fetch(url)
	const characters=await response.json()
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
		    <p class="card-text"><span style="color:#7378c5;">Played By</span>${person.actor}</p>
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

