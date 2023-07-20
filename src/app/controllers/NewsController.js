class NewsController {
  //GET /news
  index(request, response) {
    response.render("news");
  }

  //GET /news/:slug
  show(request, response) {
    response.send("news detail");
  }
}

module.exports = new NewsController();
