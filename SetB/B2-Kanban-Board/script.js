let cards =
    JSON.parse(
        localStorage.getItem(
            "kanbanCards"
        )
    ) || [];

const addCardBtn =
    document.getElementById(
        "addCardBtn"
    );


// SAVE TO LOCAL STORAGE
function saveCards() {

    localStorage.setItem(
        "kanbanCards",
        JSON.stringify(cards)
    );
}


// RENDER CARDS
function renderCards() {

    document.getElementById(
        "todo"
    ).innerHTML = "";

    document.getElementById(
        "progress"
    ).innerHTML = "";

    document.getElementById(
        "done"
    ).innerHTML = "";

    cards.forEach(card => {

        const cardElement =
            document.createElement(
                "div"
            );

        cardElement.className =
            `card ${card.priority.toLowerCase()}`;

        cardElement.draggable = true;

        cardElement.dataset.id =
            card.id;

        cardElement.innerHTML = `
            <h3>${card.title}</h3>

            <p>
                ${card.description}
            </p>

            <p>
                Priority:
                ${card.priority}
            </p>

            <p>
                Due:
                ${card.dueDate}
            </p>

            <div class="actions">
                <button
                    onclick="editCard('${card.id}')"
                >
                    Edit
                </button>

                <button
                    onclick="deleteCard('${card.id}')"
                >
                    Delete
                </button>
            </div>
        `;

        cardElement.addEventListener(
            "dragstart",
            () => {

                cardElement.classList.add(
                    "dragging"
                );
            }
        );

        cardElement.addEventListener(
            "dragend",
            () => {

                cardElement.classList.remove(
                    "dragging"
                );
            }
        );

        document.getElementById(
            card.status
        ).appendChild(
            cardElement
        );
    });
}


// ADD CARD
addCardBtn.addEventListener(
    "click",
    () => {

        const title =
            document.getElementById(
                "title"
            ).value;

        const description =
            document.getElementById(
                "description"
            ).value;

        const priority =
            document.getElementById(
                "priority"
            ).value;

        const dueDate =
            document.getElementById(
                "dueDate"
            ).value;

        if (!title) {
            alert(
                "Title required"
            );
            return;
        }

        const card = {
            id:
                Date.now().toString(),

            title,

            description,

            priority,

            dueDate,

            status: "todo"
        };

        cards.push(card);

        saveCards();

        renderCards();
    }
);


// DELETE CARD
function deleteCard(id) {

    cards =
        cards.filter(
            card =>
                card.id !== id
        );

    saveCards();

    renderCards();
}


// EDIT CARD
function editCard(id) {

    const card =
        cards.find(
            c => c.id === id
        );

    const newTitle =
        prompt(
            "Edit title",
            card.title
        );

    if (newTitle !== null) {
        card.title = newTitle;
    }

    saveCards();

    renderCards();
}


// DRAG & DROP
document
.querySelectorAll(
    ".card-container"
)
.forEach(container => {

    container.addEventListener(
        "dragover",
        e => {

            e.preventDefault();
        }
    );

    container.addEventListener(
        "drop",
        e => {

            const draggedCard =
                document.querySelector(
                    ".dragging"
                );

            const id =
                draggedCard.dataset.id;

            const card =
                cards.find(
                    c =>
                        c.id === id
                );

            card.status =
                container.id;

            saveCards();

            renderCards();
        }
    );
});


renderCards();