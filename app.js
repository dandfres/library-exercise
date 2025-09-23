// document.querySelector('dialog').showModal()
const cardGrid = document.querySelector("#card-grid");
const floatBtns = document.querySelector("#float-btns");
const Mydialog = document.querySelector("#my-dialog");
// const cardBook = document.querySelector(".card");
const modalForm = document.querySelector('form');
const template = document.querySelector('#template')

// LIBRARY
const myLibrary = [];

// BOOK CONSTRUCTOR
function Book(name, auth, pages, read, genre) {
    this.name = name;
    this.auth = auth;
    this.pages = pages;
    this.read = read;
    this.genre = genre;
    this.id = crypto.randomUUID();
}

// Add Book
const addBookToLibrary = function (e) {
    // GET form value
    const name = e.target.querySelector('#name').value;
    const auth = e.target.querySelector('#auth').value;
    const pages = e.target.querySelector('#pages').value;
    const read = e.target.querySelector('#read-status').dataset.read;
    const genre = e.target.querySelector('#genre').value;
    // push myLibrary array
    const newBook = new Book(name, auth, pages, read, genre);
    myLibrary.push(newBook);
}

// SHOW LAST BOOK
function showLastBook() {
    const lastBook = myLibrary[myLibrary.length - 1];
    // clone template
    const clone = template.content.cloneNode(true);
    // fill clone content
    clone.querySelector('.card-name').textContent = lastBook.name;
    clone.querySelector('.card-auth').textContent = `by ${lastBook.auth}`;
    clone.querySelector('.pages-value').textContent = lastBook.pages;
    clone.querySelector('.genre-value').textContent = lastBook.genre;
    clone.querySelector('.read-status').textContent = lastBook.read;
    const isRead = lastBook.read === 'Read';
    clone.querySelector('.read-status').dataset.read = isRead ? 'true' : 'false';
    // insert card at start
    cardGrid.prepend(clone);
}

// Activate edit mode
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

// HANDDLE float buttons
floatBtns.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    // check that button
    if (button?.matches("#btn-add")) {
        Mydialog.showModal();
        document.activeElement.blur();
    }
    else if (button?.matches("#btn-edit")) {
        editionMode()
    };
});

// HANDDLE modal form
modalForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const button = e.submitter;
    // console.log('button pressed', button.dataset.action)
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
            addBookToLibrary(e);
            showLastBook()
            Mydialog.close();
            modalForm.reset();
            break;
    }
});

const book1 = new Book('Game of Thrones', 'George R. R. Martin', '835', 'Not Read', 'fantasy')
myLibrary.push(book1);
showLastBook();
const book2 = new Book('Lord of Rings', 'J.R.R. Tolkien', '1216', 'Read', 'fantasy')
myLibrary.push(book2);
showLastBook();
