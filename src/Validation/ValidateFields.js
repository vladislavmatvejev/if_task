export const validateField = (field, value) => {
    let errorType = field.type;
    let pattern;
    switch (errorType) {
        case "number":
            pattern = /^[\d ()+-]+$/;
            return pattern.test(value);
        case "email":
            pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            return pattern.test(value);
        case "oneOfTwo":
            return "one of two should be validated";
        default:
            break;
    }
};

export const required = (value) => {
    if (value) {
        return false;
    } else {
        return true;
    }
};