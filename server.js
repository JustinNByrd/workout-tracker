const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// set userNewUrlParser to true to not use depricated URL string parser
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.get("/api/workouts", async (req, res) => {
	try {
		const lastWorkout = await db.Workout.find().sort({day: -1}).limit(1);
		res.json(lastWorkout);
	}
	catch (err) {
		res.json(err);
	}
});

app.get("/exercise", (req, res) => (
	res.sendFile(path.join(__dirname, "public/exercise.html"))
));

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});