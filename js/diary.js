const addBtn = document.querySelector("#btn-add");
const cancelBtn = document.querySelector("#btn-cancel");

const urlParams = new URLSearchParams(window.location.search);
const diaryId = urlParams.get("id");
const API_URL = '/api/notes';

if (diaryId) {
    // Edit mode: fetch existing data
    fetch(`${API_URL}/${diaryId}`)
        .then(response => {
            if (!response.ok) throw new Error("Note not found");
            return response.json();
        })
        .then(data => {
            document.querySelector("#title").value = data.judul;
            document.querySelector("#content").value = data.isi;
            addBtn.textContent = "Update Diary";
        })
        .catch(err => {
            console.error(err);
            alert("Gagal memuat catatan.");
        });
}

addBtn.addEventListener("click", async () => {
    const judul = document.querySelector("#title").value;
    const isi = document.querySelector("#content").value;

    if (!judul || !isi) {
        alert("Judul dan konten tidak boleh kosong.");
        return;
    }

    const payload = { judul, isi };

    try {
        let response;
        if (diaryId) {
            // Update
            response = await fetch(`${API_URL}/${diaryId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            // Create
            response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        if (response.ok) {
            window.location.href = "../index.html";
        } else {
            alert("Gagal menyimpan catatan.");
        }
    } catch (err) {
        console.error("Error saving note: ", err);
        alert("Terjadi kesalahan.");
    }
});

cancelBtn.addEventListener("click", () => {
    window.location.href = "../index.html";
});
