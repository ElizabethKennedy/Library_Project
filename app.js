let library = [];

// Book Div and Template const
const bookTemplate = document.querySelector('.book');
const bookshelf = document.querySelector('#bookshelf');
let idBook = library.length;

function Book(title, author, read) {
  this.id = idBook;
  this.title = title;
  this.author = author;
  this.read = read;


  idBook += 1;
}

function ReloadLibrary() {
  library = JSON.parse(localStorage.library);
  console.log(library);

  bookshelf.innerHTML = '';
  bookshelf.appendChild(bookTemplate);

  for (let i = 0; i < library.length; i += 1) {
    // eslint-disable-next-line no-use-before-define
    DisplayBook(library[i]);
  }
}

function SaveBook(title, author, read) {
  const book = new Book(title, author, read);
  if (!Array.isArray(library)) {
    library = [];
  }
  library.push(book);

  localStorage.library = JSON.stringify(library);

  ReloadLibrary();
}

// eslint-disable-next-line no-unused-vars
function AddBook() {
  // eslint-disable-next-line no-restricted-globals
  event.preventDefault();

  const formAddBook = document.forms.AddBook;
  const bookData = new FormData(formAddBook);

  const bookTitle = bookData.get('title');
  const bookAuthor = bookData.get('author');
  const bookRead = bookData.get('read');


  formAddBook.reset();

  SaveBook(bookTitle, bookAuthor, bookRead);
}
/* eslint-enable no-unused-vars */
function updateBook(title, author, read) {
    /*the user wants to change the status of the book from read to want or vice versa*/
  /* change the value of read to null and want to want. or read to read and want to null,
  based on user input*/
  //Parse from local storage into a useable object called library
  library = JSON.parse(localStorage.library);


  for (let i = 0; i < library.length; i++) {
    console.log(library[i].title);
    //Slight issue with the if statement. Might want to check more specifically
    //Right now it only looks at book titles.
    if (library[i].title === title){
      console.log("Found the book!");
      //Found the book to update!
      //Now we can change the want or read properties as desired
      if (library[i].read){
        library[i].read = false;
      }else{
        library[i].read = true;
        console.log(library[i].read);
      }
    }
  }

  //Parse back into a JSON format to update the localStorage object
  localStorage.library = JSON.stringify(library);
}


function DeleteBook(id) {
  library = library.filter((book) => book.id !== id);

  localStorage.library = JSON.stringify(library);

  ReloadLibrary();
}

function DisplayBook(book) {
  const clon = bookTemplate.content.cloneNode(true);
  clon.querySelectorAll('p')[0].innerHTML = 'BOOK NAME: '+book.title;
  clon.querySelectorAll('p')[1].innerHTML = 'AUTHOR NAME: '+book.author;
  clon.querySelectorAll('p')[2].innerHTML = 'READ: '+book.read;


  clon.querySelector('button')
  .addEventListener('click', () => {
     DeleteBook(book.id);
  });


  }

  bookshelf.appendChild(bookTemplate.content.cloneNode(true));


// Load the Library on opening the page
ReloadLibrary();
