// CUSTOM MAP
function myMap(array, callback) {

    const result = [];

    for (let i = 0; i < array.length; i++) {

        result.push(
            callback(array[i], i, array)
        );
    }

    return result;
}


// CUSTOM FILTER
function myFilter(array, callback) {

    const result = [];

    for (let i = 0; i < array.length; i++) {

        if (
            callback(array[i], i, array)
        ) {
            result.push(array[i]);
        }
    }

    return result;
}


// CUSTOM REDUCE
function myReduce(
    array,
    callback,
    initial
) {

    let accumulator = initial;
    let startIndex = 0;

    if (accumulator === undefined) {
        accumulator = array[0];
        startIndex = 1;
    }

    for (
        let i = startIndex;
        i < array.length;
        i++
    ) {

        accumulator =
            callback(
                accumulator,
                array[i],
                i,
                array
            );
    }

    return accumulator;
}


// CUSTOM FLAT
function myFlat(
    array,
    depth = 1
) {

    const result = [];

    function flatten(arr, currentDepth) {

        for (let i = 0; i < arr.length; i++) {

            if (
                Array.isArray(arr[i]) &&
                currentDepth > 0
            ) {

                flatten(
                    arr[i],
                    currentDepth - 1
                );

            } else {

                result.push(arr[i]);
            }
        }
    }

    flatten(array, depth);

    return result;
}


// DEBOUNCE
function myDebounce(fn, delay) {

    let timeoutId;

    return function (...args) {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}


// THROTTLE
function myThrottle(fn, limit) {

    let waiting = false;

    return function (...args) {

        if (!waiting) {

            fn.apply(this, args);

            waiting = true;

            setTimeout(() => {
                waiting = false;
            }, limit);
        }
    };
}



// =====================
// TESTING
// =====================

// myMap
console.log(
    myMap([1, 2, 3], num => num * 2)
);

// myFilter
console.log(
    myFilter(
        [1, 2, 3, 4],
        num => num > 2
    )
);

// myReduce
console.log(
    myReduce(
        [1, 2, 3, 4],
        (acc, num) => acc + num,
        0
    )
);

// myFlat
console.log(
    myFlat(
        [1, [2, [3, 4]]],
        2
    )
);


// Debounce Test
const debouncedFunction =
    myDebounce(() => {
        console.log("Debounced!");
    }, 1000);

debouncedFunction();
debouncedFunction();
debouncedFunction();


// Throttle Test
const throttledFunction =
    myThrottle(() => {
        console.log("Throttled!");
    }, 2000);

throttledFunction();
throttledFunction();
throttledFunction();