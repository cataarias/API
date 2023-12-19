// Lista de libros específicos
const specificBooks = [
    'Pride and Prejudice',
    'To Kill a Mockingbird',
    'The Great Gatsby',
    'One Hundred Years of Solitude',
    'In Cold Blood',
    'Wide Sargasso Sea',
    'Brave New World',
    'Capture The Castle',
    'Jane Eyre',
    'Crime and Punishment',
    'The Secret History',
    'The Call of the Wild',
    'The Chrysalids',
    'Persuasion',
    'Moby-Dick',
    'To the Lighthouse',
    'The Death of the Heart',
    'Frankenstein',
    'The Master and Margarita',
    'The Go-Between',
    'Nineteen Eighty-Four',
    'Buddenbrooks',
    'The Grapes of Wrath',
    'Beloved',
    'The Code of the Woosters',
    'Dracula',
    'The Lord of the Rings',
    'The Adventures of Huckleberry Finn',
    'Great Expectations',
    'Things Fall Apart',
    'Middlemarch',
    'The Iliad',
    'Vanity Fair',
    'Brideshead Revisited',
    'The Catcher in the Rye',
    'Alice’s Adventures in Wonderland',
    'The Mill on the Floss',
    'Barchester Towers',
    'Another Country',
    'Les Miserables',
    'Charlie and the Chocolate Factory',
    'The Outsiders',
    'The Count of Monte Cristo',
    'Ulysses',
    'East of Eden',
    'The Brothers Karamazov',
    'Lolita',
    'The Secret Garden',
    'Scoop',
    'A Tale of Two Cities',
    'Diary of a Nobody'
  ];
  
  document.addEventListener('DOMContentLoaded', function () {
    const paginationElement = document.getElementById('pagination');
    const pages = paginationElement.querySelectorAll('.page-link');
  
    pages.forEach(page => {
      page.addEventListener('click', function (e) {
        e.preventDefault();
        const pageNumber = parseInt(e.target.textContent);
        loadSpecificBooks(pageNumber, 10); // Mostrar 10 resultados por página
        updateActivePage(pageNumber);
      });
    });
  });
  
  function updateActivePage(pageNumber) {
    const pages = document.querySelectorAll('.page-item');
    pages.forEach(page => {
      page.classList.remove('active');
      if (parseInt(page.textContent) === pageNumber) {
        page.classList.add('active');
      }
    });
  }

  
  
  function loadSpecificBooks(pageNumber, perPage) {
    const startIndex = (pageNumber - 1) * perPage;
    const endIndex = startIndex + perPage;
    const booksToShow = specificBooks.slice(startIndex, endIndex);
  
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';
  
    booksToShow.forEach(bookTitle => {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(bookTitle)}&langRestrict=en`;
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          const book = data.items ? data.items[0] : null;
          if (book) {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
  
            const truncatedDescription = book.volumeInfo.description ? `${book.volumeInfo.description.slice(0, 100)}...` : 'No description available';
  
            card.innerHTML = `
              <div class="card">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${book.volumeInfo.imageLinks?.thumbnail}" class="img-fluid rounded-start" alt="Book Cover">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${book.volumeInfo.title}</h5>
                      <p class="card-text">By: ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                      <p class="card-text">${truncatedDescription}</p>
                      <a href="${book.volumeInfo.previewLink}" target="_blank" class="btn btn-primary">Read more</a>
                    </div>
                  </div>
                </div>
              </div>
            `;
  
            bookContainer.appendChild(card);
          }
        })
        .catch(error => {
          console.error('Error fetching data from Google Books API', error);
        });
    });
  }
  
  loadSpecificBooks(1, 10);

 
 
 
  function searchBooks() {
    const searchInput = document.getElementById('searchInput').value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchInput)}&langRestrict=en`;
  
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        displayResults(data.items);
      })
      .catch(error => {
        console.error('Error fetching data from Google Books API', error);
      });
  }
  
  function displayResults(books) {
    const bookContainer = document.getElementById('bookContainer');
    bookContainer.innerHTML = '';
  
    if (books.length === 0) {
      bookContainer.innerHTML = '<p>No results found</p>';
      return;
    }
  
    books.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4');
  
      card.innerHTML = `
        <div class="card2">
          <div class="row g-0">
            <div class="col-md-4">
              <img src="${book.volumeInfo.imageLinks?.thumbnail}" class="img-fluid rounded-start" alt="Book Cover">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${book.volumeInfo.title}</h5>
                <p class="card-text">By: ${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <p class="card-text">${book.volumeInfo.description || 'No description available'}</p>
                <a href="${book.volumeInfo.previewLink}" target="_blank" class="btn btn-primary">Read more</a>
                </div>
              </div>
          </div>
        </div>
      `;
  
      bookContainer.appendChild(card);
    });
  }
  