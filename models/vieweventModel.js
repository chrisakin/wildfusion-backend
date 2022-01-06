const mongoose = require('mongoose');          //Placing mongoose package in a variable mongoose
const Schema = mongoose.Schema;                // Assigning mongoose schema to variable 

//creating EventSchema
const ViewEventSchema = new Schema({
  text: { type: String, required: true },
  viewId: {
    type: Schema.Types.ObjectId,
    ref: "Event"
  },
  created: { type: Date, default: new Date() }
});

//Exporting the Event schema to reuse  
module.exports = mongoose.model('ViewEvent', ViewEventSchema);
