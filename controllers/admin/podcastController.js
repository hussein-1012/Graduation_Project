const Podcast = require("../../models/Podcast");
const httpStatus = require('../../utils/httpStatus');

let addPodcast = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    if (!title || !url) {
      return res.status(400).json({
        status: httpStatus.FAIL,
        message: "Title and URL are required"
      });
    }

    const podcast = await Podcast.create({ title, url, description });
    res.status(201).json({
      status: httpStatus.SUCCESS,
      message: "Podcast added successfully",
      data: podcast
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

let removePodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findByIdAndDelete(req.params.id);
    if (!podcast) {
      return res.status(404).json({
        status: httpStatus.FAIL,
        message: "Podcast not found"
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "Podcast removed successfully"
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

let getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.find();
    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: podcasts
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

let getPodcast = async (req, res) => {
  try {
    const podcast = await Podcast.findById(req.params.id);
    if (!podcast) {
      return res.status(404).json({
        status: httpStatus.FAIL,
        message: "Podcast not found"
      });
    }

    res.status(200).json({
      status: httpStatus.SUCCESS,
      data: podcast
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatus.ERROR,
      message: error.message
    });
  }
};

module.exports = {
  addPodcast,
  removePodcast,
  getAllPodcasts,
  getPodcast
};
