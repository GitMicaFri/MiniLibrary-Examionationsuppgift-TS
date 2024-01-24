function updatePage2(bookList) { // funktionen förväntar sig att få en lista av böcker som input
    const selectedBookData = JSON.parse(localStorage.getItem('selectedBook'));

    if (selectedBookData) {
        const bookCoverElement = document.querySelector('.book-cover');
        const bookDescriptionElement = document.querySelector('.book-description');

        if (bookCoverElement && bookDescriptionElement) {
            // Uppdatera bokomslaget
            const titleCoverElement = bookCoverElement.querySelector('.title');
            const authorCoverElement = bookCoverElement.querySelector('.author');
            if (titleCoverElement && authorCoverElement) {
                titleCoverElement.textContent = selectedBookData.title;
                authorCoverElement.textContent = selectedBookData.author;
            }

            // Uppdatera bokbeskrivningen
            const titleDescElement = bookDescriptionElement.querySelector('.title');
            const authorDescElement = bookDescriptionElement.querySelector('.author');
            const descriptionElement = bookDescriptionElement.querySelector('.description');
            const factsElement = bookDescriptionElement.querySelector('.facts');

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

// ... (din övriga kod)

// Använd updatePage2 i din övriga kod där det är lämpligt, exempelvis efter klick på bok på sidan 1.

// Exempel:
// books.forEach(book => {
//     book.addEventListener("click", function(event) {
//         const clickedBookId = event.currentTarget.id;
//         const selectedBookData = bookList.find(book => book.title.toLowerCase().replace(/ /g, '-') === clickedBookId)
//         localStorage.setItem('selectedBook', JSON.stringify(selectedBookData));
//         updatePage2(bookList); // Lägg till detta för att uppdatera sidan 2
//         window.location.href = "index2.html"
//     })
// });
