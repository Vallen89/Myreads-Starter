import React, { Component } from 'react'
import Book from './Book'

class Bookshelf extends Component {
  render() {
    let {shelf} = this.props;
    return (
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.filter(b => b.shelf === shelf).map((b) => (
          <Book onMoveBooks={this.props.onMoveBooks} b={b} key={b.id}/>
          ))}
          </ol>
        </div>
    )
  }
}

export default Bookshelf
