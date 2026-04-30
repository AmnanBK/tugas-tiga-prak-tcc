const noteModel = require("../models/noteModels");

const getAllNotes = async (req, res) => {
  try {
    const allDataNotes = await noteModel.findAll();
    res.status(200).json({
      message: "Notes retrieved successfully",
      data: allDataNotes,
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({
      message: "Error retrieving notes",
      error: error.message,
    });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }
    res.status(200).json({
      message: "Note retrieved successfully",
      data: note,
    });
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({
      message: "Error retrieving note",
      error: error.message,
    });
  }
};

const createNote = async (req, res) => {
  const { judul, isi } = req.body;
  const tanggal_dibuat = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD

  try {
    const newNote = await noteModel.create({ judul, isi, tanggal_dibuat });
    res.status(201).json({
      message: "Note created successfully",
      data: newNote,
    });
  } catch (error) {
    console.error('Error creating note:', error);
    res.status(400).json({
      message: "Validation error",
      error: error.message,
    });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { judul, isi } = req.body;

  try {
    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const updatedNote = await noteModel.updateById(id, { judul, isi });
    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error('Error updating note:', error);
    res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await noteModel.findById(id);
    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    const deletedNote = await noteModel.deleteById(id);
    res.status(200).json({
      message: "Note deleted successfully",
      data: deletedNote,
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
