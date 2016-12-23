const chai = require('chai'),
      chaiHTTP = require('chai-http');


const should = chai.should();

const {app} = require('../server');

chai.use(chaiHTTP);


describe('HTML', function() {

  it('should show static HTML', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
      });
  });
});
