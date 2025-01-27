const container = document.getElementById('book-container');
const showButton = document.querySelector("button"); // Reference the correct "New Book" button
const dialog = document.querySelector("dialog");
const form = document.querySelector('[name="userAddBook"]');
const removeBook = document.querySelector(".removeBook");
const hasRead = document.getElementById("read");


function Book(title, author, pagenum, read) {
    this.title = title;
    this.author = author;
    this.pagenum = pagenum;
    this.read = read;

    this.info = function () {
        return this.title + " by " + author + ", " + pagenum + " pages, " + (read ? "have read" : "not read yet");
    };

    // this.setRead()
}

const myLibrary = [];

function addBookToLibrary(title, author, pagenum, read) {
    const newBook = new Book(title, author, pagenum, read);
    myLibrary.push(newBook);
}

// Example books
addBookToLibrary("Attack of the Evil Cupcake", "Adamo", 12, false);
addBookToLibrary("Captain Underpants", "Dav Pilkey", 150, true);
addBookToLibrary("Cookbook", "Gordon Ramsey", 200, false);

const displayBooks = () => {
    container.innerHTML = ""; // Clear container before displaying books
    for (let index = 0; index < myLibrary.length; index++){
        const book = myLibrary[index];
        readBook(book, index);
    }
};

function readBook(book, index) {
    const content = document.createElement("div");
    content.innerHTML = `${book.title} <br> 
                         ${book.author} <br> 
                         ${book.pagenum} <br> 
                         ${book.read ? "Read" : "Not read"} 
                         ${book.read ? `<input type="checkbox" name="read" id="read" checked>`: `<input type="checkbox" name="read" id="read">`}
                         <button type="button" class="removeBook" data-index="${index}"> Remove Book </button>`;

    content.classList.add("book");
    container.appendChild(content);
}

container.addEventListener("click", (event) => {
    // Check if the clicked target is a "Remove Book" button
    if (event.target && event.target.classList.contains("removeBook")) {
    // 'event.target' refers to the element that triggered the event (in this case, the clicked button)
    // 'event.target.classList.contains("removeBook")' checks if the clicked element has the class 'removeBook'
    // This ensures that we only handle click events for "Remove Book" buttons, not other elements that might be in the container
    
    // Get the index of the book to remove, stored in the 'data-index' attribute of the clicked button
    const indexToRemove = event.target.getAttribute("data-index");
    // 'data-index' is a custom attribute we set earlier on the button, which stores the index of the book in the 'myLibrary' array
    // We use getAttribute() to retrieve the value of this attribute, which corresponds to the index of the book
    
    // Remove the book from 'myLibrary' using the index we got from the button
    myLibrary.splice(indexToRemove, 1);
    // 'splice()' removes 1 item starting from the position 'indexToRemove' in the 'myLibrary' array
    // This effectively removes the book object from the array
    
    // Re-render the list of books after removing the book
    displayBooks();
    // Calling 'displayBooks()' will update the DOM to reflect the change in the 'myLibrary' array
    // It will remove the book's visual representation from the page and show the updated list of books
}

    if(event.target && event.target.id === "read") {
        const indexToAlter = event.target.nextElementSibling.getAttribute("data-index");
        const clickedButton = event.target;
        console.log(indexToAlter);
        console.log(clickedButton);
        if (clickedButton.checked){
            myLibrary[indexToAlter].read = true;
        } else if (!clickedButton.checked){
            myLibrary[indexToAlter].read = false;
        }
        displayBooks();
    }
});

// Show dialog when "New Book" button is clicked
showButton.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
});

// Handle form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const fd = new FormData(form);
    const bookInfo = Object.fromEntries(fd);

    // Add new book to the library
    addBookToLibrary(bookInfo.title, bookInfo.author, parseInt(bookInfo.pagenum), bookInfo.read === "on");

    // Clear and re-display books
    displayBooks();

    // Close the dialog
    dialog.close();
});

// Initial display of books
displayBooks();
console.log(myLibrary);