const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mangoose");

class CourseController {
  //Get /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}).sortable(req), Course.findDeleted({})])
      .then(([courses, deletedCount]) =>
        res.render("me/stored-courses", {
          courses: multipleMongooseToObject(courses),
          deletedCount: deletedCount.filter((course) => course.deleted).length,
        })
      )
      .catch(next);
  }

  //Get /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({ deleted: true })
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(
            courses.filter((course) => course.deleted)
          ),
        })
      )
      .catch(next);
  }
}

module.exports = new CourseController();
