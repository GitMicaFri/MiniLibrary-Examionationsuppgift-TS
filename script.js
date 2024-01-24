let bookList;

async function getBookData() {
  // hämta data/API
  let response = await fetch(
    'https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books'
  );
  let bookList = await response.json();
  console.log(bookList);
  return Promise.resolve(bookList);
}

function updateBookElement(bookData, element) {
  const titleElement = element.querySelector('h2');
  const authorElement = element.querySelector('h3');
  console.log(bookData, titleElement, authorElement);

  titleElement.textContent = bookData.title;
  authorElement.textContent = bookData.author;
}

function updatePage1(bookList) {
  // uppdate title author 1st page
  const bookElements = document.querySelectorAll('.book'); // Här hämtar vi listan med alla böcker för att få ut en lista med index
  bookList.forEach((bookData, index) => {
    const bookElement = bookElements[index]; // refererar till samma index som i vår array
    updateBookElement(bookData, bookElement);
  });
}

function updatePage2(selectedBookData, newId) {
  // uppdate title author 2nd page. funktionen förväntar sig att få den valda boken som input, samt vilket nytt Id elementet på sida 2 ska ha.

  const bookCoverElement = document.querySelector('.book-cover');
  const bookDescriptionElement = document.querySelector('.book-description');
  bookCoverElement.id = newId;
  // uppdatera bokomslaget
  const titleCoverElement = bookCoverElement.querySelector('.title');
  const authorCoverElement = bookCoverElement.querySelector('.author');

  titleCoverElement.textContent = selectedBookData.title;
  authorCoverElement.textContent = selectedBookData.author;

  // uppdatera bokbeskrivningen
  const titleDescElement = bookDescriptionElement.querySelector('.title');
  const authorDescElement = bookDescriptionElement.querySelector('.author');
  const descriptionElement =
    bookDescriptionElement.querySelector('.description');
  const factsElement = bookDescriptionElement.querySelector('.facts');

  titleDescElement.textContent = selectedBookData.title;
  authorDescElement.textContent = selectedBookData.author;
  descriptionElement.textContent = selectedBookData.description;
  factsElement.querySelector(
    'h4:nth-child(1)'
  ).textContent = `Audience: ${selectedBookData.audience}`;
  factsElement.querySelector(
    'h4:nth-child(2)'
  ).textContent = `First published: ${selectedBookData.year}`;
  factsElement.querySelector(
    'h4:nth-child(3)'
  ).textContent = `Pages: ${selectedBookData.pages}`;
  factsElement.querySelector(
    'h4:nth-child(4)'
  ).textContent = `Publisher: ${selectedBookData.publisher}`;
}

function setUpBackButton() {
  // event listener for back button
  //back-button
  const backButton = document.querySelector('#back-btn');
  if (backButton) {
    backButton.addEventListener('click', function () {
      const page2 = document.querySelector('#page2');
      page2.style.display = 'none';
    });
  }
}

function setUpReadButton() {
  // event listener for read button
  const readButton = document.querySelector('#read-btn');
  if (readButton) {
    readButton.addEventListener('click', function () {});
  }
}

function setUpBookClicks(bookList) {
  // for every book in bookList, add event listender thet updates page 2 with info about klicked book
  const books = document.querySelectorAll('.book');
  books.forEach((book, index) => {
    book.addEventListener('click', function () {
      const selectedBookData = bookList[index];
      updatePage2(selectedBookData, this.id);
      const page2 = document.querySelector('#page2');
      page2.style.display = 'block';
    });
  });
}

window.onload = function () {
  bookList = getBookData().then((bookList) => {
    updatePage1(bookList);
    setUpBookClicks(bookList);
    setUpBackButton();
    setUpReadButton();
  });
};
