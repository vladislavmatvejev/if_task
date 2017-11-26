const isRequired = fieldName => `${fieldName} is required`;
const shouldBeNumber = fieldName => `${fieldName} should be number`;
const shouldBeEmail = fieldName => `${fieldName} should have email format`;
const shouldBeLonger = fieldName => `${fieldName} is too short`;

export const getErrorMessage = (fieldName, validationType) => {
    switch (validationType) {
        case "required":
            return isRequired(fieldName);
        case "number":
            return shouldBeNumber(fieldName);
        case "email":
            return shouldBeEmail(fieldName);
        case "minLength":
            return shouldBeLonger(fieldName);
        default:
            break;
    }
};