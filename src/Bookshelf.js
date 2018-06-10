import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  render() {
    let { shelf, onMoveBooks, books } = this.props;
    return (
        <div className="bookshelf-books">
          <ol className="books-grid">
          {books.filter(b => b.shelf === shelf).map((b) => (
          <Book onMoveBooks={onMoveBooks} b={b} key={b.id}/>
          ))}
          </ol>
        </div>
    )
  }
}

export default Bookshelf
