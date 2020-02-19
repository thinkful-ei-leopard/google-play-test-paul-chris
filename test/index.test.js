const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index');
const data = require('../playstore');

describe('GET /apps', () => {
  it('should return an error for invalid sort', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'invalid'})
      .expect(400, 'Sort must be one of Rating or App');
  });

  it('should return an error for invalid genre', () => {
    return request(app)
      .get('/apps')
      .query({genres: 'invalid'})
      .expect(400, 'App Genre should be Action, Puzzle, Strategy, Casual, Arcade, Card');
  });

  it('should return 200 and JSON data of apps', () => {
    return request(app)
      .get('/apps')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array');
      });
  });

  const validSorts = ['Rating', 'App'];
  validSorts.forEach(validSort => {
    it(`should return an array of apps sorted by ${validSort}`, () => {
      return request(app)
        .get('/apps')
        .query({sort: validSort})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          let i = 0, sorted = true;
          while (sorted && i < res.body.length - 1) {
            sorted = sorted && res.body[i][validSort] <= res.body[i + 1][validSort];
            i++;
          }
          expect(sorted).to.be.true;
        });
    });
  });

  const validGenres = ["Action", "Puzzle", "Strategy", "Casual", "Arcade", "Card"];
  validGenres.forEach(validGenre => {
    it(`should only return an array of apps that include the ${validGenre}`, () => {
      return request(app)
        .get('/apps')
        .query({genres: validGenre})
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf.at.least(1);
          let filtered = (res.body).filter(app => {
            return app.Genres.toLowerCase().includes(validGenre.toLowerCase());
          })
          expect(filtered.length).to.equal(res.body.length)
          
          
        });
    });
  });
});