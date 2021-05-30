const UNFINISHED_LIST_BOOK_ID = 'books';
const FINISHED_LIST_BOOK_ID = 'finished-books';
const BOOK_ITEMID = 'itemId';

const addBook = () => {
    const unfinishedBookList = document.getElementById(UNFINISHED_LIST_BOOK_ID);

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = document.getElementById('year').value;

    const book = makeBook(title, author, year);
    const bookObject = composeBookObject(title, author, year, false);

    book[BOOK_ITEMID] = bookObject.id;
    books.push(bookObject);

    unfinishedBookList.append(book);
    updateDataToStorage();
};

const makeBook = (bookTitle, bookAuthor, publishedYear, isFinished) => {
    
    const textTitle = document.createElement('h3');
    textTitle.innerText = bookTitle;

    const textAuthor = document.createElement('h4');
    textAuthor.innerText = bookAuthor;

    const textYear = document.createElement('p');
    textYear.innerText = publishedYear;

    const textContainer = document.createElement('div');
    textContainer.classList.add('inner')
    textContainer.append(textTitle, textAuthor, textYear);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow')
    container.append(textContainer);
    if(isFinished){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    }else{
        container.append(createCheckButton(), createTrashButton());
    }
    return container;
};

const addBookToFinished = (taskElement) => {
    const listFinished = document.getElementById(FINISHED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector('.inner > h3').innerText;
    const bookAuthor = taskElement.querySelector('.inner > h4').innerText;
    const publishedYear = taskElement.querySelector('.inner > p').innerText;

    const newBook = makeBook(bookTitle, bookAuthor, publishedYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isFinished = true;
    newBook[BOOK_ITEMID] = book.id;

    listFinished.append(newBook);
    taskElement.remove();

    updateDataToStorage();
};


const removeBookFromFinished = (taskElement) => {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);

    taskElement.remove();
    updateDataToStorage();
};

const undoBookFromFinished = (taskElement) => {
    const listUnfinished = document.getElementById(UNFINISHED_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector('.inner > h3').innerText;
    const bookAuthor = taskElement.querySelector('.inner > h4').innerText;
    const publishedYear = taskElement.querySelector('.inner > p').innerText;
    
    const newBook = makeBook(bookTitle, bookAuthor, publishedYear, false);

    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isFinished = false;
    newBook[BOOK_ITEMID] = book.id;
    
    listUnfinished.append(newBook);
    taskElement.remove();

    updateDataToStorage();
};

const createButton = (buttonTypeClass, eventListener) => {
    const button = document.createElement('button');
    button.classList.add(buttonTypeClass);
    button.addEventListener('click', (event) => {
        eventListener(event);
    });
    return button;
};

const createCheckButton = () => {
    return createButton('check-button', (event) => {
        if(confirm('Mark this book as done?') == true){
            addBookToFinished(event.target.parentElement);
        } else {
            console.log('Action canceled!')
        }
    });
};


const createUndoButton = () => {
    return createButton('undo-button', (event) => {
        if(confirm('Undo this book from finished?') == true){
            undoBookFromFinished(event.target.parentElement);
        } else {
            console.log('Action canceled!');
        }
    });
};

const createTrashButton = () => {
    return createButton('trash-button', (event) => {
        if(confirm('Delete this book?') == true){
            removeBookFromFinished(event.target.parentElement);
            alert('Book removed from list');
        } else{
            console.log('Action canceled!');
        }
    });
};