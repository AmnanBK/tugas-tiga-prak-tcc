require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize, Note } = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '/')));

// API Routes

// Get all notes
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.findAll({
            order: [['tanggal_dibuat', 'DESC']]
        });
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get note by id
app.get('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByPk(id);
        if (!note) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(note);
    } catch (error) {
        console.error('Error fetching note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create note
app.post('/api/notes', async (req, res) => {
    try {
        const { judul, isi } = req.body;
        const tanggal_dibuat = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
        
        const newNote = await Note.create({
            judul,
            isi,
            tanggal_dibuat
        });
        
        res.status(201).json(newNote);
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update note
app.put('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { judul, isi } = req.body;
        
        const [affectedRows] = await Note.update(
            { judul, isi },
            { where: { id } }
        );
        
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note updated successfully' });
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete note
app.delete('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await Note.destroy({
            where: { id }
        });
        
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Sync database and start server
sequelize.sync().then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Unable to sync the database:', err);
});
