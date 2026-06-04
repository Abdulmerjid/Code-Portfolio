const students = [];

for (let i = 1; i <= 50; i++) {

    students.push({
        id: i,
        name: `Student ${i}`,
        age:
            Math.floor(
                Math.random() * 10
            ) + 18,

        course: [
            "Computer Science",
            "Medicine",
            "Engineering",
            "Law"
        ][
            Math.floor(
                Math.random() * 4
            )
        ]
    });
}

let currentPage = 1;

const rowsPerPage = 10;

let filteredData =
    [...students];


// TABLE BODY
const tableBody =
    document.getElementById(
        "table-body"
    );

const searchInput =
    document.getElementById(
        "search"
    );


// RENDER TABLE
function renderTable() {

    tableBody.innerHTML = "";

    const start =
        (currentPage - 1)
        * rowsPerPage;

    const end =
        start + rowsPerPage;

    const pageData =
        filteredData.slice(
            start,
            end
        );

    pageData.forEach(student => {

        const row =
            document.createElement(
                "tr"
            );

        row.innerHTML = `
            <td>
                ${student.id}
            </td>

            <td contenteditable="true">
                ${student.name}
            </td>

            <td contenteditable="true">
                ${student.age}
            </td>

            <td contenteditable="true">
                ${student.course}
            </td>

            <td>
                <button
                    onclick="saveRow(this)"
                >
                    Save
                </button>
            </td>
        `;

        tableBody.appendChild(
            row
        );
    });

    renderPagination();
}


// SEARCH FILTER
searchInput.addEventListener(
    "input",
    function () {

        const value =
            this.value
            .toLowerCase();

        filteredData =
            students.filter(
                student =>

                student.name
                    .toLowerCase()
                    .includes(
                        value
                    ) ||

                student.course
                    .toLowerCase()
                    .includes(
                        value
                    )
            );

        currentPage = 1;

        renderTable();
    }
);


// SORTING
document
.querySelectorAll(
    "th[data-column]"
)
.forEach(header => {

    header.addEventListener(
        "click",
        () => {

            const column =
                header.dataset.column;

            filteredData.sort(
                (a, b) => {

                    if (
                        a[column] <
                        b[column]
                    ) {
                        return -1;
                    }

                    if (
                        a[column] >
                        b[column]
                    ) {
                        return 1;
                    }

                    return 0;
                }
            );

            renderTable();
        }
    );
});


// PAGINATION
function renderPagination() {

    const pagination =
        document.getElementById(
            "pagination"
        );

    pagination.innerHTML = "";

    const totalPages =
        Math.ceil(
            filteredData.length
            / rowsPerPage
        );

    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {

        const button =
            document.createElement(
                "button"
            );

        button.textContent =
            i;

        button.addEventListener(
            "click",
            () => {

                currentPage = i;

                renderTable();
            }
        );

        pagination.appendChild(
            button
        );
    }
}


// INLINE SAVE
function saveRow(button) {

    const row =
        button.parentElement
            .parentElement;

    const cells =
        row.querySelectorAll(
            "td"
        );

    alert(
        `Saved:
        ${cells[1].textContent}
        `
    );
}


renderTable();