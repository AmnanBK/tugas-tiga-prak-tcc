const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./database/db');

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
        const [rows] = await db.query('SELECT * FROM notes ORDER BY tanggal_dibuat DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get note by id
app.get('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM notes WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json(rows[0]);
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
        const [result] = await db.query('INSERT INTO notes (judul, isi, tanggal_dibuat) VALUES (?, ?, ?)', [judul, isi, tanggal_dibuat]);
        res.status(201).json({ id: result.insertId, judul, isi, tanggal_dibuat });
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
        const [result] = await db.query('UPDATE notes SET judul = ?, isi = ? WHERE id = ?', [judul, isi, id]);
        
        if (result.affectedRows === 0) {
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
        const [result] = await db.query('DELETE FROM notes WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
