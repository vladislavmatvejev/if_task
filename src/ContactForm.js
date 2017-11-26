import React, { Component } from 'react';
import _ from 'lodash';
import ContactFormInputItem from './ContactFormInputItem';
import ContactFormAddressItem from './ContactFormAddressItem';
import ContactFormDropdownItem from './ContactFormDropdownItem';
import ContactFormButtonItem from './ContactFormButtonItem';
import {validateField} from './Validation/ValidateFields';
import formDataSet from './formDataSet.json';

function setInitialValues(data) {
    return data.filter(fields => fields.field && fields.type !== 'button')
        .map(field => {
            return field.field === 'address-person' || field.field === 'physical-address' ?
                {
                    [field.field]: {
                        value: {address: '', alevik: '', city: ''},
                        validationString: field.field === 'address-person' ? 'required' : 'valid',
                        sibling: field.siblingField ? field.siblingField : null
                    }
                } :
                {
                    [field.field]: {
                        value: field.defaultValue !== undefined ? field.defaultValue : '',
                        validationString: field.validation ? 'required' : 'valid',
                        sibling: field.siblingField ? field.siblingField : null
                    }
                };
        });
}

function setInitialStateForRequired(data) {
    return data.map(field => {
        return {[field.field]:
            {
                isValid: false,
                validationType: field.validation ? field.validation : null
            }
        };
    })
}

export default class ContactForm extends Component {
    constructor(){
        super();
        const data = JSON.parse(JSON.stringify(formDataSet));

        this.state = {
            formData: _.clone(data),
            values: setInitialValues(data),
            isHidden: false,
            fieldValidation: setInitialStateForRequired(data),
            isFormValid: false
        };

        this.changeValidationStatus = this.changeValidationStatus.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleChangeValue = this.handleChangeValue.bind(this);
        this.checkIfFormIsValid = this.checkIfFormIsValid.bind(this);
        this.getValidationSiblingByFieldName = this.getValidationSiblingByFieldName.bind(this);
        this.getValidationTypeByFieldName = this.getValidationTypeByFieldName.bind(this);
        this.getFieldValidationStatusByName = this.getFieldValidationStatusByName.bind(this);
        this.getFieldByName = this.getFieldByName.bind(this);
        this.getValueFieldByFieldName = this.getValueFieldByFieldName.bind(this);
        this.updateStateObject = this.updateStateObject.bind(this);
        this.isFieldRequired = this.isFieldRequired.bind(this);
        this.getValidatorsByField = this.getValidatorsByField.bind(this);
        this.validateFieldByName = this.validateFieldByName.bind(this);
        this.updateFieldValidationStatusByName = this.updateFieldValidationStatusByName.bind(this);
    }

    getValidatorsByField = (fieldName) => {
        return this.state.formData.find(field => field.field === fieldName).validation;
    };

    validateFieldByName = (fieldValue, fieldName) => {
        let validationString;

        this.getValidatorsByField(fieldName).some(validator => {
            let validationValue = validator.value ? validator.value : null;
            validationString = validateField(validator.type, fieldValue, validationValue);
            if (validationString !== 'valid') {
                return true;
            }

            return false;
        });

        return validationString;
    };

    checkIfFormIsValid() {
        let allFields = this.state.formData.map(value => value.field);
        _.remove(allFields, (x) => x === 'saveBtn');
        let validations = allFields.map(field => {
            let f = this.state.values.find(value => {
                return _.has(value, field);
            });
            return f[field].validationString;
        });
        console.log(_.without(validations, 'valid'));
        return _.without(validations, 'valid').length === 0;
    };

    getValidationTypeByFieldName(fieldName) {
        return this.state.fieldValidation.find(field => {
            return _.has(field, fieldName);
        })[fieldName].validationType;
    }

    getValidationSiblingByFieldName(fieldName) {
        let siblingField = this.getValidationTypeByFieldName(fieldName)[1].siblingField !== null ?
            this.getValidationTypeByFieldName(fieldName)[1].siblingField : null;
        return siblingField;
    }

    getFieldValidationStatusByName(fieldName) {
        return !this.state.fieldValidation.find(field => {
            return _.has(field, fieldName);
        })[fieldName].isValid;
    }

    getFieldByName(fieldName) {
        return this.state.formData.find(field => field.field === fieldName);
    }

    getValueFieldByFieldName(fieldName) {
        return this.state.values.find(field => {
            return _.has(field, fieldName);
        })[fieldName];
    }

    clearSiblingValidationStatus = (fieldName) => {
        return this.updateFieldValidationStatusByName(fieldName, 'required');
    };

    updateFieldValidationStatusByName = (fieldName, validationStatus) => {
        let newState = this.state.values.map(field => {
            return _.has(field, fieldName) ? field[fieldName].validationString = validationStatus : field;
        });
        return this.setState(
            {
                values: newState
        });
    };

