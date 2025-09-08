// document.querySelector('dialog').showModal()
const cardGrid = document.querySelector('#card-grid');
const inputs = document.querySelectorAll('input:required')
const floatBtns = document.querySelector('#float-btns');
const btnEdit = document.querySelector('#btn-edit');
const btnAdd = document.querySelector('#btn-add');
const Mydialog = document.querySelector('#my-dialog');
const readStatus = document.querySelector('#read-status');

// BOOK COLECTION
const myLibrary = [];

// CONTRUCTOR FUNCTION
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
    console.log(myLibrary[lastBook])
}


function addBookToLibrary(name, auth, pages, read) {
    const newBook = new Book(name, auth, pages, read);
    myLibrary.push(newBook);
    renderLibrary();
}


floatBtns.addEventListener('click', e => {
    if (e.target.closest('#btn-add')) {
        Mydialog.showModal()
    }
    // console.log(e.target)
});

readStatus.addEventListener('click', () => {
    // console.log(readStatus.textContent)
    const value = readStatus.textContent;
    if (value === 'Read') {
        readStatus.classList.remove('btn-read');
        readStatus.classList.add('btn-unread');
        readStatus.textContent = 'Not Read';
    } else if (value === 'Not Read') {
        readStatus.classList.remove('btn-unread');
        readStatus.classList.add('btn-read');
        readStatus.textContent = 'Read';
    }
})