async function fetchBookCover(book) {
    try {
        const response = await axios.get('https://bookcover.longitood.com/bookcover/' + book.isbn);
        const coverUrl = response.data.url;
        book.cover = coverUrl;
    } catch (error) {
        console.error(`Error fetching cover for ISBN ${book.isbn}:`, error.message);
        book.cover = '/assets/gradient.jpg'; 
    }
    
    return book;
}

export default fetchBookCover;