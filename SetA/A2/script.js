// EMAIL VALIDATOR
function validateEmail(email) {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return {
            valid: false,
            error: "Invalid email format"
        };
    }

    return {
        valid: true,
        error: null
    };
}


// PHONE NUMBER VALIDATOR
function validatePhone(phone) {

    // Supports:
    // +2348012345678
    // 08012345678
    // (080)123-4567
    // 080-1234-5678

    const phoneRegex =
        /^(\+?\d{1,3})?[-.\s()]?(\d{3,4})[-.\s()]?(\d{3,4})[-.\s()]?(\d{3,4})$/;

    if (!phoneRegex.test(phone)) {
        return {
            valid: false,
            error: "Invalid phone number format"
        };
    }

    return {
        valid: true,
        error: null
    };
}


// STRONG PASSWORD VALIDATOR
function validatePassword(password) {

    const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!strongPasswordRegex.test(password)) {
        return {
            valid: false,
            error:
                "Password must contain uppercase, lowercase, number, special character and minimum 8 characters"
        };
    }

    return {
        valid: true,
        error: null
    };
}


// URL VALIDATOR
function validateURL(url) {

    const urlRegex =
        /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;

    if (!urlRegex.test(url)) {
        return {
            valid: false,
            error: "Invalid URL format"
        };
    }

    return {
        valid: true,
        error: null
    };
}


// DATE VALIDATOR (YYYY-MM-DD)
function validateDate(date) {

    const dateRegex =
        /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(date)) {
        return {
            valid: false,
            error:
                "Date must be in YYYY-MM-DD format"
        };
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return {
            valid: false,
            error: "Invalid date"
        };
    }

    return {
        valid: true,
        error: null
    };
}


// TESTING
console.log(validateEmail("test@gmail.com"));
console.log(validatePhone("+2348012345678"));
console.log(validatePassword("Strong@123"));
console.log(validateURL("https://google.com"));
console.log(validateDate("2025-01-15"));