const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

const CHAPTERS = 'chapters';

button.addEventListener('click', bomButtonClick);

function loadChapters() {
    let fav_chapters = getChaptersFromLocalStorage();
    if (fav_chapters !== null) {
        fav_chapters.forEach(chapter => updateList(chapter));
    }
}

function bomButtonClick() {
    if (input.value != '') {
        string = `${input.value}`
        console.log(string)
        updateList(input.value);
        addToLocalStorage(string);
    }
}

function getChaptersFromLocalStorage() {
    const chaptersStr = localStorage.getItem(CHAPTERS);
    return chaptersStr ? JSON.parse(chaptersStr) : [];
}

function addToLocalStorage(chapter) {
    if (!chapter) {
        console.warn("Trying to add an empty chapter. Aborting.");
        return;
    }
    
    const fav_chapters = getChaptersFromLocalStorage();
    fav_chapters.push(chapter);
    localStorage.setItem(CHAPTERS, JSON.stringify(fav_chapters));
    
    console.log("Added chapter:", chapter, "New list:", fav_chapters);
}

function updateList(chapter) {
    const value = chapter || input.value; // Use chapter value if provided, else use input value
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');
    li.textContent = value;
    deleteButton.textContent = '❌';
    li.append(deleteButton);
    list.append(li);
    deleteButton.addEventListener('click', function() {
        deleteFunction(li, value);
    });
    input.focus();
    input.value = '';
}

function deleteFunction(li, chapter) {
    list.removeChild(li);
    const fav_chapters = getChaptersFromLocalStorage();
    const index = fav_chapters.indexOf(chapter);
    if (index !== -1) {
        fav_chapters.splice(index, 1);
        localStorage.setItem(CHAPTERS, JSON.stringify(fav_chapters));
    }
    input.focus();
}

loadChapters();
