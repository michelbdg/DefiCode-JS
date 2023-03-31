//Déclaration de constantes et attribution de valeur à l'aide du DOM
const notesContainer = document.getElementById("container-notes");
const addNoteButton = notesContainer.querySelector(".add-note");


getNotes().forEach((note) =>{
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

//Création de la fonction getNotes qui permets de récupérer les notes déja existantes à l'aide du local storage
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

//Création de la fonction saveNotes qui permets de sauvegarder les notes en cours à l'aide du local storage
function saveNotes(notes) {
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

//Création de la fonction qui permets qui va permettre de créer une nouvelle note
function createNoteElement(id, content) {
    const element = document.createElement("textarea");

    element.classList.add("note");
    element.value = content;
    element.placeholder = "Nouvelle note vide";

    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    //Utilisation d'un écouteur pour faire appel à la fonction deleteNote en cas de double click
    element.addEventListener("dblclick", () => {
        const doDelete = confirm("Êtes vous sur de vouloir supprimer la note ?");

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

//Création effective d'une nouvelle note
function addNote() {
    //Attribution d'un ID aléatoire entre bcp de nombres(chances quasi nules d'en avoir deux identiques)
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() *100000),
        content: ""
    };

    //Création d'une note n faisant appel à la fonction createNoteElement crée au dessus + placement de la note dans le bon container
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    //Sauvegarde lancé just après ka création en faisant appel à la fonction saveNotes créé plus haut
    notes.push(noteObject);
    saveNotes(notes);
}

    //Création de la fonction qui permets de mettre à jour les notes déja existantes en enregistra  nt les modifications en cours
function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id == id)[0];
    
    targetNote.content = newContent;
    saveNotes(notes);
}

    // Création de la fonction qui pemrets la suppression d'une note 
function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !=id);

    saveNotes(notes);
    notesContainer.removeChild(element);
} 