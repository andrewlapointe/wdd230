const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#list');

button.addEventListener('click', bomButtonClick);

function bomButtonClick() {
    if (input.value != '') {
        const li = document.createElement('li');
        const deleteButton = document.createElement('button');
        li.textContent = input.value;
        deleteButton.textContent = '❌';
        li.append(deleteButton);
        list.append(li);
        deleteButton.addEventListener('click', function() {
            deleteFunction(li);
        });
        input.focus();
        input.value = '';
    }
}

function deleteFunction(li) {
    list.removeChild(li);
    input.focus();
}