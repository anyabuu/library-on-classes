import { Author } from './Author.js';
import { User } from './User.js';

/**
 * @param {string} title
 * @param {Date} year
 * @param {User} publicationBy
 * @param {Author[]} authors
 * @constructor
 * @property {string} title
 * @property {Date} year
 * @property {Author[]} authors
 * @property {User[]} likedUsers
 * @property {User} publicationBy
 */


export class Book {
  title;
  year;
  publicationBy;
  authors;

  constructor (title, year, publicationBy, authors) {
    this.title = title;
    this.year = year;
    this.publicationBy = publicationBy;
    this.authors = authors;
    this.likedUsers = [];

    authors.forEach(function(item){
      item.books.push(this);
    });

    publicationBy.myBooks.push(this);
  }

  get suggestedBooks () {
      let result = this.authors.reduce(function (acc, author) {
        author.books.forEach(function (title) {
          acc.push(title);
        });

        return acc;
      }, []);

      let set = new Set(result);

      if (set.has(this.title)) {
        set.delete(this.title);
      }

      return [...set].join(', ');
    }

    get suggestedPublicators() {

      let result = this.authors.reduce(function (acc, author) {
        author.books.forEach(function (book) {
          if (book.publicationBy.name !== publicationBy.name) {
            acc.push(book.publicationBy.name);
          }
        });

        return acc;
      }, []);

      return [...new Set(result)].join(', ');
    }

}
