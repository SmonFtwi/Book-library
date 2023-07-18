let myLibrary = [];

function book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

const add = document.querySelector(".plus")
const form = document.querySelector('#addBookForm')

add.addEventListener('click' , function (){
    form.style.display ='block'
})



function addBookToLibrary() {
    // Get user input from the form
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const haveRead = document.getElementById("haveRead").checked;

    // Create a new book object with the user input
    const newBook = new book(title, author, pages, haveRead);

    // Add the new book to the library
    myLibrary.push(newBook);

    // Clear the form inputs
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = "";
    document.getElementById("haveRead").checked = false;

    // Display the new book on the webpage
    displayBook(newBook);
}

function displayBook(book) {
    const bookCard = document.getElementById("bookCard");
    const bookInfo = document.createElement("h2");
    bookInfo.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, Have Read: ${book.haveRead}`;
    bookCard.appendChild(bookInfo);
}


