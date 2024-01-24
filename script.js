
async function getBookData() { // hämta data/API
    let response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
    let bookList = await response.json();
    console.log(bookList);
    return Promise.resolve(bookList);
}

function updateBookElement(bookData, element) {
    const titleElement = element.querySelector('h2');
    const authorElement = element.querySelector('h3');
    console.log(bookData, titleElement, authorElement); 

    if (titleElement && authorElement) {
        titleElement.textContent = bookData.title;
        authorElement.textContent = bookData.author;
    }
}


function updatePage1(bookList){ // uppdate title author 1st page
    bookList.forEach(bookData => {
        const bookElement = document.getElementById(bookData.title.toLowerCase().replace(/\W/g, '-'));
        if (bookElement) {
            bookElement.addEventListener('click', function() {
                localStorage.setItem('selectedBook', JSON.stringify(bookData));
            });
            console.log('Searching for element with id:', bookData.title.toLowerCase().replace(/ /g, '-'));
            updateBookElement(bookData, bookElement);
        }
    });
}


function updatePage2(bookList){ // uppdate title author 2nd page. funktionen förväntar sig att få en lista av böcker som input
    const selectedBookData = JSON.parse(localStorage.getItem('selectedBook')); // Hämta och parsa vald boks data från local storage, och lagra den i selectedBook
if (selectedBookData){
    const bookCoverElement = document.querySelector('.book-cover');
    const bookDescriptionElement = document.querySelector('.book-description');
    if (bookCoverElement && bookDescriptionElement ) {// kontroll för att säkerställa att både bokomslaget och bokbeskrivningen hittades. Om båda elementen finns, går vi in i koden inuti detta villkor.

        // uppdatera bokomslaget
        const titleCoverElement = bookCoverElement.querySelector('.title');
        const authorCoverElement = bookCoverElement.querySelector('.author')
        if (titleCoverElement && authorCoverElement) {
            titleCoverElement.textContent = selectedBookData.title;
            authorCoverElement.textContent = selectedBookData.author;
        }

        // uppdatera bokbeskrivningen
        const titleDescElement = bookDescriptionElement.querySelector('.title');
        const authorDescElement = bookDescriptionElement.querySelector('.author');
        const descriptionElement = bookDescriptionElement.querySelector('.description')
        const factsElement = bookDescriptionElement.querySelector('.facts')

        if (titleDescElement && authorDescElement && descriptionElement && factsElement) {
            titleDescElement.textContent = selectedBookData.title;
            authorDescElement.textContent = selectedBookData.author;
            descriptionElement.textContent = selectedBookData.description;
            factsElement.querySelector('h4:nth-child(1)').textContent = `Audience: ${selectedBookData.audience}`;
            factsElement.querySelector('h4:nth-child(2)').textContent = `First published: ${selectedBookData.firstPublished}`;
            factsElement.querySelector('h4:nth-child(3)').textContent = `Pages: ${selectedBookData.pages}`;
            factsElement.querySelector('h4:nth-child(4)').textContent = `Publisher: ${selectedBookData.publisher}`;
        }

       
    }
    } 
}
 

function setUpBackButton(){ // event listener for back button
    //back-button
    const backButton =document.querySelector("#back-btn")
    if (backButton) {
    backButton.addEventListener("click", function() {
        window.location.href = "index.html";
    });
    }  
}

function setUpReadButton(){ // event listener for read button
    const readButton = document.querySelector("#read-btn")
    if (readButton) {
        readButton.addEventListener("click",function() {
            window.location.href = "https://www.goodreads.com/genres/childrens-classics";
        } )
    } 
}

function setUpBookClicks(bookList) {
    // for every book in bookList, add event listender thet updates page 2 with info about klicked book
    //console.log("Setting up book clicks");
    const books = document.querySelectorAll(".book");
    // console.log(bookList)
    books.forEach(book => {
        book.addEventListener("click", function(event) {
            const clickedBookId = event.currentTarget.id;
            const selectedBookData = bookList.find(book => book.title.toLowerCase().replace(/ /g, '-') === clickedBookId)
            localStorage.setItem('clickedBook', JSON.stringify(selectedBookData));
            updatePage2(bookList);
            window.location.href = "index2.html"
        })
    })
}

const selectedBookData = JSON.parse(localStorage.getItem('selectedBook'));
window.onload = function() { 
    getBookData().then(bookList => {
        updatePage1(bookList);
        //updatePage2(bookList);
        setUpBookClicks(bookList);
        setUpBackButton();
        setUpReadButton();
        let selectedBookDataString = localStorage.getItem('clickedBook');
if (selectedBookDataString) {
    const selectedBookData = JSON.parse(selectedBookDataString);
    updatePage2(selectedBookData)
}
        });
     
}