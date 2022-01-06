const Event = require('../models/eventModel');
const Bookevent = require('../models/bookeventModel')
const Viewevent = require('../models/vieweventModel')
const async = require('async');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5c10750dbe16d4",
    pass: "7cb4e406ee30ba"
  }
});


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

const bookEvents = ((req, res, next) => {
  Bookevent.findOne({eventId: req.body.eventId, email: req.body.email }, (err, event) => {
    if (event) {
      res
      .status(400)
      .json({
        success: false,
        message: 'That email exists already'
      });
    } else {
      async.waterfall([
        function(callback) {
          Event.findOne({ _id: req.body.eventId}, (err, singleevent) => {
            if (singleevent) {
              callback(err, singleevent);
            }
          });
        },
        function(singleevent) {
          let bookevent = new Bookevent(req.body)
          singleevent.bookings.push(bookevent._id);
          singleevent.save();
          bookevent.save();
          res.json({
            success: true,
            message: "Successfully booked the event"
          });
        const email = req.body.email
        const name = req.body.name
        const eventname = req.body.eventname
        const eventdate = req.body.eventdate.toLocaleString()
        const eventlocation = req.body.eventlocation
        htmls = `
        Dear ${name},
      <br>
     <br>
      Your Event has been booked successfully <br><br>
      Kindly find the event details below. <br>
      Event Name : ${eventname}, <br>
      Event Date : ${eventdate}, <br>
      Event Address: ${eventlocation}
      <br> <br>
          Best Regards
          EVENT XYX
    `
    let mailOptions = {
      from:`EVENT XYX <chrisfemide@gmail.com>`,
      to: email,
      subject: "EVENT XYX Confirmation Mail",
     html : htmls,
    };
    transporter.sendMail(mailOptions, function (error, resp) {
      if (error) {
          console.log(error); 
          res.end('error');
        } else {
           succeed = true
          console.log('Message sent: ', resp);
        }
        if (succeed === true) {
          res.json({
            success: true,
          }); 
        }
  });
        }
        
      ]);
    }
   });
})

const viewEvents = ((req, res, next) => {
  async.waterfall([
    function(callback) {
      Event.findOne({ _id: req.body.viewId}, (err, singleevent) => {
        if (singleevent) {
          callback(err, singleevent);
        }
      });
    },
    function(singleevent) {
      let viewevent = new Viewevent(req.body)
      singleevent.views.push(viewevent._id);
      singleevent.save();
      viewevent.save();
      res.json({
        success: true,
      });
    }
  ]);
})

  const getEvents = ((req, res, next) => {
    if (req.query.filter){
      var filter = req.query.filter
      Event.find({eventtype: filter})
      .populate('bookings')
      .populate('views')
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
    }
   else if(req.query.sort) {
    var sort = req.query.sort
    Event.find({})
    .sort({eventdate: sort})
    .populate('bookings')
    .populate('views')
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
  } else {
    Event.find({})
    .sort({})
    .populate('bookings')
    .populate('views')
    .then((events) => res.json({
        success: true,
        events: events.reverse(),
        message: "Successful"
    }))
    .catch((err) => {
      console.log("No events found", err);
      res.status(400)
      .json({ 
          error: "Some error occured"
      });
    });
  }
  })

  const editEvents = ((req, res, next) => {
    Event.findById({ _id: req.params.id  },  (err, event) => {
      Bookevent.find({ eventId: req.params.id  },  (err, bookevent) => {
         var bookNumber = bookevent.length
      if (err) return next(err);
      if (Number(event.eventspace) > Number(req.body.eventspace)){
        res.json({
          success: false,
          message: 'You can only increase the event'
        }); 
      } else if(bookNumber > Number(req.body.eventspace)){
        res.json({
          success: false,
          message: `You cannot reduce the eventspace below ${bookNumber}`
        });
      }
      else if(bookNumber && req.body.iscancelled === true){
        res.json({
          success: false,
          message: `You cannot cancel a booked event`
        });
      } else {
      if (req.body.enddate) event.enddate = req.body.enddate;
      if (req.body.eventdate) event.eventdate = req.body.eventdate;
      if (req.body.eventspace) event.eventspace = req.body.eventspace;
      if (req.body.iscancelled) event.iscancelled = req.body.iscancelled;
      event.save();
      res.json({
        success: true,
        message: 'Successfully edited your event'
      });
      }
    });
    });
  })

    module.exports = {
    postEvents,
    getEvents,
    bookEvents,
    editEvents,
    viewEvents
   }