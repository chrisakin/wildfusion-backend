process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const User = require('../models/userModel');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');


chai.should();
chai.use(chaiHttp);

describe('Users', () => {
// // /*
// //   * Test the /GET route
// //   */
  // describe('/GET user', () => {
  //     it('it should GET one user', (done) => {
  //       chai.request(server)
  //           .get('/api/auth/oneuser')
  //           .end((err, response) => {
  //                 response.should.have.status(200);
  //                 response.body.should.have.property('message').equal('Successful');
  //             done();
  //           });
  //     });
  // });

// * Test the /signup route
//   */
  describe('/POST signup user', () => {
      it('it should Signup a user', (done) => {
          let user = {
              email: "superadmin@eventx.ng",
              name: "Admin",
              password: "superadmin",
          }
        chai.request(server)
            .post('/api/auth/signup')
            .send(user)
            .end((err, response) => {
                  response.should.have.status(200);
                  response.body.should.be.a('object');
                  response.body.should.have.property('token')
                  response.body.should.have.property('message').equal('SignUp Successful');
              done();
            });
      });

  });


  // * Test the /login route
//   */
// describe('/POST user', () => {
//     it('it should Login a user if authenticated', (done) => {
//         let user = {
//             email: "xxxx@gmail.com",
//             password: "xxxxyyyyyzzzz",
//         }
//       chai.request(server)
//           .post('/api/auth/login')
//           .send(user)
//           .end((err, response) => {
//               if (response.status === 200){
//                 response.should.have.status(200);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('token')
//                 response.body.should.have.property('message').equal('Login Successful');
//               } else if (response.status === 404) {
//                 response.should.have.status(404);
//                 response.body.should.be.a('object');
//                 response.body.should.have.property('success').equal(false);
//                 response.body.should.have.property('message').equal('Authenticated failed, User not found');
//               }
                
//             done();
//           });
//     });

//   });
});
