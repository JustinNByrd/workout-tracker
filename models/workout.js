const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
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
			type: Number
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

workoutSchema.set('toObject', { virtuals: true });
workoutSchema.set('toJSON', { virtuals: true });

workoutSchema.virtual('totalDuration').get(function() {
	return this.exercises.reduce((total, current) => {
		total += current.duration;
		return total;
	}, 0);
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
