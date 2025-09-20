// document.querySelector('dialog').showModal()
const cardGrid = document.querySelector("#card-grid");
const inputs = document.querySelectorAll("input:required");
const floatBtns = document.querySelector("#float-btns");
const btnEdit = document.querySelector("#btn-edit");
const btnAdd = document.querySelector("#btn-add");
const Mydialog = document.querySelector("#my-dialog");
const cardBook = document.querySelector(".card");

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
    const edit = cardBook.dataset.editMode === "true";
    const closeBtn = document.querySelector(".close-btn");
    cardBook.dataset.editMode = edit ? "false" : "true";
    closeBtn.dataset.deleteBtn = edit ? "hidden" : "visible";
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
        case 'read-status':
            const isActive = button.dataset.read === 'true';
            button.dataset.read = isActive ? 'false' : 'true';
            break;
        case 'cancel':
            Mydialog.close()
            break;
        case 'save':
            getFormData(e);
            break;
    }
    
}


const getFormData = function(e) {
    const name = e.target.querySelector('#name').value;
    const auth = e.target.querySelector('#auth').value;
    const pages = e.target.querySelector('#pages').value;
    const isRead = e.target.querySelector('#read-status').dataset.read;
    const genre = e.target.querySelector('#genre').value;

    const book = new Book(name, auth, pages, isRead, genre);
    console.log(book)
}

