const Participant = require('../models/Participant');

exports.createParticipant = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newParticipant = new Participant({
      name,
      email,
      password,
    });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getParticipant = async (req, res, next) => {
    try {
      const tournamentId = req.params.tournamentId;
      const participants = await Participant.find({ tournament: tournamentId });
      res.json(participants);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching participants' });
    }
  };

exports.updateParticipant = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const updatedParticipant = await Participant.findByIdAndUpdate(
      req.params.id,
      { name, email, password },
      { new: true }
    );
    res.status(200).json(updatedParticipant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteParticipant = async (req, res) => {
  try {
    await Participant.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({error: 'Internal server error'});
  }
};