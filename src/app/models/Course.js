const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const slug = require("mongoose-slug-updater");
// const AutoIncrement = require("mongoose-sequence")(mongoose);
// const AutoIncrement = require("mongoose-auto-increment");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

// const connection = mongoose.createConnection(
//   "mongodb://127.0.0.1:27017/f8_education"
// );

// AutoIncrement.initialize(connection);

const CourseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    image: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    // _id: false,
    timestamps: true,
  }
);

//custom query helper
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isInvalidType = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isInvalidType ? req.query.type : "desc",
    });
  }
  return this;
};

// add plugin
mongoose.plugin(slug);

// CourseSchema.plugin(AutoIncrement.plugin, {
//   model: "f8_education",
//   field: "_id",
//   startAt: 1,
//   incrementBy: 1,
// });
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", CourseSchema, "course");
