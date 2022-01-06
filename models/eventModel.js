const mongoose = require('mongoose');          //Placing mongoose package in a variable mongoose
const Schema = mongoose.Schema;                // Assigning mongoose schema to variable 

//creating EventSchema
const EventSchema = new Schema({
  views: [{ type: Schema.Types.ObjectId, ref: 'ViewEvent'}],
  bookings: [{ type: Schema.Types.ObjectId, ref: 'BookEvent'}],
  name: { type: String, required: true },
  location: { type: String, required: true },
  eventdate: { type: Date, required: true },
  enddate: { type: String, required: true },
  eventtype: { type: String, required: true },
  eventprice: { type: String },
  eventspace: { type: String },
  posterImage: { type: String, required: true },
  iscancelled: {type: Boolean, default: false, required: true},
  created: { type: Date, default: new Date() }
});

//Exporting the Event schema to reuse  
module.exports = mongoose.model('Event', EventSchema);
