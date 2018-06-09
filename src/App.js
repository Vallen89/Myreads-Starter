import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Bookshelf'
import Search from './Search'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  }

componentDidMount() {
  BooksAPI.getAll().then((books) => {
    this.setState({books})
    console.log(books)
  })
}

onMoveBooks = (book, shelf) => {
  BooksAPI.update(book, shelf).then(() => {
    book.shelf = shelf;
    this.setState((state) => ({
      books: state.books.filter((c) => c.id !== book.id).concat([book])
    }))
  })
}

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search onMoveBooks={this.onMoveBooks} books={this.state.books} />
          )} />
          <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
            <Bookshelf
            books={this.state.books}
            shelf={'currentlyReading'}
            onMoveBooks={this.onMoveBooks}
            />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
            <Bookshelf
            books={this.state.books}
            shelf={'wantToRead'}
            onMoveBooks={this.onMoveBooks}
            />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
            <Bookshelf
            books={this.state.books}
            shelf={'read'}
            onMoveBooks={this.onMoveBooks}
            />
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
                    )} />
      </div>
    )
  }
}

export default BooksApp
