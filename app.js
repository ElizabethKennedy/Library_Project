console.log("Hello World!\n==========\n");

// PROJECT Section
console.log("PROJECT:\n==========\n");
// Create superclass 'Book'
class Book {
    // Constructor establishes class properties.
    constructor(id, title, author, isRead) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._isRead = false;

    }
};
//UI Class
class UI {
    static displayBooks() {
        const StoredBooks =[
            {

                id:1,
                title:'The Midnight Plan of the Repo Man',
                author:'W. Bruce Cameron',
                isRead:'Yes'
            },
            {
                id:2,
                title:'Repo Madness',
                author:'W. Bruce Cameron',
                isRead:'Yes'
            },
            {
                id:3,
                title:'Tales of H.P. Lovecraft',
                author:'H.P. Lovecraft',
                isRead:'Yes'
            },
            {
                id:4,
                title:'The Art of War',
                author:'Sun Tzu',
                isRead:'Yes'
            },
            (
                id:5,
                title:'Fight Club',
                author:'Chuck Palahniuk',
                isRead:'Yes'
            ),
            {
                id:6,
                title:'The 48 Laws of Power',
                author:'Robert Greene',
                isRead:'Yes'

            },
            {
                id:7,
                title:'How To Remodel a Man: Tips and Techniques on Accomplishing Something You Know Is Impossible But Want to Try Anyway',
                author:'W. Bruce Cameron',
                isRead:'Yes'
            }
            
        ];
        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList());
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${book.id}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.isRead}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        
        
        
        `;
        list.appendChild(row);
    }
        static deleteBook(el) {
            if(el.classList.contains('delete')) {
                el.parentElement.parentElement.remove();
            }

        }
        static showAlert(message, className) {
            const div = document.createElement('div');
            div.className = `alert` alert-${className};
            div.appendChild(document.createTextNode(message));
            const container = document.querySelector('.container');
            const form = document.querySelector('book-form');
            container.insertBefore(div, form);

            //Vanish in 3 seconds 
            setTimeout(() => document.querySelection('.alert').remove(),
            3000);        

        }


        static clearFields() {
            document.querySelector('#id').value = '';
            document.querySelector('#title').value = '';
            document.querySelector('#author').value = '';
            document.querySelector('#isRead').value = '';

        }
   }

//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Store Class: handles storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null {
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
    }

    }
    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }
    
    static removeBook(id) {
        const books =Store.getBooks();
        books.forEach((book, index) => {
            if(book.id === id) {
                books.splice(index, 1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));

    }
}


//Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {

    //Prevent actual submit
     e.preventDefault();

    //Get form values
    const id = document.querySelector('#id').value;
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isRead = document.querySelector('#isRead').value;
//Validate 
  if(id === '' || title === '' || author === '' ) {
    UI.showAlert('Please fill in all fields', 'danger');
} else {

    //Instantiate book
const book = new Book(id, title, author, isRead);

console.log(book)

//Add book to UI

UI.addBookToList(book);

//Show success message
UI.showAlert('Book Added', 'success');

//Method to clear fields
UI.clearFields();
}

});

//Event: Remove a book
document.querySelector('#book-list').addEventListener('click', (e) =1> {
   UI.deleteBook(e.target);
 });

 //Show success message
UI.showAlert('Book Added', 'success');