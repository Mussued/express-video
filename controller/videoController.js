const { Video } = require("../model/index");

exports.videolist = async (req, res) => {
  let { pageNum = 1, pageSize = 10 } = req.body;

  var videolist = await Video.find()
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)
    .sort({ createAt: -1 })
    .populate("user");
  const getvideoCount = await Video.countDocuments();

  res.status(200).json({ videolist, getvideoCount });
};

exports.createvideo = async (req, res) => {
  var body = req.body;
  body.user = req.user.userinfo._id;

  const videoModel = new Video(req.body);
  try {
    var dbback = await videoModel.save();
    res.status(201).json({ dbback });
  } catch (error) {
    res.status(500).json({ err: error });
  }
};