    updateStateObject(fieldName, fieldValue) {
        let validationString = fieldName !== 'different-address' ?
            this.validateFieldByName(fieldValue, fieldName) :
            'valid';
        let sibling = this.getValueFieldByFieldName(fieldName).sibling;

        if (sibling) {
            let siblingValidtionStatus = this.getValueFieldByFieldName(sibling).validationString;
            if (validationString === 'valid' && siblingValidtionStatus !== 'valid') {
                this.updateFieldValidationStatusByName(sibling, validationString);
            } else if (validationString === 'required') {
                this.updateFieldValidationStatusByName(sibling, validationString);
            } else if (validationString !== 'valid' && siblingValidtionStatus === 'valid') {
                this.updateFieldValidationStatusByName(sibling, siblingValidtionStatus);
            } else if (validationString === 'required' && siblingValidtionStatus === 'valid') {
                this.updateFieldValidationStatusByName(sibling, siblingValidtionStatus);
            }
        }
        return this.state.values.map(fields => {
            return _.has(fields, fieldName) ?
                {[fieldName]:
                    {
                        value: fieldValue,
                        validationString: validationString,
                        sibling: sibling
                    }
                } :
                fields;
        });
    }

    isFieldRequired(fieldName) {
        let field =  this.state.fieldValidation
            .find(field => {
                return _.has(field, fieldName);
            })[fieldName].validationType;
        return field !== null ? _.includes(field[0], "required") : false;
    };

    changeValidationStatus = (fieldName, fieldValue, fieldStatus) => {
        let fieldVal = fieldValue !== '';
        let isValid = fieldStatus !== undefined ? fieldStatus : fieldVal;
        return this.state.fieldValidation.map(field => {
            return _.has(field, fieldName) ?
                {
                    [fieldName]:
                        {
                            isValid: isValid,
                            validationType: this.getValidationTypeByFieldName(fieldName)
                        }
                } : field;
        });
    };

    handleChangeValue = (fieldValue, fieldName) => {
        let checkValue = JSON.parse(fieldValue);
        if (fieldName === 'different-address' && checkValue) {
            this.updateFieldValidationStatusByName('physical-address', 'required');
        } else if (fieldName === 'different-address' && !checkValue) {
            this.updateFieldValidationStatusByName('physical-address', 'valid');
        }
        let newState = this.updateStateObject(fieldName, fieldValue);
        this.setState(
            {
                isHidden: fieldName === 'terms' ? this.state.isHidden : checkValue,
                values: newState
            }
        );
    };
    handleChangeInput = (fieldValue, fieldName, validStatus) => {
        let newValueState = this.updateStateObject(fieldName, fieldValue);
        let newValidationState = this.changeValidationStatus(fieldName, fieldValue, validStatus);
        this.setState(
            {
                values: newValueState,
                fieldValidation: newValidationState
            }
        );
    };

    render() {
        let data = this.state.formData || "";
        console.log(this.state);
        console.log(!this.checkIfFormIsValid());
        let menuContent;
        if (data.length === 0) {
            menuContent = (
                <div>
                    <span>
                        Nothing to show
                    </span>
                </div>
            );
        } else {
            menuContent = data.map((inputRow) =>
                {
                    let field = inputRow.field;
                    switch (inputRow.type) {
                        case "text" :
                            return <ContactFormInputItem
                                data={this.getFieldByName(field)}
                                key={field}
                                value={this.getValueFieldByFieldName(field).value}
                                validationString={this.getValueFieldByFieldName(field).validationString}
                                isValid={this.getValueFieldByFieldName(field).isValid}
                                onChangeValue={this.handleChangeInput}
                            />;
                        case "address" :
                            return <ContactFormAddressItem
                                data={this.getFieldByName(field)}
                                key={field}
                                value={this.getValueFieldByFieldName(field).value}
                                isValid={this.getValueFieldByFieldName(field).isValid}
                                onChangeValue={this.handleChangeInput}
                            />;
                        case "address-conditional" :
                            return this.state.isHidden ?
                                [<ContactFormAddressItem
                                    data={this.getFieldByName(field)}
                                    key={field}
                                    value={this.getValueFieldByFieldName(field).value}
                                    isValid={this.getValueFieldByFieldName(field).isValid}
                                    onChangeValue={this.handleChangeInput}
                                    isHidden={this.state.isHidden}
                                />] : [];
                        case "dropdown" :
                            return <ContactFormDropdownItem
                                data={this.getFieldByName(field)}
                                key={field}
                                value={this.getValueFieldByFieldName(field).value}
                                validationString={this.getValueFieldByFieldName(field).validationString}
                                isValid={this.getValueFieldByFieldName(field).isValid}
                            />;
                        case "button" :
                            return <ContactFormButtonItem
                                data={this.getFieldByName(field)}
                                disabled={!this.checkIfFormIsValid()}
                                buttonId={field}
                                key={field}
                            />;
                        default: //checkboxes and radio-buttons
                            return <ContactFormInputItem
                                data={this.getFieldByName(field)}
                                key={field}
                                hiddenField={this.state.isHidden}
                                onChangeValue={this.handleChangeValue}
                                value={this.getValueFieldByFieldName(field).value}
                                validationString={this.getValueFieldByFieldName(field).validationString}
                                isValid={this.getValueFieldByFieldName(field).isValid}
                            />;
                    }
                }
            );
        }

        return [menuContent];
    }
}