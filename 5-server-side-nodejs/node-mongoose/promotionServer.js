var mongoose = require('mongoose'),
    assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new promotion
    var newPromotion = Promotions({
        name: 'Weekend Grand Buffet',
        image: 'images/buffet.png',
        label: 'New',
        price: '19.99',
        description: 'Featuring . . .'
    });

    // save the promotion
    newPromotion.save(function (err) {
        if (err) throw err;
        console.log('Promotion created!');

        // get all the promotions
        Promotions.find({}, function (err, promotions) {
            if (err) throw err;

            // object of all the promotions
            console.log(promotions);
                        db.collection('promotions').drop(function () {
                db.close();
            });
        });
    });
});