const Event = require('../models/eventModel');

const postEvents = ((req, res, next) => {
    let event = new Event(req.body);
    event.posterImage = req.file.location,
  event.save()
  .then(() => res.json({
    success: true,
    message: "Successfully posted an event"
  }))
  .catch((err) => {
        console.log("Unable to save event in db", err);
        res.status(400).json({ error: "Error saving your events" });
   });
})

  const getEvents = ((req, res, next) => {
    Event.find()
    .sort({date: "desc"})
    .then((events) => res.json({
        success: true,
        events: events,
        message: "Successful"
    }))
    .catch((err) => {
      console.log("No events found", err);
      res.status(400)
      .json({ 
          error: "Some error occured"
      });
    });
  })

    module.exports = {
    postEvents,
    getEvents,
   }