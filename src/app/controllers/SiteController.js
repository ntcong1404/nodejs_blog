const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mangoose");

class SiteController {
  //GET /
  index(request, response, next) {
    Course.find({})
      .then((courses) => {
        response.render("home", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  //GET /search
  search(request, response) {
    response.render("search");
  }
}

module.exports = new SiteController();
