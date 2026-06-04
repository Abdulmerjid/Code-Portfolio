const API_KEY =
"http://www.omdbapi.com/?i=tt3896198&apikey=47cf540e";

const searchInput =
document.getElementById(
    "searchInput"
);

const moviesDiv =
document.getElementById(
    "movies"
);

const loadingDiv =
document.getElementById(
    "loading"
);

const paginationDiv =
document.getElementById(
    "pagination"
);

const favouritesDiv =
document.getElementById(
    "favourites"
);

let currentPage = 1;

let debounceTimer;

let favourites =
JSON.parse(
localStorage.getItem(
    "favourites"
)
) || [];


// SEARCH WITH DEBOUNCE
searchInput.addEventListener(
"input",
() => {

    clearTimeout(
        debounceTimer
    );

    debounceTimer =
    setTimeout(() => {

        currentPage = 1;

        searchMovies(
            searchInput.value
        );

    }, 500);
});


// FETCH MOVIES
async function searchMovies(
query
) {

    if (!query) {

        moviesDiv.innerHTML =
        "";

        return;
    }

    loadingDiv.innerHTML =
    "Loading...";

    try {

        const response =
        await fetch(
`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${currentPage}`
        );

        const data =
        await response.json();

        loadingDiv.innerHTML =
        "";

        if (
            data.Response ===
            "False"
        ) {

            moviesDiv.innerHTML =
            "<p>No results found</p>";

            return;
        }

        displayMovies(
            data.Search
        );

        renderPagination(
            query,
            data.totalResults
        );

    } catch {

        loadingDiv.innerHTML =
        "API Error";
    }
}


// DISPLAY MOVIES
async function displayMovies(
movies
) {

    moviesDiv.innerHTML =
    "";

    for (
        let movie of movies
    ) {

        const details =
        await getMovieDetails(
            movie.imdbID
        );

        const card =
        document.createElement(
            "div"
        );

        card.className =
        "movie-card";

        card.innerHTML =
        `
        <img src="
        ${movie.Poster}"
        >

        <h3>
            ${movie.Title}
        </h3>

        <p>
            ${movie.Year}
        </p>

        <p>
            IMDb:
            ${details.imdbRating}
        </p>

        <button
        onclick="
        showMovieDetails(
        '${movie.imdbID}'
        )">
            View Details
        </button>

        <button
        onclick="
        addFavourite(
        '${movie.imdbID}'
        )">
            Favourite
        </button>
        `;

        moviesDiv.appendChild(
            card
        );
    }
}


// GET DETAILS
async function getMovieDetails(
id
) {

    const response =
    await fetch(
`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
    );

    return response.json();
}


// DETAIL VIEW
async function showMovieDetails(
id
) {

    const movie =
    await getMovieDetails(
        id
    );

    alert(`
Title:
${movie.Title}

Genre:
${movie.Genre}

Director:
${movie.Director}

Actors:
${movie.Actors}

Plot:
${movie.Plot}
    `);
}


// PAGINATION
function renderPagination(
query,
totalResults
) {

    paginationDiv.innerHTML =
    "";

    const totalPages =
    Math.ceil(
        totalResults / 10
    );

    for (
        let i = 1;
        i <= totalPages &&
        i <= 5;
        i++
    ) {

        const btn =
        document.createElement(
            "button"
        );

        btn.textContent =
        i;

        btn.onclick =
        () => {

            currentPage =
            i;

            searchMovies(
                query
            );
        };

        paginationDiv
        .appendChild(btn);
    }
}


// FAVOURITES
async function addFavourite(
id
) {

    const movie =
    await getMovieDetails(
        id
    );

    favourites.push(movie);

    localStorage.setItem(
        "favourites",
        JSON.stringify(
            favourites
        )
    );

    renderFavourites();
}


function renderFavourites() {

    favouritesDiv
    .innerHTML = "";

    favourites.forEach(
    movie => {

        const card =
        document.createElement(
            "div"
        );

        card.className =
        "movie-card";

        card.innerHTML =
        `
        <img src="
        ${movie.Poster}
        ">

        <h3>
            ${movie.Title}
        </h3>
        `;

        favouritesDiv
        .appendChild(card);
    });
}

renderFavourites();