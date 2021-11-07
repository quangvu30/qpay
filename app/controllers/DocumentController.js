class DocumentController {
  index(req, res) {
    res.render("document", {
      layout: false,
    });
  }
}

module.exports = new DocumentController();
