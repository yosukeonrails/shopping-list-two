var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Happy', function() {

    it('should list items on GET', function(done) {

      console.log('Antything');
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                console.log('Antything');
                res.should.have.status(200);
                done();
            });
    });

    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({
                name: 'rice'
            })
            .end(function(err, res) {
              should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('id');
                res.body.name.should.be.a('string');
                res.body.id.should.be.a('number');
                res.body.name.should.equal('rice');
                // storage.items.should.be.a('array');
                // storage.items.should.have.length(4);
                // storage.items[3].should.be.a('object');
                // storage.items[3].should.have.property('id');
                // storage.items[3].should.have.property('name');
                // storage.items[3].id.should.be.a('number');
                // storage.items[3].name.should.be.a('string');
                // storage.items[3].name.should.equal('rice');
                res.should.have.status(201);
                done();
            });
    });

    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/1')
            .send({
                name: 'beans'
            })
            .end(function(err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('should delete an item on delete', function(done) {
        chai.request(app)
            .delete('/items/1')
            .end(function(err, res) {
                res.should.have.status(201);
                done();
            });
    });
});

describe('UnHappy or SAD or Miserable ', function() {


    it('should res 400 when no name', function(done) {
        chai.request(app)
            .post('/items')

           // not sending name
            .end(function(err, res) {

                res.should.have.status(400);
                done();
            });
    });

    it('404 if no item to update', function(done) {
        chai.request(app)
            .put('/items/10')
            .send({
                name: 'beans'
            })
            .end(function(err, res) {

                res.should.have.status(404);
                done();
            });
    });

    it('404 if no item to delete', function(done) {
        chai.request(app)
            .delete('/items/10')
            .end(function(err, res) {

                res.should.have.status(404);
                done();

            });
    });
});
