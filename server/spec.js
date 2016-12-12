var app = require("./server");
var request = require('supertest');
var chai_expect = require('chai').expect;

describe('[PLAYERS]', function(){
    it('should get all the players', function(done){
        request(app)
            .get('/players')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                chai_expect(res.body).to.be.an('array');
                done();
            })
    });

    it('should create a player', function(done){
        var player =  {name: "Lionel Messi", age: 28, club: "Barcelona F.C"};
        request(app)
            .post('/players')
            .send(player)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res){
                chai_expect(res.body).to.be.an('object');
                done();
            })
    }); 

    it('should make a player then delete that player', function(done){
        request(app)
        .post('/players')
        .send({name: 'Adebayo Akinfenwa', age: 34, club: 'Wycombe Wanderers F.C'})
        .set('Accept', 'application/json')
        .end(function(err, res){
            var player = res.body;
            request(app)
                .delete('/players/' + player.id)
                .end(function(err, resp){
                    chai_expect(resp.body).to.eql(player);
                    done();
                });
        });
    });

    it('should make a player then update that player', function(done){
        request(app)
            .post('/players')
            .send({name: "Paul Pogba", age: 24, club: "Manchester United F.C"})
            .set('Accept', 'application/json')
            .end(function(err, res){
                var player = res.body;
                request(app)
                    .put('/players/' + player.id)
                    .send({name: "Luke Shaw"})
                    .end(function(err, data){
                        chai_expect(data.body.name).to.equal("Luke Shaw");
                        done();
                    });
            })
    });

    it('should get one single player', function(done){
        request(app)
            .get('/players/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                chai_expect(res.body).to.be.an('object');
                done();
            })
    });
});