const express = require("express");
const youtubeRoute = express.Router();
const YoutubeController = require("../Controller/YoutubeController");

youtubeRoute
  .route("/")
  .get(YoutubeController.index)
  .get(YoutubeController.getById)
  .post(YoutubeController.addYoutube)
  .delete(YoutubeController.deleteAll);

youtubeRoute
  .route("/:youtubesId")
  .get(YoutubeController.getById)
  .put(YoutubeController.updateById)
  .delete(YoutubeController.deleteById);

module.exports = youtubeRoute
