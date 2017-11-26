const validators = {
    email: {
        rules: [
            {
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
            }
        ]
    },
    number: {
        rules: [
            {
                pattern: /^[\d ()+-]+$/
            }
        ]
    },
    required: {
        rules: [
            {
                pattern: (value) => value !== ''
            }
        ]
    },
    minLength: {
        rules: [
            {
                pattern: (value, minLength) => value.length >= minLength
            }
        ]
    }
};

export const validateField = (validationString, fieldValue, minLength) => {
    let valid = validationString;
    validators[validationString].rules.forEach(rule => {
        let isValid = 'valid';
        if (rule.pattern instanceof RegExp) {
            if (!rule.pattern.test(fieldValue)) {
                return false;
            } else {
                valid = isValid;
            }
        } else if (typeof rule.pattern === 'function') {
            if (!rule.pattern(fieldValue, minLength)) {
                return false;
            } else {
                valid = isValid;
            }
        }
    });
    return valid;
};

export const required = (value) => {
    if (value) {
        return false;
    } else {
        return true;
    }
};