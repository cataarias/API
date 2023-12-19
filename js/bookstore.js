// Función para cargar los libros al cargar la página
window.onload = function() {
    loadBooks();
  };
  
  // Función para cargar los libros desde el JSON
  function loadBooks() {
    fetch('bookstore.json')
      .then(response => response.json())
      .then(data => {
        displayBooks(data);
      })
      .catch(error => {
        console.error('Error fetching data from JSON', error);
      });
  }
  
  // Función para mostrar los libros en la página
  function displayBooks(books) {
    const bookContainer = document.getElementById('bookContainer');
    
    books.forEach(book => {
      const card = document.createElement('div');
      card.classList.add('col-md-4', 'mb-4', 'book-card');
  
      card.innerHTML = `
        <div class="card">
          <img src="${book.image}" class="card-img-top" alt="Book Cover">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">By: ${book.author}</p>
            <!-- Puedes agregar más detalles o enlaces según tus necesidades -->
          </div>
        </div>
      `;
  
      bookContainer.appendChild(card);
    });
  }
  