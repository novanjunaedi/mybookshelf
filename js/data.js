const STORAGE_KEY = 'BOOKSHELF_APPS';

let books = [];

const isStorageExist = () => {
    if(typeof(Storage) === undefined){
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
};

const saveData = () => {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event('ondatasaved'));
};

const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if(data !== null){
        books = data;
    }
    document.dispatchEvent(new Event('ondataloaded'));
}

const updateDataToStorage = () => {
    if(isStorageExist()){
        saveData();
    }
};

const composeBookObject = (bookTitle, bookAuthor, publishedYear, isFinished) => {
    return {
        id: +new Date(),
        bookTitle,
        bookAuthor,
        publishedYear,
        isFinished
    };
};

const findBook = (bookId) => {
    for(book of books){
        if(book.id === bookId){
            return book;
        }
    }
    return null;
};

const findBookIndex = (bookId) => {
    let index = 0;

    for(book of books){
        if(book.id === bookId){
            return index;
        }
        index++;
    }
    return -1;
};

const refreshDataFromBooks = () => {
    const listUnfinished = document.getElementById(UNFINISHED_LIST_BOOK_ID);
    let listFinished = document.getElementById(FINISHED_LIST_BOOK_ID);

    for(book of books){
        const newBook = makeBook(book.bookTitle, book.bookAuthor, book.publishedYear, book.isFinished);
        newBook[BOOK_ITEMID] = book.id;

        if(book.isFinished){
            listFinished.append(newBook);
        } else {
            listUnfinished.append(newBook);
        }
    }
};