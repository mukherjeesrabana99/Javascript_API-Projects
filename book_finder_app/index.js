const search_input=document.querySelector("#search-input");
const search_btn=document.querySelector("#search-btn");
const book_container=document.querySelector("#book-container");
const heading=document.querySelector(".heading");
const url= "https://www.googleapis.com/books/v1/volumes?q=";
search_btn.addEventListener("click", function(){
	loadBooks(url+search_input.value)
	search_input.value=""

})
async function loadBooks(url){
	const response= await fetch(url);
    const data= await response.json();
    console.log(data.items)
    heading.innerHTML=`<h3 style="color:#7378c5;">Get similar books by clicking on the image</h3>`
    displayBooks(data.items)

}

displayBooks=(books)=>{
	all_books=books.map(book=>{
		return `
		<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card" style="width: 17rem; height:auto;">
		  <img class="card-img-top" style="cursor:pointer;" onClick="getSimilar(this.id)" id="${book.id}" src="${book.volumeInfo.imageLinks.smallThumbnail}">
		  <div class="card-body">
		    <b class="card-text" style="color:#7378c5;">${book.volumeInfo.title}</b>
		    <p class="card-text"><span style="color:#7378c5;"><b>Written By: </b></span>${book.volumeInfo.authors}</p>
		    <p class="card-text"><span style="color:#7378c5;"><b>Overview: </b></span>${book.searchInfo.textSnippet}</p>



		  </div>
		</div>
		</div>
		`
	})
	book_container.innerHTML=all_books.join("")
}
getSimilar=(id)=>{
	console.log(id);
	loadBooks(url+id)
}
