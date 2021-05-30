document.addEventListener('DOMContentLoaded', () => {

    const submitForm = document.getElementById('form');
    
    submitForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addBook();
        alert('Saved!');
        event.target.reset();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener('ondatasaved', () => {
    console.log('Notification: New data has been saved.');
});

document.addEventListener('ondataloaded', () => {
    refreshDataFromBooks();
});