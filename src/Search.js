import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './Bookshelf'

class Search extends Component {

state= {
  query: '',
  books: []
}

  onSearch = (query) => {
    this.setState({query});
    if (query.length === 0) {
      this.setState({books: []})
    }

        BooksAPI.search(query).then((book) => {
              if (book && book instanceof Array && book.length !== 0) {

                let search = book.map((_book) => {
                  let newBooks = this.props.books.filter((existing) => {
                    return _book.id === existing.id
                  })
                  if(newBooks[0] == undefined)
                  {
                      _book.shelf = 'none';
                  }
                  return newBooks[0] ? newBooks[0] : _book
                })
                this.setState({ books: search })

              }
              else {
                this.setState({books: []})
              }
        })

  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
            type="text"
            placeholder="Search by title or author"
            value={this.state.query}
            onChange={(event) => this.onSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <h2 className="bookshelf-title">None</h2>
          <Bookshelf books={this.state.books} shelf={'none'} onSearch={this.onSearch} onMoveBooks={this.props.onMoveBooks} />
          <h2 className="bookshelf-title">Currently Reading</h2>
          <Bookshelf books={this.state.books} shelf={'currentlyReading'} onMoveBooks={this.props.onMoveBooks}/>
          <h2 className="bookshelf-title">Want to Read</h2>
          <Bookshelf books={this.state.books} shelf={'wantToRead'} onMoveBooks={this.props.onMoveBooks}/>
          <h2 className="bookshelf-title">Read</h2>
          <Bookshelf books={this.state.books} shelf={'read'} onMoveBooks={this.props.onMoveBooks}/>
        </div>
      </div>
    )
  }
}

export default Search
