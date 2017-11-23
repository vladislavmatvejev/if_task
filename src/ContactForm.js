import React, { Component } from 'react';
import _ from 'lodash';
import ContactFormInputItem from './ContactFormInputItem';
import ContactFormAddressItem from './ContactFormAddressItem';
import ContactFormDropdownItem from './ContactFormDropdownItem';
import ContactFormButtonItem from './ContactFormButtonItem';
import formDataSet from './formDataSet.json';

function setInitialValues(data) {
    return data.filter(fields => fields.field && fields.type !== 'button')
        .map(field => {
            return field.field === 'address-person' || field.field === 'physical-address' ?
                {[field.field]: {value: {address: '', alevik: '', city: ''}}} :
                {[field.field]: {value: '' || field.defaultValue}};
        });
}

function setInitialStateForRequired(data) {
    return data.map(field => {
        return {[field.field]:
            {
                isValid: !field._isRequired ,
                validationType: field.validation ? field.validation : null
            }
        };
    })
}

function getRequiredFields(data) {
    return data
        .filter(required => required._isRequired)
        .map(field => {
            return field.field;
        });
}

export default class ContactForm extends Component {
    constructor(){
        super();
        const data = JSON.parse(JSON.stringify(formDataSet));

        this.state = {
            formData: _.clone(data),
            requiredFields: getRequiredFields(data),
            values: setInitialValues(data),
            isHidden: false,
            fieldValidation: setInitialStateForRequired(data),
            isFormValid: false
        };
    }

    checkIfFormIsValid() {
        console.log(this.state.fieldValidation);
        return this.state.fieldValidation;
    }

    changeValidationStatus = (fieldName, fieldValue, fieldStatus) => {
        let fieldVal = fieldValue !== '';
        let isValid = typeof(fieldStatus) !== 'undefined' ? fieldStatus : fieldVal;
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

    getValidationTypeByFieldName(fieldName) {
        return this.state.fieldValidation.find(field => {
            return _.has(field, fieldName);
        })[fieldName].validationType;
    }

    getValidationSiblingByFieldName(fieldName) {
        let siblingField = this.getValidationTypeByFieldName(fieldName) !== null ?
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

    getValueByFieldName(fieldName) {
        return this.state.values.find(field => {
            return field[fieldName]
        })[fieldName];
    }

    updateStateObject(fieldName, fieldValue) {
        return this.state.values.map(fields => {
            return _.has(fields, fieldName) ?
                {[fieldName]: {value: fieldValue}} :
                fields;
        });
    }

    isFieldRequired(fieldName) {
        return _.includes(this.state.requiredFields, fieldName);
    };

    handleChangeValue = (fieldValue, fieldName) => {
        let newState = this.updateStateObject(fieldName, fieldValue);
        this.setState(
            {
                isHidden: fieldName === 'terms' ? this.state.isHidden : JSON.parse(fieldValue),
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
        this.checkIfFormIsValid();
        let data = this.state.formData || "";
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
            menuContent = data.map((inputRow, index) =>
                {
                    let field = inputRow.field;
                    let sibling = this.getValidationSiblingByFieldName(field);
                    let siblindStatus = sibling ? this.getFieldValidationStatusByName(sibling) : null;
                    let validationStatus = this.getFieldValidationStatusByName(field);
                    let required = siblindStatus !== null ?
                        siblindStatus :
                        validationStatus;
                    //console.log(field, required, siblindStatus);
                    switch (inputRow.type) {
                        case "text" :
                            return <ContactFormInputItem
                                data={this.getFieldByName(field)}
                                key={field}
                                value={this.getValueByFieldName(field).value}
                                onChangeValue={this.handleChangeInput}
                                isRequired={required}
                                validationType={
                                    this.getValidationTypeByFieldName(field) ? this.getValidationTypeByFieldName(field) :
                                        null}
                            />;
                        case "address" :
                            return <ContactFormAddressItem
                                data={this.getFieldByName(field)}
                                key={field}
                                value={this.getValueByFieldName(field).value}
                                onChangeValue={this.handleChangeInput}
                                isRequired={this.getFieldValidationStatusByName(field)}
                            />;
                        case "address-conditional" :
                            return this.state.isHidden ?
                                [<ContactFormAddressItem
                                    data={this.getFieldByName(field)}
                                    key={field}
                                    value={this.getValueByFieldName(field).value}
                                    onChangeValue={this.handleChangeInput}
                                    isHidden={this.state.isHidden}
                                />] : [];
                        case "dropdown" :
                            return <ContactFormDropdownItem
                                data={this.getFieldByName(field)}
                                key={field}
                                value={this.getValueByFieldName(field).value}
                                isRequired={this.getFieldValidationStatusByName(field)}
                            />;
                        case "button" :
                            return <ContactFormButtonItem
                                data={this.getFieldByName(field)}
                                buttonId={field}
                                key={field}
                            />;
                        default: //checkboxes and radio-buttons
                            return <ContactFormInputItem
                                data={this.getFieldByName(field)}
                                key={field}
                                hiddenField={this.state.isHidden}
                                onChangeValue={this.handleChangeValue}
                                value={this.getValueByFieldName(field).value}
                                isRequired={this.isFieldRequired(field)}
                            />;
                    }
                }
            );
        }

        return [menuContent];
    }
}