const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mangoose");

class CourseController {
  //Get /courses/:slug
  show(request, response, next) {
    Course.findOne({ slug: request.params.slug })
      .then((course) =>
        response.render("courses/show", { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  //Get /courses/create
  create(req, res, next) {
    res.render("courses/create");
  }
  //Post /courses/store
  async store(req, response, next) {
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

    const course = await new Course(req.body);
    course
      .save()
      .then(() => response.redirect("/me/stored/courses"))
      .catch(next);
  }
  //Get /courses/edit
  edit(request, response, next) {
    Course.findById(request.params.id)
      .then((course) =>
        response.render("courses/edit", {
          course: mongooseToObject(course),
        })
      )
      .catch(next);
  }
  //put /courses/:id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  //delete /courses/:id
  destroy(req, res, next) {
    Course.delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //delete /courses/:id/force
  forceDestroy(req, res, next) {
    Course.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //patch course/:id/restore
  restore(req, res, next) {
    Course.restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //post /courses/handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        Course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
        break;
      default:
        res.json({ message: "Action is invalid !" });
    }
  }
}

module.exports = new CourseController();
