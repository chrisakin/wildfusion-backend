// Connecting to mongoDB
const mongoose = require('mongoose');
require("../models/userModel");
var uri = "mongodb+srv://Chris:lMSdOTtAY8UNzDs6@cluster0.jvopx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(uri, options).then(() =>{
    console.log('Database connection established!');
})
.catch((error) => {
        console.log('Error connecting to Database');
        console.error(error);
});
