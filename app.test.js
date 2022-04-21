const request = require('supertest');
const app = require('./app.js');

const testUserInfo = {
  username: "test.user.x",
  rank: "Civillian",
  name: "Mx. Test User",
  crew_id: 4,
  is_auth: false,
  is_trainer: false,
  is_approver: false
};

const testUserModified = {
  rank: "GS-2022"
};

let testUserResponse = null;

describe('Users Endpoint:', () => {
  test('Should respond with a 200 status code and an array of users.', (done) => {
    request(app)
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, response) => {
        if (err) {
          throw err;
          done(err);
        } else {
          expect(Array.isArray(response.body)).toBeTruthy();
          done();
        };
      })
  });
  test('Should return user information for "John Doe" when queried for user id 1.', (done) => {
    request(app).get('/users/1').expect(200)
    .end((err, response) => {
      if (err) {
        throw err;
        done(err);
      } else {
        expect(response.body.name).toBe('john doe');
        done();
      };
    });
  });
  test('Should allow user information to be posted.', (done) => {
    request(app).post('/users').send(testUserInfo).set('Accept', 'application/json')
    .expect(201)
    .end((err, response) => {
      if (err) {
        throw err;
        done(err);
      } else {
        testUserResponse = response.body;
        expect(response.body.name).toBe(testUserInfo.name);
        done();
      };
    });
  });
  test('Should allow updates to a user.', (done) => {
    request(app).patch(`/users/${testUserResponse.id}`).send(testUserModified)
    .end((err, response) => {
      if (err) {
        throw err;
        done(err);
      } else {
        expect(response.text).toBe('Successfully updated record.');
        done();
      }
    })
  })
  test('Should allow user deletion.', (done) => {
    request(app).delete(`/users/${testUserResponse.id}`).expect(200)
    .end((err, response) => {
      if (err) {
        throw err;
        done(err);
      } else {
        done();
      };
    });
  });
  test('Should return assigned modules for a specific user.', (done) => {
    request(app).get(`/users/1/modules`).expect(200)
    .end((err, response) => {
      if (err) {
        throw err;
        done(err);
      } else {
        expect(Array.isArray(response.body)).toBeTruthy();
        done();
      }
    })
  })
})