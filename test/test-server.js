global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({
                name: 'Broad beans'
            }, {
                name: 'Tomatoes'
            }, {
                name: 'Peppers'
            }, function() {
                done();
            });
        });
    });


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
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('rice');
                chai.request(app)
                    .get('/items')
                    .end(function(err, res) {
                        res.body.should.be.a('array');
                        res.body.should.have.length(4);
                        // res.body.should.be.a('object');

                        res.body[3]._id.should.be.a('string');

                        res.body[3].name.should.be.a('string');
                        res.body[3].name.should.equal('rice');


                        done();
                    });

            });
    });



    it('should edit an item on put', function(done) {
        chai.request(app)
            .get('/items/')
            .end(function(err ,res ) {

                chai.request(app)
                    .put('/items/'+ res.body[0]._id)
                    .send({
                        name: 'beans'
                    })
                    .end(function(err, res) {
                        res.should.have.status(200);
                        chai.request(app)
                            .get('/items/')
                            .end(function(err , res) {

                                res.body.should.be.a('array');
                                res.body.should.have.length(4);
                                // res.body.should.be.a('object');

                                res.body[0]._id.should.be.a('string');

                                res.body[0].name.should.be.a('string');
                                res.body[0].name.should.equal('beans');
                                      done();
                            });

                    });
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

    it('should show 404', function(done) {
        chai.request(app)
            .get('/blaaaaah')
            .end(function(err, res) {
                res.should.have.status(404);
                done();
            });
    });





    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});
