const API_KEY =
"YOUR_API_KEY";

const weatherBtn =
document.getElementById(
    "weatherBtn"
);

const weatherDiv =
document.getElementById(
    "weather"
);


// WEATHER API
weatherBtn.addEventListener(
"click",
async () => {

    const city =
    document.getElementById(
        "cityInput"
    ).value;

    try {

        const response =
        await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data =
        await response.json();

        weatherDiv.innerHTML =
        `
        <h3>
            ${data.name}
        </h3>

        <p>
            ${data.main.temp}°C
        </p>

        <p>
            ${data.weather[0]
                .description}
        </p>
        `;

        localStorage.setItem(
            "weather",
            weatherDiv.innerHTML
        );

    } catch {

        weatherDiv.innerHTML =
        "Error loading weather";
    }
});


// RANDOM QUOTE API
const quoteBtn =
document.getElementById(
"quoteBtn"
);

const quoteText =
document.getElementById(
"quote"
);

async function getQuote() {

    try {

        const response =
        await fetch(
"https://dummyjson.com/quotes/random"
        );

        const data =
        await response.json();

        quoteText.textContent =
        `"${data.quote}" - ${data.author}`;

        localStorage.setItem(
            "quote",
            quoteText.textContent
        );

    } catch {

        quoteText.textContent =
        "Could not load quote";
    }
}

quoteBtn.addEventListener(
"click",
getQuote
);


// TODO LIST
let todos =
JSON.parse(
localStorage.getItem(
    "todos"
)
) || [];

const todoList =
document.getElementById(
"todoList"
);

function renderTodos() {

    todoList.innerHTML = "";

    todos.forEach(
    (todo, index) => {

        const li =
        document.createElement(
            "li"
        );

        li.textContent =
        todo;

        li.draggable = true;

        li.dataset.index =
        index;

        li.addEventListener(
        "dragstart",
        dragStart
        );

        li.addEventListener(
        "dragover",
        dragOver
        );

        li.addEventListener(
        "drop",
        drop
        );

        todoList.appendChild(
        li
        );
    });

    localStorage.setItem(
    "todos",
    JSON.stringify(todos)
    );
}


// ADD TODO
document
.getElementById(
"addTodoBtn"
)
.addEventListener(
"click",
() => {

    const input =
    document.getElementById(
        "todoInput"
    );

    if (
        input.value.trim()
    ) {

        todos.push(
        input.value
        );

        input.value = "";

        renderTodos();
    }
});


// DRAG DROP
let draggedIndex;

function dragStart() {

draggedIndex =
this.dataset.index;
}

function dragOver(e) {

e.preventDefault();
}

function drop() {

const targetIndex =
this.dataset.index;

[
todos[draggedIndex],
todos[targetIndex]
]
=
[
todos[targetIndex],
todos[draggedIndex]
];

renderTodos();
}


// LOAD STORAGE
window.addEventListener(
"load",
() => {

weatherDiv.innerHTML =
localStorage.getItem(
"weather"
) || "";

quoteText.textContent =
localStorage.getItem(
"quote"
) ||
"Loading quote...";

renderTodos();

getQuote();
});