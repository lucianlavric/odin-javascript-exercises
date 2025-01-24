function Book(title, author, pagenum, read){
    this.title = title;
    this.author = author;
    this.pagenum = pagenum;
    this.read = read;

   this.info = function(){
    return this.title + " by " + author + ", " + pagenum + " pages, " + (read ? "have read" : "not read yet");
   }
}

const myLibrary = [];

function addBookToLibrary(title, author, pagenum, read){
    const newBook = new Book(title, author, pagenum, read)
    myLibrary.push(newBook);
}

const Book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

addBookToLibrary("Attack of the evil cupcake", "Adamo", 12, false);
addBookToLibrary("Captain Underpants", "Dav Pilkey", 150, true);
addBookToLibrary("Cookbook", "Gordon Ramsey", 200, false);

const container = document.getElementById('book-container');

displayBooks = () => {
    myLibrary.forEach(readBook);
}

function readBook(book){
    const content = document.createElement("div");
    content.innerHTML = `${book.title} <br> ${book.author} <br> ${book.pagenum} <br> ${book.read}`;
    content.classList.add("book");
    container.appendChild(content);
}

// console.log(Book1.info());
console.log(myLibrary);
displayBooks();