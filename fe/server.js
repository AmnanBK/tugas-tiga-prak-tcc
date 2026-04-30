const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

// Serve static files from the root of the fe directory
// Ini akan otomatis melayani index.html untuk rute "/"
app.use(express.static(__dirname));

// Opsional: Jika Anda ingin fallback ke index.html untuk rute yang tidak ditemukan
// (Biasanya untuk aplikasi SPA), gunakan sintaks Express 5 berikut:
app.get('*splat', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Frontend server running on port ${PORT}`);
});
