const express = require("express");
const mongoose  = require("mongoose");
const app = express();
const morgan = require("morgan"); // fixed typo from "morgen" to "morgan"
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error")
//import route
 const authRoutes = require("./routes/authRoutes")
 const userRoutes = require("./routes/userRoutes")
 const jobTypeRoutes = require("./routes/jobsTypeRoutes")
 const jobRoutes = require("./routes/jobsRoutes")
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(morgan('dev'));  
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());  
app.use(authRoutes);
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

 app.use('/api', authRoutes);
 app.use('/api', userRoutes);
 app.use('/api', jobTypeRoutes);
 app.use('/api', jobRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
