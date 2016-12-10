var app = require("./server");
var request = require('supertest');
var expect = require('chai').expect;

describe('[PLAYERS]', function(){
    it('should get all the players', function(done){
        request(app)
            .get('/players')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, data){
                expect(data.body).to.be.an('array');
                done();
            });
    });
});