process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Event = require('../models/eventModel');
const bookEvent = require('../models/bookeventModel');
const viewEvent = require('../models/vieweventModel');
const checkJWT = require('../middleware/check-jwt');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
chai.should();


chai.use(chaiHttp);
describe('Events', () => {
describe('/POST post an event', () => {
    let event = new Event(req.body);
    it('it should add a new event', (done) => {
      chai.request(server)
          .post('/api/event/')
          .send(event)
          .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a('object');
                response.body.should.have.property('message').equal('Successfully posted an event');
            done();
          });
        });
    });

    describe('/GET questions', () => {
        it('it should GET all the events', (done) => {
          chai.request(server)
              .get('/api/event/')
              .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.have.property('message').equal('Successful');
                done();
              });
        });
    });

    describe('/POST book an event', () => {
      let bookevent = new bookEvent(req.body);
      it('it should book a new event', (done) => {
        chai.request(server)
            .post('/api/event/book')
            .send(bookevent)
            .end((err, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('object');
                  response.body.should.have.property('message').equal('Successfully booked the event');
              done();
            });
          });
      });
});