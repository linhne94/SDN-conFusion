const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const youtubeSchema = new mongoose.Schema({
  kind: String,
  etag: String,
  nextPageToken: String,
  regionCode: String,
  pageInfo: {
    totalResults: Number,
    resultsPerPage: Number,
  },
  items: [
    {
      kind: String,
      etag: String,
      idItem: {
        kind: String,
        channelId: String,
        videoId: String,
      },
    },
  ],
});
const Youtube = mongoose.model('Youtubes', youtubeSchema )
module.exports = Youtube
