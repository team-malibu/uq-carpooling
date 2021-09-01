const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '726047d480008b53a15b452e',
  database: 'mysql'
});

// Must match up with /etc/nginx/frameworks-available/nodejs.conf!
const port = 8081;

// Required for running behind nginx
app.set('trust proxy', 'loopback');
app.get('/', (req, res) => {
   res.sendFile('/var/www/htdocs/index.html');
});


//////////////////////////// GET API METHODS /////////////////////////////////
// get all users
app.get("/db/users", (req, res) => {
  db.query("SELECT * FROM `cp-user`", (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get a unique user with given student_id
app.get("/db/users/user", (req, res) => {
  const student_id = req.body.student_id;
  db.query("SELECT * FROM `cp-user` WHERE student_id = ?", [student_id], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all courses taken by a person with unique student_id
app.get("/db/users/user/courses", (req, res) => {
  const student_id = req.body.student_id;
  db.query("SELECT c.* FROM `cp-course` AS c, `cp-taken-course` AS tc WHERE tc.student_id = ? AND c.code = tc.course_code", [student_id], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all trips
app.get("/db/trips", (req, res) => {
  db.query("SELECT * FROM `cp-trip`", (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all trips where a person with unique driver_id was the driver
app.get("/db/trips/driver", (req, res) => {
  const driver_id = req.body.driver_id;
  db.query("SELECT * FROM `cp-trip` WHERE driver_id = ?", [driver_id], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all trips where a person with unique passenger_id was the passenger
app.get("/db/trips/passenger", (req, res) => {
  const passenger_id = req.body.passenger_id;
  db.query("SELECT t.* FROM `cp-trip` AS t, `cp-passenger-trip` AS pt WHERE pt.passenger_id = ? AND t.trip_id = pt.trip_id", [passenger_id], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all ratings and comments given to a driver with unique driver_id
app.get("/db/ratings/driver", (req, res) => {
  const driver_id = req.body.driver_id;
  db.query("SELECT pt.rating, pt.comments FROM `cp-passenger-trip` AS pt, `cp-trip` AS t WHERE t.driver_id = ? AND pt.trip_id = t.trip_id", [driver_id], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all ratings and comments given by a passenger with unique passenger_id
app.get("/db/ratings/passenger", (req, res) => {
  const passenger_id = req.body.passenger_id;
  db.query("SELECT rating, comments FROM `cp-passenger-trip` WHERE passenger_id = ?", [passenger_id], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all courses
app.get("/db/courses", (req, res) => {
  db.query("SELECT * FROM `cp-course`", (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get a course with unique course code
app.get("/db/courses/course", (req, res) => {
  const code = req.body.code;
  db.query("SELECT * FROM `cp-course` WHERE code = ?", code, (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

// get all users taking a course with unique course_code
app.get("/db/courses/course/students", (req, res) => {
  const course_code = req.body.course_code;
  db.query("SELECT u.* FROM `cp-user` AS u, `cp-taken-course` AS tc WHERE tc.course_code = ? AND u.student_id = tc.student_id", [course_code], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});


//////////////////////////// POST API METHODS /////////////////////////////////
// add a new user
app.post('/db/users/add-user', function (req, res, next) {
  const student_id = req.body.student_id;
  const email = req.body.email;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const average_rating = req.body.average_rating;
  const password = req.body.password;
  db.query(
      "INSERT INTO `cp-user` (student_id, email, first_name, last_name, average_rating, password) VALUES (?,?,?,?,?,?)",
      [student_id, email, first_name, last_name, average_rating, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
});

// add a new trip
app.post('/db/trips/add-trip', function (req, res, next) {
  const trip_id = req.body.trip_id;
  const date = req.body.date;
  const start_time = req.body.start_time;
  const end_time = req.body.end_time;
  const driver_id = req.body.driver_id;
  db.query(
      "INSERT INTO `cp-trip` (trip_id, date, start_time, end_time, driver_id) VALUES (?,?,?,?,?)",
      [trip_id, date, start_time, end_time, driver_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
});

// add a new course
app.post('/db/courses/add-course', function (req, res, next) {
  const course_code = req.body.course_code;
  const name = req.body.name;
  db.query(
      "INSERT INTO `cp-course` (code, name) VALUES (?,?)",
      [course_code, name],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
});

// add a new taken course by a student
app.post('/db/courses/add-taken-course', function (req, res, next) {
  const student_id = req.body.student_id;
  const course_code = req.body.course_code;
  db.query(
      "INSERT INTO `cp-taken-course` (student_id, course_code) VALUES (?,?)",
      [student_id, course_code],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
});

// add a new trip taken by a passenger
app.post('/db/trips/add-passenger-trip', function (req, res, next) {
  const trip_id = req.body.trip_id;
  const passenger_id = req.body.passenger_id;
  const rating = req.body.rating;
  const comments = req.body.comments;
  db.query(
      "INSERT INTO `cp-passenger-trip` (trip_id, passenger_id, rating, comments) VALUES (?,?,?,?)",
      [trip_id, passenger_id, rating, comments],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
});


//////////////////////////// PUT API METHODS /////////////////////////////////
// update the average rating of a user
app.put("/db/users/update-rating", (req, res) => {
  const student_id = req.body.student_id;
  const average_rating = req.body.average_rating;
  db.query(
    "UPDATE `cp-user` SET average_rating = ? WHERE student_id = ?",
    [average_rating, student_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


//////////////////////////// DELETE API METHODS /////////////////////////////////
// delete a user
app.delete("/db/users/delete", (req, res) => {
  const student_id = req.body.student_id;
  db.query("DELETE FROM `cp-user` WHERE student_id = ?", student_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete a trip
app.delete("/db/trips/delete", (req, res) => {
  const trip_id = req.body.trip_id;
  db.query("DELETE FROM `cp-trip` WHERE trip_id = ?", trip_id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete a passenger trip record
app.delete("/db/trips/passengers/delete", (req, res) => {
  const trip_id = req.body.trip_id;
  const passenger_id = req.body.passenger_id;
  db.query("DELETE FROM `cp-passenger-trip` WHERE passenger_id = ? AND trip_id = ?", [passenger_id, trip_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete a course
app.delete("/db/courses/delete", (req, res) => {
  const code = req.body.code;
  db.query("DELETE FROM `cp-course` WHERE code = ?", code, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete a course from being taken by a student
app.delete("/db/users/user/courses/delete", (req, res) => {
  const student_id = req.body.student_id;
  const course_code = req.body.course_code;
  db.query("DELETE FROM `cp-taken-course` WHERE student_id = ? AND course_code = ?", [student_id, course_code], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
