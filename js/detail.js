const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const API_URL = '/api/notes';

if (!id) {
    window.location.href = "../index.html";
} else {
    fetch(`${API_URL}/${id}`)
        .then(res => {
            if(!res.ok) throw new Error("Not found");
            return res.json();
        })
        .then(resData => {
            const note = resData.data;
            const title = note.judul;
            document.title = title;

            const titleContainer = document.querySelector(".title-container");
            const contentContainer = document.querySelector(".content-container");
            const noteTittle = document.createElement("h1");
            noteTittle.textContent = title;
            noteTittle.classList.add("main-title");
            titleContainer.appendChild(noteTittle);
            
            const noteContent = document.createElement("p");
            noteContent.innerHTML = note.isi.replace(/\n/g, "<br>");
            contentContainer.appendChild(noteContent);
        })
        .catch(err => {
            console.error(err);
            document.querySelector(".container").innerHTML = "<p>Catatan tidak ditemukan.</p>";
        });
}
