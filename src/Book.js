import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    b: PropTypes.object.isRequired,
    onMoveBooks: PropTypes.func.isRequired,
  };

  render() {
    let {b} = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${(b.imageLinks)?b.imageLinks.smallThumbnail:""})`
                }}></div>
            <div className="book-shelf-changer">
              <select value={b.shelf} onChange={event => this.props.onMoveBooks(b, event.target.value)}>
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{b.title}</div>
          <div className="book-authors">{b.authors && b.authors.join(", ")}</div>
        </div>
      </li>
    )
  }
}

export default Book
