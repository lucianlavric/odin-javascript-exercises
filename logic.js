const container = document.getElementById('book-container');
const showButton = document.querySelector("button"); // Reference the correct "New Book" button
const dialog = document.querySelector("dialog");
const form = document.querySelector('[name="userAddBook"]');
const removeBook = document.querySelector(".removeBook");


function Book(title, author, pagenum, read) {
    this.title = title;
    this.author = author;
    this.pagenum = pagenum;
    this.read = read;

    this.info = function () {
        return this.title + " by " + author + ", " + pagenum + " pages, " + (read ? "have read" : "not read yet");
    };
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
    content.innerHTML = `${book.title} <br> ${book.author} <br> ${book.pagenum} <br> ${book.read ? "Read" : "Not read"} <br> <button type="button" class="removeBook" data-index="${index}"> Remove Book </button>`;
    content.classList.add("book");
    container.appendChild(content);
}

container.addEventListener("click", (event) => {
    if (event.target && event.target.classList.contains("removeBook")) {
        const indexToRemove = event.target.getAttribute("data-index");
        myLibrary.splice(indexToRemove, 1);  // Remove the book from the library
        displayBooks();  // Re-render the books
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