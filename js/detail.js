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
        .then(diary => {
            const title = diary.judul;
            document.title = title;

            const titleContainer = document.querySelector(".title-container");
            const contentContainer = document.querySelector(".content-container");
            const diaryTittle = document.createElement("h1");
            diaryTittle.textContent = title;
            diaryTittle.classList.add("main-title");
            titleContainer.appendChild(diaryTittle);
            
            const diaryContent = document.createElement("p");
            diaryContent.innerHTML = diary.isi.replace(/\n/g, "<br>");
            contentContainer.appendChild(diaryContent);
        })
        .catch(err => {
            console.error(err);
            document.querySelector(".container").innerHTML = "<p>Catatan tidak ditemukan.</p>";
        });
}
