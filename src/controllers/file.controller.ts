const uploads = async (req: any, res) => {
  if (!req.files) {
    return res.status(404).send({
      message: "No file uploaded",
    });
  } else {
    return res.status(200).json({
      message: "Uploaded files successfully",
      data: req.files,
    });
  }
};

export { uploads };
