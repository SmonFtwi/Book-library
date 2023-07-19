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
window.addEventListener('click', function (event) {
    if (event.target === form) {
        form.style.display = 'none';
    }
});
document.addEventListener('click', function (event) {
    const isFormClicked = form.contains(event.target);
    const isAddButtonClicked = add.contains(event.target);

    if (!isFormClicked && !isAddButtonClicked) {
        form.style.display = 'none';
    }
});

const submitForm = document.querySelector("#submit")
submitForm.addEventListener( 'click' , function addBookToLibrary(event) {
    event.preventDefault();
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
    form.style.display ='none';
    
    // Display the new book on the webpage
    displayLibrary(myLibrary);
})

 function displayBook(book) {
    const bookCard = document.getElementById("bookCard"); // the main container 
    const bookList= document.createElement("div");  // the div element for one book 
    bookList.classList.add('bookList');
    const bookInfo = document.createElement("div"); // the div element for the book title, author and page 
    bookInfo.classList.add('bookInfo');
    const bookTitle = document.createElement("h2"); // element for the book title 
    bookTitle.textContent = `Title: ${book.title}`; 
    bookInfo.appendChild(bookTitle);
    const bookAuthor = document.createElement("h4"); // element for the book author 
    bookAuthor.textContent= `Author:     ${book.author}` ;
    bookInfo.appendChild(bookAuthor);
    const bookPages = document.createElement("h4"); // element for book page number 
    bookPages.textContent=`Pages:  ${book.pages}` ;
    bookInfo.appendChild(bookPages);
    bookList.appendChild(bookInfo);
    const BookBtn = document.createElement("div"); // this element is for the two button read status and delete 
    BookBtn.classList.add('buttons');
    const readStatus = document.createElement('button'); // read status button 
    readStatus.classList.add("readStatus");
    readStatus.textContent = book.haveRead ? "Read" : "Mark as read"; // Set initial button text based on book's haveRead property
    readStatus.addEventListener('click', function () {
      book.haveRead = !book.haveRead; // Toggle the read status
      updateReadStatus(bookList, book); // Update the displayed read status
    });
    const deleteBook = document.createElement('button');  // delete button 
    deleteBook.classList.add("delete");
    deleteBook.textContent= "delete";
    BookBtn.appendChild(readStatus);
    BookBtn.appendChild(deleteBook);
    deleteBook.addEventListener('click', function () {
        removeBook(book); // Pass the book object to removeBook() function
      });
    bookList.appendChild(BookBtn);
    const bookStatus = document.createElement("h3"); 
    if (book.haveRead === true){
        bookStatus.textContent = "Completed";
       
        readStatus.style.backgroundColor = ' #bbf7d0 '
    }
    else {
        bookStatus.textContent = "On progress";
        readStatus.style.backgroundColor = ' #94a3b8'

    }
    bookList.appendChild(bookStatus)
    
    //bookInfo.textContent = `Title: ${book.title}, Author: ${book.author}, Pages: ${book.pages}, Have Read: ${book.haveRead}`;
    bookCard.appendChild(bookList);
    
}

function displayLibrary() {
    const bookCard = document.getElementById("bookCard");
    bookCard.innerHTML = ""; // Clear the container before adding new books

    // Loop through the myLibrary array and call displayBook() for each book
    for (let i = 0; i < myLibrary.length; i++) {
      displayBook(myLibrary[i]);
    }
  }

  function updateReadStatus(bookElement, book) {
    // Update the displayed read status and background color for the clicked book
    const bookStatus = bookElement.querySelector('h3:last-child');
    bookStatus.textContent = book.haveRead ? "Completed" : "On progress";
    const readStatus = bookElement.querySelector('.readStatus');
    readStatus.textContent = book.haveRead ? "Read" : "Mark as read";
    readStatus.style.backgroundColor = book.haveRead ? '#bbf7d0' : '#94a3b8';
  }

  function removeBook(book) {
    // Find the book's index in the myLibrary array
    const index = myLibrary.findIndex((item) => item.title === book.title);

    // Remove the book from the array
    if (index !== -1) {
      myLibrary.splice(index, 1);
      // Update the displayed books after deleting the book
      displayLibrary();
    }
  }

  // Call displayLibrary() initially to display any existing books in the library
  displayLibrary();
