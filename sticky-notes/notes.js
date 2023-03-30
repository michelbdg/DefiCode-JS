const notesContainer = document.getElementById("container-notes");
const addNoteButton = notesContainer.querySelector(".add-note");

getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () =>
    addNote());

//Récupérer les notes déja existantes sur le pc
function getNotes() {
    return
    JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

//Sauvegarder les notes
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

//Liste de commandes pour créer uen nouelle note 
function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    Element.classList.add("note");
    Element.value = content;
    Element.placeholder = "Nouvelle note vide";

    Element.addEventListener("change", () => {
        updateNote(id, element.value);
    });


Element.addEventListener("dbclick", () => {
    const doDelete = confirm(
        "Êtes vous sur de vouloir supprimer cette note ?"
    );

    if (doDelete) {
        deleteNote(id, Element)
    }
});
return element;

}
//Créer une nouvelle note
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 1000000),
        content: ""
    };
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

// Sauvergarder le prise de note
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id);
    notesContainer.removeChild(Element);

    saveNotes(notes);
    notesContainer.removeChild(element);
}