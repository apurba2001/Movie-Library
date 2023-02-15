const movies = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
]

const select = document.getElementById('select-search');
const titleInput = document.getElementById('title-input');
const genreInput = document.getElementById('genre-input'); 
const display = document.getElementById('results');
const search = document.getElementById('search');
const titleSort = document.getElementById('title-sort');
const genreSort = document.getElementById('genre-sort');
const countDisplay = document.getElementById('count');

const searchByTitle = (title) => {
    return movies.filter(movie => movie.title.includes(title));
};

const searchByGenre = (genre) => {
    return movies.filter(movie => movie.genre.includes(genre));
};
const searchByTitleAndGenre = (title, genre) => {
    return movies.filter(movie => movie.genre.includes(genre) && movie.title.includes(title));
};
const displayResults = (movie) => {
    movie.map(movie => display.innerHTML += `<li>${movie.title}(${movie.genre})</li>`);
};

const countByGenre = (genres) => {
    countDisplay.innerHTML = ''
    let counts = {}
    for (let genre of genres) {
        counts = { ...counts, [genre.genre]: counts[genre.genre] ? counts[genre.genre] + 1 : 1 }
    } 
    
    for (let count in counts) {
        countDisplay.innerHTML += `<li>${[count]} ${counts[count]}</li>`
    }
}

search.addEventListener('click', () => {
    display.innerHTML = '';
    const selectValue = select.value
    const title = titleInput.value
    const genre = genreInput.value
    switch (selectValue) {
        case 'title':
            const titleResult = searchByTitle(title)
            titleResult.length ? displayResults(titleResult) : display.innerHTML = "<H4>No movie found</H4>"
            countByGenre(titleResult)
            return
        case 'genre':
            const genreResult = searchByGenre(genre)
            genreResult.length ? displayResults(genreResult) : display.innerHTML = "<H4>No movie found</H4>"
            countByGenre(genreResult)
            return
        default:
            const result = searchByTitleAndGenre(title, genre)
            result.length ? displayResults(result) : display.innerHTML = "<H4>No movie found</H4>"
            countByGenre(result)
            return
    }
})

titleSort.addEventListener('click', () => {
    display.innerHTML = '';
    title = titleInput.value;
    genre = genreInput.value;
    let sortedResult = [];
    if (title) {
        const titleResult = searchByTitle(title);
        sortedResult = titleResult.sort((a, b) => (a.title > b.title) ? 1 : -1);
    } else if (genre) {
        const genreResult = searchByGenre(genre);
        sortedResult = genreResult.sort((a, b) => (a.title > b.title) ? 1 : -1);
    }
    displayResults(sortedResult);
});

genreSort.addEventListener('click', () => {
    display.innerHTML = '';
    title = titleInput.value;
    genre = genreInput.value;
    let sortedResult = [];
    if (title) {
        const titleResult = searchByTitle(title);
        sortedResult = titleResult.sort((a, b) => (a.genre > b.genre) ? 1 : -1);
    } else if (genre) {
        const genreResult = searchByGenre(genre);
        sortedResult = genreResult.sort((a, b) => (a.genre > b.genre) ? 1 : -1);
    }
    displayResults(sortedResult);
});

