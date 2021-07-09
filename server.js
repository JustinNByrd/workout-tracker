const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true });

mongoose.set('debug', true);

app.get("/api/workouts", async (req, res) => {
	try {
		const lastWorkout = await db.Workout.find().sort({day: -1}).limit(1);
		console.log(lastWorkout.totalDuration);
		res.status(200).json(lastWorkout);
	} catch (err) {
		res.status(500).json(err);
	}
});

app.get("/exercise", (req, res) => {
	res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
	res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.post("/api/workouts", async (req, res) => {
	try {
		const addWorkout = await db.Workout.create( req.body );
		res.status(200).json(addWorkout);
	}  catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

app.put("/api/workouts/:id", async (req, res) => {
	try {
		console.dir(req.body);
		const addExercise = await db.Workout.findByIdAndUpdate(req.params.id, { $push: {exercises: req.body }}, { new: true });
		res.status(200).json(addExercise);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

// return workout data from last 7 days
app.get("/api/workouts/range", async (req, res) => {
	try {
		let fromDate = new Date();
		fromDate.setHours(0,0,0,0);
		fromDate -= 7 * 24 * 60 * 60 * 1000;
		fromDate = new Date(fromDate);
		const workoutData = await db.Workout.find( {"day": {$gte: fromDate}});
		res.status(200).json(workoutData);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

app.listen(PORT, () => {
	console.log(`App running on port ${PORT}!`);
});
