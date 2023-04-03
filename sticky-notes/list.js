//Déclaration des constantes et variable au chargement de la page
window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector('#new-task-input');
    const liste_el = document.querySelector('#tasks');

    //Empêcher l'actualisation de la page au moment de soumettre le formulaire et donc de rentrer une nouvelle tâche
    form.addEventListener('submit', (e) => {
        e.preventDefault();


        const task = input.value;
    
    //Envoie une alert si la tach est vide. EMpêche lm'utilisateur de rentrer des tachs vides
        if (!task) {
            alert("Veuillez remplir une tâche avant de valider");
            return;
        }

        //Création d'une div avec la classe task
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        //Création d'une div avec la classe content
        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        //Fait de la div avec la classe content l'enfant de la div avec la classe task(reproduction de l'exemple présent dans le html)
        task_el.appendChild(task_content_el);

        //Création d'un input + ajout des classes nécéssaires pour le css
        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        //Fait de l'input créé au dessus un enfant de la div avec content(on est juste en train de reproduire les mêmes balises que l'exemple dans le HTML avec le même ordre)
        task_content_el.appendChild(task_input_el);

        //Création de la div avec la classe actions
        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        //Création du boutton modifier
        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Modifier";

        //Création du bouton Supprimer
        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Supprimer";

        //Fait dezs deux boutons créés au dessus des enfants de la div avec la class actions(toujours en train de reproduire l'exemple html)
        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);
        task_el.appendChild(task_actions_el);

        //La div avec la classe Task devient l'enfant de la div avec la classe TaskS. 
        //ON VIENT DE REPRODUIRE L'ORDRE EXACT DES BALISES PRESENTES DANS LE HTML EN LES INJECTANT AVEC JAVASCRIPT
        liste_el.appendChild(task_el);

        input.value = "";

        //L'ordre des balises ets bon mais les boutons ne marchent pas on va donnc le faire ici
        //On pose un écouteur qui attends un click sur le boutton edit et qui va transformer le boutton et offrir la possibilité de modifier le contenu de l'input
        task_edit_el.addEventListener('click', () => {
            if(task_edit_el.innerText.toLowerCase() == "modifier") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Sauvegarder";
            }
        //Quand on click à nouveau sur le bouton on remets les propriétés du bouton et de l'input comme elles étaient
            else{
                task_input_el.setAttribute("readonly", "readonly");
                task_input_el.innerText = "Edit";
                task_edit_el.innerText = "Modifier"
            }
        });

        //On a juste besoin de supprimer la tache lié au bouton pour faire fonctionner le boutton supprimer
        task_delete_el.addEventListener('click', () => {
            liste_el.removeChild(task_el);
        })

        
    })
})