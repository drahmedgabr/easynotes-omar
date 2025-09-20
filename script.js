const noteInput = document.getElementById("noteInput");
const emptyNotes = document.getElementById("emptyNotes");
const notesDiv = document.getElementById("notesDiv");

let notesArray = [];

function addNote() {
    
    const newNote = noteInput.value;

    if(newNote == ""){
        alert("Please enter you note");
    } else {
        notesArray.push(newNote);
        noteInput.value = "";
        console.log(notesArray);
        saveNotes();
        getNotes();
    }

}

function saveNotes() {
    
    const notesString = JSON.stringify(notesArray);

    localStorage.setItem("notes", notesString);

}

function getNotes() {

    hideAll();

    notesDiv.innerHTML = "";
    
    const notesString = localStorage.getItem("notes");

    if (notesString == null) {
        console.log("notes string null");
    } else {
        notesArray = JSON.parse(notesString);
    }

    if (notesArray.length == 0) {
        emptyNotes.style.display = "block";

    } else {
        notesDiv.style.display = "block";

        for (let index = 0; index < notesArray.length; index++) {
            const element = notesArray[index];
            
            const noteDiv = document.createElement("div");
            noteDiv.className = "note";

            const noteText = document.createElement("p");
            noteText.innerText = element;

            const deleteIcon = document.createElement("i");
            deleteIcon.className = "bi bi-trash3-fill";

            deleteIcon.addEventListener('click', function () {
                const confirmMessage = confirm("Are you sure to delete this note?");
                if (confirmMessage) {
                    notesArray.splice(index, 1);
                    saveNotes();
                    getNotes();
                }
            });

            noteDiv.appendChild(noteText);
            noteDiv.appendChild(deleteIcon);

            notesDiv.appendChild(noteDiv);

        }

    }
}

function hideAll() {
    
    const innerDivs = document.getElementsByClassName("innerDiv");

    for (let index = 0; index < innerDivs.length; index++) {
        const element = innerDivs[index];
        
        element.style.display = "none";
    }

}

getNotes();