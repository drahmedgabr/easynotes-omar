const noteInput = document.getElementById("noteInput");

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
    }

}

function saveNotes() {
    
    const notesString = JSON.stringify(notesArray);

    localStorage.setItem("notes", notesString);

}

function getNotes() {
    
    const notesString = localStorage.getItem("notes");

    if (notesString == null) {
        console.log("notes string null");
    } else {
        notesArray = JSON.parse(notesString);
        console.log(notesArray);
    }
}

getNotes();