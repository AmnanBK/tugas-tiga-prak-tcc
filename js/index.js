const API_URL = '/api/notes';

async function loadData() {
	try {
		const response = await fetch(API_URL);
		if (!response.ok) throw new Error('Failed to fetch data');
		const responseData = await response.json();
		createCards(responseData.data);
	} catch (error) {
		console.error("Error loading data:", error);
	}
}

function createCards(data) {
	const cardContainer = document.querySelector(".card-container");
    cardContainer.innerHTML = "";

	data.forEach(({ id, judul, isi, tanggal_dibuat }) => {
		const wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");

		const frontFace = document.createElement("div");
		frontFace.classList.add("card", "front-face");

		const cardTitle = document.createElement("h3");
		cardTitle.classList.add("card-title");
		cardTitle.textContent = judul;

		frontFace.appendChild(cardTitle);

		const backFace = document.createElement("div");
		backFace.classList.add("card", "back-face");

		const cardContent = document.createElement("p");
		cardContent.classList.add("card-content");
        
        let contentDisplay = isi;
		if (contentDisplay.length > 110) {
			contentDisplay = contentDisplay.substring(0, 110) + "...";
		}
		cardContent.textContent = contentDisplay;
		backFace.appendChild(cardContent);

		const cardFooter = document.createElement("div");
		cardFooter.classList.add("card-footer");

		const createdDate = document.createElement("span");
        const dateObj = new Date(tanggal_dibuat);
		createdDate.textContent = dateObj.toLocaleDateString();

		cardFooter.appendChild(createdDate);

		const actionBtns = document.createElement("div");
		actionBtns.classList.add("action-btn");

		const editLink = document.createElement("a");
		const editIcon = document.createElement("i");
		editIcon.classList.add("bi", "bi-pencil-square");
		editLink.appendChild(editIcon);

		const deleteLink = document.createElement("a");
		deleteLink.setAttribute("id", `delete-${id}`);
		const deleteIcon = document.createElement("i");
		deleteIcon.classList.add("bi", "bi-x-square");
		deleteLink.appendChild(deleteIcon);

		actionBtns.appendChild(editLink);
		actionBtns.appendChild(deleteLink);

		cardFooter.appendChild(actionBtns);
		backFace.appendChild(cardFooter);

		wrapper.appendChild(frontFace);
		wrapper.appendChild(backFace);

		cardContainer.appendChild(wrapper);

		wrapper.addEventListener("click", (e) => {
			e.preventDefault();
			window.location.href = `html/detail.html?id=${id}`;
		});

		deleteLink.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
            if(confirm("Apakah Anda yakin ingin menghapus catatan ini?")) {
			    deleteNote(id);
            }
		});

		editLink.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			window.location.href = `html/note.html?id=${id}`;
		});
	});
}

async function deleteNote(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            loadData();
        } else {
            console.error('Failed to delete note');
        }
    } catch (error) {
        console.error('Error deleting note:', error);
    }
}

loadData();
