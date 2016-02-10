var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

/*BlogPosts.find({}, function(err, docs){
        res.render('contact', { docs: docs});
    });*/
  res.render('contact');
});

module.exports = router;
