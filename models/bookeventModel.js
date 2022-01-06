const mongoose = require('mongoose');          //Placing mongoose package in a variable mongoose
const Schema = mongoose.Schema;                // Assigning mongoose schema to variable 

//creating EventSchema
const BookEventSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  created: { type: Date, default: new Date() }
});

//Exporting the Event schema to reuse  
module.exports = mongoose.model('BookEvent', BookEventSchema);
