let books = [];

function getAllBooks () {
  return fetch('/api/books')
    .then(responce => {
      if (responce.ok) {
        return responce.json()
      }
      throw new Error('Somethon goes wrong =(')
    })
    .then(data => {
      renderBooks(data.payload);
      saveBooks(data.payload);
})
};
getAllBooks()

function saveBooks(receivedBooks) {
    books = receivedBooks;
}

// получить книгу с заданными номером
function getBook (id) {
  return fetch(`/api/books/${id}`)
    .then(responce => {
      if (responce.ok) {
        return responce.json()
      }
      throw new Error('Somethon goes wrong =(')
    })
    .then(data => renderBooks([data.payload]))
}

const bookList = document.getElementById('books-list'); 

//Вывод всех книг на страницу
function renderBooks (books) {
  clear()
  for (let i = 0; i < books.length; i++) {
    let book = document.createElement('div'); 
    book.className = ('book')
    book.dataset.id = books[i].id;
    let title = document.createElement('div')
    title.textContent = books[i].title; 
    let author = document.createElement('div')
    author.textContent = books[i].author
    let img = document.createElement('img')
    img.src = books[i].image || 'https://via.placeholder.com/170x270.png'
    img.width = '170'
    img.height = '270'
    let rating = renderRating(books[i].rating); 
    
    book.append(img)
    book.append(title); 
    book.append(author)
    book.append(rating)
    bookList.append(book)
  }}

//Вывод звёзд рейтинга
function renderRating(number) { 
    const wrapStars = document.createElement('div');
    wrapStars.className = ('wrapStars');
    for (let i = 1; i <= 5; i++){
        const star = document.createElement('i');
        if (number >= i){
          star.className = ('fa fa-star');
        } else {
          star.className = ('fa fa-star-o');
        }
        star.dataset.rating = i;
        wrapStars.append(star);
    }
    return wrapStars;
}

bookList.addEventListener('click', addRating);

//Добавить рейтинг
function addRating(event) { 
    event.stopPropagation();
    let star = event.target.closest('.wrapStars > i');
    if (star) {
        let rating = star.dataset.rating;
        let book = event.target.closest('[data-id]');
        let bookId = book.dataset.id;
        let bookModel = books.find(book => book.id === +bookId);
        let updatedBook = {...bookModel, rating};
        return fetch(`/api/books/${bookId}`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedBook)
        })
            .then(responce => {
                if (responce.ok) {
                    return responce.json();
                }

                throw new Error('Somethon goes wrong =(');
            })
            .then(data => {
                Object.assign(bookModel, updatedBook);
                renderBooks(books);
            });
    }
}

//Очищение старых книг на странице
function clear () {
  while (bookList.firstChild) {
    bookList.removeChild(bookList.firstChild)
  }
}

//Вывод книг с наибольшим рейтингом
function mostPopular () {
  return fetch('/api/books?filter=most-popular')
    .then(responce => {
      if (responce.ok) {
        return responce.json()
      }

      throw new Error('Somethon goes wrong =(')
    })
    .then(data => renderBooks(data.payload))
}

//Вывод бесплатных книг
function freeBooks () {
  return fetch('/api/books?filter=free-books')
    .then(responce => {
      if (responce.ok) {
        return responce.json()
      }

      throw new Error('Something goes wrong =(')
    })
    .then(data => renderBooks(data.payload))
}

//Недавно добавленные книги
function mostRecent () {
  return fetch('/api/books?filter=most-recent')
    .then(responce => {
      if (responce.ok) {
        return responce.json()
      }

      throw new Error('Somethon goes wrong =(')
    })
    .then(data => renderBooks(data.payload))
}

//Поиск книг
function getBookMatch (match) {
  return fetch(`/api/books?match=${match}`)
    .then(responce => {
      if (responce.ok) {
        return responce.json()
      }

      throw new Error('Somethon goes wrong =(')
    })
    .then(data => renderBooks(data.payload))
}

//Поик при нажатии кнопки
function searchButton () {
  let valueInput = document.getElementById('searchTxt').value
  valueInput = valueInput.toLowerCase()
  getBookMatch(valueInput)
  document.getElementById('searchTxt').value = ''
}

//Умный поиск
function searchInput () {
  if (this.timer) {
    clearTimeout(this.timer)
  }
  let valueInput = document.getElementById('searchTxt').value
  valueInput = valueInput.toLowerCase()
  this.timer = setTimeout(() => getBookMatch(valueInput), 2000)
}

//добавление книги 

let formBook = document.getElementById('formBook')
formBook.addEventListener('submit', addBookFromForm)

function addBookFromForm (event) {
  let title = formBook.querySelector('[name="title"]')
  let author = formBook.querySelector('[name="author"]')
  if (title.value === '' || author.value === '') {
    return false
  }
  event.preventDefault()
  let book = {
    title: title.value,
    author: author.value,
    description: description.value,
    created_at: created_at.value
  }
  addBook(book)
  closeWindow()
}

function addBook (book) {
  fetch(
    '/api/books',
    {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        description: book.description,
        created_at: book.created_at
      })
    }
  ).then(() => {
    openPopup()
    setTimeout(closePopup, 2000)
    getAllBooks()
  })
}

let addBookButton = document.getElementById('addBook')
addBookButton.addEventListener('click', openWindow)

function openWindow (event) {
  let formBook = document.querySelector('.wrapFormBook')
  formBook.style.display = 'block'
  let wrapper = document.querySelector('.wrapper')
  wrapper.style.filter = 'contrast(10%)'
}

function closeWindow () {
  let formBook = document.querySelector('.wrapFormBook')
  formBook.style.display = 'none'
  let wrapper = document.querySelector('.wrapper')
  wrapper.style.filter = 'contrast(1)'
}

//Сообщение об успешном добавлении книги
function openPopup (event) {
  let popup = document.querySelector('.popup')
  popup.style.display = 'block'
  let wrapper = document.querySelector('.wrapper')
  wrapper.style.filter = 'contrast(10%)'
}

function closePopup () {
  let popup = document.querySelector('.popup')
  popup.style.display = 'none'
  let wrapper = document.querySelector('.wrapper')
  wrapper.style.filter = 'contrast(1)'
}
