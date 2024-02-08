window.onload = () => {
    listNotes();
}

document.getElementById('add-btn').onclick = ( () => {
    document.getElementById('add-form').style.visibility="visible";
})

document.getElementById('save-btn').addEventListener('click', () => {
    registerNote();
})

let listNotes = async () => {

    const pet = await fetch("http://localhost:8080/api/notes", 
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const notes = await pet.json();


    let activeTableContent = "";
    let archivedTableContent = "";

    for(let note of notes){

        if(note.state !== "archived"){
            let fileContent = `<tr>
                <td>${note.id}</td>
                <td>${note.content}</td>
                <td>
                    <i onclick="editNote(${note.id})" class="button edit">edit</i>
                    <i onclick="archiveNote(${note.id})" class="button archive">archive</i>
                    <i onclick="deleteNote(${note.id})" class="button delete">delete</i>
                </td>
            </tr>`
    
            activeTableContent += fileContent;
        } else {
            let fileContent = `<tr>
                <td>${note.id}</td>
                <td>${note.content}</td>
                <td>
                    <i onclick="unarchiveNote(${note.id})" class="button unarchive">unarchive</i>
                    <i onclick="deleteNote(${note.id})" class="button delete">delete</i>
                </td>
            </tr>`

            archivedTableContent += fileContent;
        }
    }

    document.querySelector('#active-table tbody').innerHTML = activeTableContent;
    document.querySelector('#archived-notes tbody').innerHTML = archivedTableContent;
}

let registerNote = async () => {

    let note = {
        state: "active",
        content: ""
    };
    
    note.content = document.getElementById('noteContent').value;

    if(note.content === "") {
        alert("Empty note");
    } else {
        const pet = await fetch("http://localhost:8080/api/addnote", 
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)    
        });
    }
}

let deleteNote = async (id) => {
    const pet = await fetch("http://localhost:8080/api/deletenote/"+id,
    {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    listNotes();
}

let editId;

let editNote = async (id) => {
    showForm();
    editId = id;

    const pet = await fetch("http://localhost:8080/api/note/"+id,
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const note = await pet.json();

    document.getElementById('edit-content').value = note.content;
}

document.getElementById('update-btn').addEventListener('click', () => {
    updateNote(editId);
})

let updateNote = async (id) => {
    let note = {};
    note.id = id;
    note.content = document.getElementById('edit-content').value;

    const pet = await fetch("http://localhost:8080/api/updatenote",
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)    
    });

    listNotes();
}

let archiveNote = async (id) => {

    editId = id;

    const p = await fetch("http://localhost:8080/api/note/"+id,
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const note = await p.json();

    note.state = "archived";

    const pet = await fetch("http://localhost:8080/api/archivenote",
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)    
    });

    listNotes();
}

let unarchiveNote = async (id) => {

    editId = id;

    const p = await fetch("http://localhost:8080/api/note/"+id,
    {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });

    const note = await p.json();

    note.state = "active";

    const pet = await fetch("http://localhost:8080/api/unarchivenote",
    {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)    
    });

    listNotes();
}

function showForm(){
    document.getElementById('edit-form').style.visibility="visible";
}