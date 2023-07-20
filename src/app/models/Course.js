const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const slug = require("mongoose-slug-updater");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const Course = new Schema(
  {
    _id: { type: Number },
    name: { type: String, required: true },
    description: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);

// add plugin
mongoose.plugin(slug);

Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: "all" });

module.exports = mongoose.model("Course", Course, "course");
