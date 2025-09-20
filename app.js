// document.querySelector('dialog').showModal()
const cardGrid = document.querySelector("#card-grid");
const floatBtns = document.querySelector("#float-btns");
const Mydialog = document.querySelector("#my-dialog");
// const cardBook = document.querySelector(".card");
const template = document.querySelector('#template')

// BOOK COLECTION
const myLibrary = [];

// BOOK CONSTRUCTOR
function Book(name, auth, pages, read) {
    this.name = name;
    this.auth = auth;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
}

// SHOW LAST BOOK
function renderLibrary() {
    const lastBook = myLibrary.length - 1;
    console.log(myLibrary[lastBook]);
}

function addBookToLibrary(name, auth, pages, read) {
    const newBook = new Book(name, auth, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
}

function editionMode() {
    const btnEdit = document.querySelector('#btn-edit');
    const btnAdd = document.querySelector('#btn-add');
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        const editMode = card.dataset.editMode === 'true';
        const btnDelete = card.querySelector('.close-btn');
        card.dataset.editMode = editMode ? "false" : "true";
        btnDelete.dataset.deleteBtn = editMode ? "hidden" : "visible";
        btnEdit.textContent = editMode ? 'Edit' : 'Cancel';
        btnAdd.textContent = editMode ? 'Add +' : 'Save Changes';

    })
}

// Edit and Add listener
floatBtns.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    // check that button
    if (button?.matches("#btn-add")) {
        Mydialog.showModal();
        document.activeElement.blur();
    } 
    else if (button?.matches("#btn-edit")) editionMode();
});

// form button listener
const modalForm = document.querySelector('form');

modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // get button elements of form
    getFormAction(e)
});

const getFormAction = function(e) {
    const button = e.submitter;
    console.log('button pressed', button.dataset.action)

    switch (button.dataset.action) {
        case 'change-reading-status':
            const isActive = button.dataset.read === 'true';
            if (isActive) {
                button.dataset.read = 'false';
                button.textContent = 'Not Read';
            } else {
                button.dataset.read = 'true';
                button.textContent = 'Read';
            }
            break;
        case 'cancel':
            Mydialog.close()
            break;
        case 'save':
            saveAndShowBook(e);
            break;
    }
    
}


const saveAndShowBook = function(e) {
    const name = e.target.querySelector('#name').value;
    const auth = e.target.querySelector('#auth').value;
    const pages = e.target.querySelector('#pages').value;
    const isRead = e.target.querySelector('#read-status').dataset.read;
    const contentRead = e.target.querySelector('#read-status').textContent;

    const genre = e.target.querySelector('#genre').value;
    // instantiate and save book
    const book = new Book(name, auth, pages, isRead, genre);
    myLibrary.push(book)
    // clone template
    const clone = template.content.cloneNode(true);
    // fill content
    clone.querySelector('.card-name').textContent = name;
    clone.querySelector('.card-auth').textContent = `by ${auth}`;
    clone.querySelector('.pages-value').textContent = pages;
    clone.querySelector('.genre-value').textContent = genre;
    clone.querySelector('.read-status').dataset.read = isRead;
    clone.querySelector('.read-status').textContent = contentRead;

    cardGrid.prepend(clone);
    Mydialog.close();
    modalForm.reset();
}

