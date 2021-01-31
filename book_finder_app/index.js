const search_input=document.querySelector("#search-input");
const search_btn=document.querySelector("#search-btn");
const book_container=document.querySelector("#book-container");
const url= "https://www.googleapis.com/books/v1/volumes?q=";
const placeHldr = '<img src="https://via.placeholder.com/150">';

search_btn.addEventListener("click", function(){
	loadBooks(url+search_input.value)
	search_input.value=""

})
async function loadBooks(url){
	const response= await fetch(url);
    const data= await response.json();
    console.log(data.items)

	displayBooks(data.items)

    
}

displayBooks=(books)=>{
	if(books){
		
		all_books=books.map(book=>{
			const bookImg=book.volumeInfo.imageLinks?book.volumeInfo.imageLinks.smallThumbnail:placeHldr
			const bookTextSnippet=book.searchInfo?book.searchInfo.textSnippet:"None"
		return `
		
		<div class="col-lg-3 col-md-6 col-sm-6">
		<div class="card"  style="width: 17rem; height:auto;">
		  <img class="card-img-top" style="cursor:pointer;"  src="${bookImg}">
		  <div class="card-body">
		    <b class="card-text" style="color:#7378c5;">${book.volumeInfo.title}</b>
		    <p class="card-text"><span style="color:#7378c5;"><b>Written By: </b></span>${book.volumeInfo.authors}</p>
		    <b class="card-text"><span  style="color:#7378c5;">Published on: </span>${book.volumeInfo.publishedDate}</b>
		    <p class="card-text"><span style="color:#7378c5;"><b>Overview: </b></span>${bookTextSnippet}</p>



		  </div>
		</div>
		</div>
		`
	})
	book_container.innerHTML=all_books.join("")

	}
	else{
		console.log("no")
		book_container.innerHTML=`<b>No Book Found</b>`
	}
}
