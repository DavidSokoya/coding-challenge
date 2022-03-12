class Book{
  constructor (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }

}

class UI{
  addBookToList(book){
      const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert cols
    row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row)

  }
  showAlert(message, className){
      // create div
    const div = document.createElement('div');
    // Add classes
    div.className =`alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector('.container');
    // Insert Alert
    const form = document.querySelector('#book-form');

    container.insertBefore(div, form);

    //  Timeout after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();

    }, 3000);

  }
  deleteBook(target){
      if(target.className ==='delete'){
        target.parentElement.parentElement.remove();
    }
  }
  clearFields(){
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
      document.getElementById('isbn').value = '';
  }
}
// Local Storage Class
class Store {
  static getBooks(){
    let books;
    if (localStorage.getItem('books')=== null){
       books = [];
    }else{
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();
    
    books.forEach(function(book){
      const ui = new UI;
      // Add book to UI;
      ui.addBookToList(book);
    })
  }
  static addBook(book){
    const books = Store.getBooks();
   
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));


  }

  static removeBook(isbn){
    const books = Store.getBooks();

    books.forEach(function(book, index){
      if(book.isbn === isbn){
        books.splice(index, 1);
      }
    });
    localStorage.setItem('book', JSON.stringify(books));
  }
}
// DOM Loadd event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// Event Listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

        // Instantiate book
        const book = new Book(title, author, isbn)
  // Instantiate UI object
  const ui = new UI();

  if(title === '' || author === '' || isbn === ''){
      // Error alert
      ui.showAlert('Please fill all fields', 'error');
  }else{
      // add book to list
  ui.addBookToList(book);

  Store.addBook(book);

  // Show succes
  ui.showAlert('Book Added Successfully', 'success')

  // Clear Fields
  ui.clearFields();
  }
e.preventDefault();
} );
// Event listener for delete book
document.getElementById('book-list').addEventListener('click', function(e){
  //  Instantiate UI Object
  const ui = new UI();
// Delete book
  ui.deleteBook(e.target);
  // Remove from LS
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show message
  ui.showAlert('Book Removed', 'success');
    e.preventDefault()
});