// models/db.js

const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: {type: String, require: true},
  pubDate: {type: Date, require: true},
  choices: [{
    choiceText: String,
    votes: {
      type: Number,
      require: true,
      default: 0
    }
  }]
}, {
  //Set MongoDB collection name
  collection: 'poll'
});

pollSchema.methods.wasPublishedRecently = () => {
  const now = new Date();
  const delta = Math.abs(now.getTime() - this.pubDate.getTime());
  
  // If dif < milliseconds in a day
  return delta <= (60 * 60 * 24 * 1000);
}

exports.pollSchema = pollSchema;

// register model
mongoose.model('Poll', pollSchema);
