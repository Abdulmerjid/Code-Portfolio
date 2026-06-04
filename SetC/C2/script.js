console.log(
    "1. Script started"
);

// CALL STACK:
// console.log executes immediately

function fetchUser() {

    console.log(
        "2. Fetching user..."
    );

    return new Promise(
        (resolve) => {

            setTimeout(() => {

                console.log(
                    "3. User fetched"
                );

                resolve({
                    id: 1,
                    name: "John"
                });

            }, 2000);
        }
    );
}


function fetchPosts(user) {

    console.log(
        "4. Fetching posts..."
    );

    return new Promise(
        (resolve) => {

            setTimeout(() => {

                console.log(
                    "5. Posts fetched"
                );

                resolve([
                    "Post 1",
                    "Post 2"
                ]);

            }, 2000);
        }
    );
}


function fetchComments(posts) {

    console.log(
        "6. Fetching comments..."
    );

    return new Promise(
        (resolve) => {

            setTimeout(() => {

                console.log(
                    "7. Comments fetched"
                );

                resolve([
                    "Comment A",
                    "Comment B"
                ]);

            }, 2000);
        }
    );
}


// PROMISE CHAIN
fetchUser()

.then(user => {

    // CALL STACK:
    // then callback enters stack

    // MICROTASK QUEUE:
    // Promise resolution handled here

    console.log(
        "User:",
        user
    );

    return fetchPosts(user);
})

.then(posts => {

    console.log(
        "Posts:",
        posts
    );

    return fetchComments(posts);
})

.then(comments => {

    console.log(
        "Comments:",
        comments
    );
})

.catch(error => {

    console.error(
        "Error:",
        error
    );
});


console.log(
    "8. Script ended"
);