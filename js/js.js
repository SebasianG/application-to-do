const date = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')):{
    todo: [],
    completed: []
};

// ikony

const succesSVG = '<i class="far fa-check-circle a"></i>';
const removeSVG = '<svg version="1.1" class="fill" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22"  xml:space="preserve"><g><g><path class="st0" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="st0" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="st0" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="st0" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
 

 
setDOM();

//ostrzeżenie 
const warning = document.querySelector('.text');


// Dodawanie zawartości i ostrzeżenia
document.getElementById('add').addEventListener('click', function(){
    const content = document.getElementById('item').value;
    if (content) {
        addItem(content);
        warning.classList.add('no');
    } else {
        warning.classList.remove('no');
        warning.classList.add('text1');
    }
});

document.querySelector('#item').addEventListener('keydown', function (e) {
    let content = this.value;
    if (e.code === 'Enter' && content) {
        addItem(content);
    }
});

function addItem (content) {

        addItemMake(content);
        date.todo.push(content);

    dateObjectUpdade();
};

// Przekazywanie do drzewa DOM

function setDOM () {
    if (!date.todo.length && !date.completed.length) return;

    for (let i = 0; i < date.todo.length; i++) {
        let content = date.todo[i];
        addItemMake(content);
    }

    for (let j = 0; j < date.completed.length; j++) {
        let content = date.completed[j];
        addItemMake(content, true)
    }
}

// Przekazywanie danych do pamięci lokalnej 
function dateObjectUpdade () {
    localStorage.setItem('todoList', JSON.stringify(date)); 
}


// usuwanie 

function removeItem () {

    let child = this.parentNode.parentNode;
    let removeDO = child.parentNode;
    let id = removeDO.id;
    let value = child.innerText;
 
    if ( id === 'todo') {
       date.todo.splice(date.todo.indexOf(value), 1);
    } else {
       date.completed.splice(date.completed.indexOf(value), 1);
    }


    removeDO.removeChild(child);

    dateObjectUpdade();
};

function completeItem () {
  let child = this.parentNode.parentNode;
  let succesDO = child.parentNode;
  let id = succesDO.id;
  let value = child.innerText;
 
 if ( id === 'todo') {
    date.todo.splice(date.todo.indexOf(value), 1);
    date.completed.push(value);
 } else {
    date.completed.splice(date.completed.indexOf(value), 1);
    date.todo.push(value);
 }

  // sprawdzanie listy
  let target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

  succesDO.removeChild(child);
  target.insertBefore(child, target.childNodes[0]);

  dateObjectUpdade();

};

// Dodawanie nowego zadania 
function addItemMake (text, completed) {
    const todo = (completed) ? document.querySelector('#completed'):document.querySelector('#todo');

    const liCre = document.createElement('li');
    liCre.innerText = text;

    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    const remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    // usuwanie zadanie 
    remove.addEventListener('click', removeItem);

    const succes = document.createElement('button');
    succes.classList.add('success');
    succes.innerHTML = succesSVG;

    // zatwierdzanie zrobionego zadania 

    succes.addEventListener('click', completeItem);

    buttons.appendChild(remove);
    buttons.appendChild(succes);
    liCre.appendChild(buttons);

    todo.insertBefore(liCre, todo.childNodes[0]);
};

