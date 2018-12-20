const router = require('express').Router()

const BOOKS = [
  {
    id: 11,
    title: 'отцы и дети',
    src: 2,
    author: 'тургенев и.в.',
    description: 'Классическая литература',
    keywords: ['отцы и дети', 'тургенев', 'классика'],
    rating: 4,
    price: 200,
    created_at: new Date(2018, 0, 1),
    image: 'img/one.jpg'
  },
  {
    id: 12,
    title: 'фаус',
    src: 6,
    author: 'гете и.в.',
    description: 'Классичская литератуара',
    keywords: ['фауст', 'гете', 'классика'],
    rating: 4,
    price: 350,
    created_at: new Date(1880, 1, 5),
    image: 'img/two.jpg'
  },
  {
    id: 13,
    title: 'земля обетованная',
    src: 2,
    author: 'ремарк Е.М.',
    description: 'Классическая литература',
    keywords: ['земля обетованная', 'ремарк', 'классика'],
    rating: 2,
    price: 280,
    created_at: new Date(2016, 0, 1),
    image: 'img/three.jpg'
  },
  {
    id: 14,
    title: 'илиада',
    src: 2,
    author: 'гомер',
    description: 'Классическая литература',
    keywords: ['илиада', 'гомер', 'классика'],
    rating: 3,
    price: '280',
    created_at: new Date(1788, 4, 5),
    image: 'img/four.jpg'
  },
  {
    id: 15,
    title: 'триумфальная арка',
    src: 2,
    author: 'ремарк е.м.',
    description: 'Классическая литература',
    keywords: ['триумфальная арка' , 'ремарк', 'классика'],
    rating: 1,
    price: 'free',
    created_at: new Date(2018, 11, 1),
    image: 'img/five.jpg'
  },
  {
    id: 16,
    title: 'так говорил заратустра',
    src: 2,
    author: 'ницше ф.',
    description: 'Классическая литература',
    keywords: ['так говорил заратустра', 'ницще', 'классика'],
    rating: 2,
    price: 480,
    created_at: new Date(2002, 3, 4),
    image: 'img/six.jpg'
  },
  {
    id: 17,
    title: 'гордость и предубеждение',
    src: 2,
    author: 'джейн остин',
    description: 'классическая литература',
    keywords: ['гордость и предубеждение', 'джейн остин', 'классика'],
    rating: 5,
    price: 389,
    created_at: new Date(2007, 4, 5),
    image: 'img/seven.jpg'
  },
  {
    id: 18,
    title: 'поющие в терновике',
    src: 2,
    author: 'маккалоу к.',
    description: 'Классическая литература',
    keywords: ['поющие в терновике', 'маккалоу', 'классика'],
    rating: 4,
    price: 'free',
    created_at: new Date(2008, 4, 5),
    image: 'img/eight.jpg'
  },
  {
    id: 19,
    title: 'хорошие плохие книги',
    src: 2,
    author: 'джордж оруэлл',
    description: 'Классическая литература',
    keywords: ['хорошие плохие книги' , 'джордж оруэлл', 'классика'],
    rating: 1,
    price: 499,
    created_at: new Date(2018, 11, 12),
    image: 'img/nine.jpg'
  },
  {
    id: 20,
    title: 'время и книги',
    src: 2,
    author: 'сомерсет моэм',
    description: 'Классическая литература',
    keywords: ['время и книги', 'сомерсет моэм', 'классика'],
    rating: 3,
    price: 'free',
    created_at: new Date(2013, 4, 9),
    image: 'img/ten.jpg'
  }
]

router.get('/:id', (req, res) => {
  const { id } = req.params

  res.json({ payload: BOOKS.find((book) => book.id === +id) })
})

const MOST_POPULAR_FILTER = 'most-popular'
const FREE_BOOKS = 'free-books'
const MOST_RECENT = 'most-recent'
const nowDate = new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate())

router.get('/', (req, res) => {
  const { query } = req; // ?filter=most-popular 

  const { filter, match } = query

  console.log(filter)

  if (filter) {
    switch (filter) {
      case MOST_POPULAR_FILTER: {
        return res.json({
          payload: BOOKS.filter(book => book.rating >= 4)
        })
      }
      case FREE_BOOKS: {
        return res.json({
          payload: BOOKS.filter(book => book.price === 'free')
        })
      }
      case MOST_RECENT: {
        return res.json({
          payload: BOOKS.filter(book => book.created_at > nowDate)
        })
      }
    }
  }
  if (match) {
    return res.json({
      payload: BOOKS.filter(book => book.title.includes(match) || book.author.includes(match) || book.keywords.find(function (keyword) {return keyword === match}))
    })
  }

  res.json({ payload: BOOKS })
})
let ID = 21
router.post('/', function (req, res) {
  const { title, author, description, created_at } = req.body
  const book = {
    id: ID++,
    title,
    author,
    created_at,
  description}
  BOOKS.push(book)
  res.setHeader('content-type', 'application/json')
  res.send(JSON.stringify(book))
})

router.put('/:id', function (req, res) {
  const { title, src, author, rating, price, created_at } = req.body
  const { id } = req.params
  let book = BOOKS.find(book => book.id === +id)
  book.title = title
  book.src = src
  book.author = author
  book.rating = rating
  book.price = price
  book.created_at = new Date(created_at)
  res.json({ payload: book })
})

module.exports = router
