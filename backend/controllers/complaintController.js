const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
  try {
    const { title, description, images } = req.body;
    const complaint = new Complaint({
      title,
      description,
      images: images || [],
      user: req.user.id,
    });
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).populate(
      "assignedTo",
      "name email",
    );
    res.json({ complaints });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("user", "name email")
      .populate("assignedTo", "name email");
    res.json({ complaints });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.assignComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const { agentId } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { assignedTo: agentId, status: "In Progress" },
      { new: true },
    );
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

exports.addMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const complaint = await Complaint.findById(id);
    complaint.messages.push({ sender: req.user.id, text });
    await complaint.save();
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};
