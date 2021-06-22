const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
	day: {
		type: Date,
		default: Date.now // default to current date/time
	},
	exercises: [{
		type: {
			type: String,
			trim: true,
			required: "Exercise type is required."
		},
		name: {
			type: String,
			trim: true,
			required: "Exercise name is required."
		},
		duration: {
			type: Number,
			required: "Exercise duration is required."
		},
		weight: {
			type: Number
		},
		reps: {
			type: Number
		},
		sets: {
			type: Number
		},
		distance: {
			type: Number
		}
	}]
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;