var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var http = require('http');
var pollsdb = require('../models/db');

// Configure appropriately
mongoose.connect('mongodb://localhost/pollsdb');

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'Database connection error:'));
conn.once('open', function callback() { console.log("Database connected.") });

const Poll = conn.model("Poll", pollsdb.pollSchema);

router.get('/', function(req, res, next) {
  Poll.find().sort('-pubDate').limit(5).exec(function(err, polls) {
    if (err)
      // Pass it along to the next error-handling middleware to deal with
      next("Uh oh! Something went wrong when fetching polls from the database.");
    else if (polls) {
      console.log(polls);
      let questions = new Array();
      for (let i = 0; i < polls.length; i++) {
        questions.push(polls[i].question);
      }
      // Make a comma-separated string of questions
      result = questions.join(", ");
      console.log(result);
      res.render('pollIndex', { title: "Latest Polls", latest_poll_list: polls });
    }
    else {
      res.send("No polls found :(");
    }
  });
});

router.get('/:poll_id', function(req, res, next) {
  const poll_id = req.params.poll_id;

  Poll.findById(poll_id).exec((err, poll) => {
      if (err) {
        next("Something went wrong");
      }
      else if (poll) {
        res.render('pollDetail', {poll: poll});
      }
      else {
        next ();
      }
  });
});

router.get('/:poll_id/results', function(req, res) {
  const poll_id = req.params.poll_id
  res.send("You're looking at the results of poll " + poll_id);
});

router.get('/:poll_id/vote', function(req, res) {
  const poll_id = req.params.poll_id;
  res.send("You're voting on poll " +  poll_id);
});

router.post('/:poll_id/vote', function(req, res) {
  const poll_id = req.params.poll_id;
  res.send("You're voting on poll " +  poll_id);
});

module.exports = router;