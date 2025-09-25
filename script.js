const noteInput = document.getElementById("noteInput");
const emptyNotes = document.getElementById("emptyNotes");
const notesDiv = document.getElementById("notesDiv");
const loginDiv = document.getElementById("loginDiv");
const userAccountDiv = document.getElementById("userAccountDiv");
const welcomeH3 = document.getElementById("welcomeH3");



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

function showProfileSection() {
    hideAll();
    const userId = localStorage.getItem("userId");
    if (userId == null) {
        loginDiv.style.display = "block";
    } else {
        const userName = localStorage.getItem("userName");
        welcomeH3.innerText = `Welcome ${userName}`;
        userAccountDiv.style.display = "block";
    }
    
}

function hideAll() {
    
    const innerDivs = document.getElementsByClassName("innerDiv");

    for (let index = 0; index < innerDivs.length; index++) {
        const element = innerDivs[index];
        
        element.style.display = "none";
    }

}

async function loginUser() {
    const loginEmailInput = document.getElementById("loginEmailInput");
    const loginPasswordInput = document.getElementById("loginPasswordInput");
    if(loginEmailInput.value == "" || loginPasswordInput.value == ""){
        alert("Please enter email and passwor to login");
    } else {
        const apiUrl = `https://tatbeqak.site/apps/tatbeqey/apps/easynotes/login?email=${loginEmailInput.value}&password=${loginPasswordInput.value}`;

        const response = await fetch(apiUrl);

        const data = await response.json();

        console.log(data);
        
        const status = data.status;

        if(status){
            const userId = data.id;
            const userName = data.name;
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            hideAll();
            userAccountDiv.style.display = "block";
            welcomeH3.innerText = `Welcome ${userName}`;
        } else {
            alert("Email or password is not correct");
        }

    }
}

function logoutUser() {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    hideAll();
    loginDiv.style.display = "block";
}

getNotes();