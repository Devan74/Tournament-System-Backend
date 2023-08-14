const Tournament = require('../models/Tournament');

exports.createTournament = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;
    const newTournament = new Tournament({
      name,
      startDate,
      endDate,
      participants: [],
      status: 'Pending', // initial status
    });
    await newTournament.save();
    res.status(201).json(newTournament);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getParticipantsByTournament = async (req, res, next) => {
  try {
    const tournamentId = req.params.tournamentId;
    const participants = await Participant.find({ tournament: tournamentId });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching participants' });
  }
};

exports.updateTournament = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;
    const updatedTournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      { name, startDate, endDate },
      { new: true }
    );
    res.status(200).json(updatedTournament);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTournament = async (req, res) => {
  try {
    await Tournament.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTournament = async (req, res) => {
  try {
    const tournaments = await Tournament.findById(req.params.id).populate('participants');
    if (!tournaments) {
      return res.status(404).json({ error: 'Tournament not found' });
    }
    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
