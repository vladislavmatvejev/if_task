import React, { Component } from 'react';
import _ from 'lodash';
import ContactFormInputItem from './ContactFormInputItem';
import ContractFormDropdownItem from './ContactFormDropdownItem';
import {validateField} from '../Validation/ValidateFields';

export default class ContactFormAddressItem extends Component {

    constructor(props) {
        super(props);
        const data = this.props.data;
        let field = data.field;

        const addressData = [
            {
                field: field,
                fieldId: 'address',
                title: 'Tänav, maja, korter',
                type: 'text',
                validation : [
                    {
                        type: "required"
                    },
                    {
                        type: "minLength",
                        value: 6
                    }
                ]
            },
            {
                field: field,
                fieldId: 'alevik',
                title: 'Küla/alevik',
                type: 'text',
                validation : false
            },
            {
                field: field,
                fieldId: 'city',
                title: 'Linn/maakond',
                type: 'dropdown',
                options: ['Tallinn', 'Tartu', 'Narva'],
                validation : [
                    {
                        type: "required"
                    }
                ]
            }
        ];

        this.state = {
            addressData: _.clone(addressData),
            values: [{
                address: {value: this.props.value.address, validationString: 'required'},
                alevik: {value: this.props.value.alevik, validationString: 'valid'},
                city: {value: this.props.value.city, validationString: 'required'}
            }],
            isAddressValid: !this.props.isRequired
        };
        this.getValidatorsByField = this.getValidatorsByField.bind(this);
        this.handleChangeAddressFields = this.handleChangeAddressFields.bind(this);
    }

    getFieldName(fieldId) {
        switch (fieldId) {
            case "physical-address-0":
            case "address-person-0":
                return "address";
            case "physical-address-1":
            case "address-person-1":
                return "alevik";
            default:
                return "city";
        }
    }

    getValidatorsByField = (fieldName) => {
        return this.state.addressData.find(field => field.fieldId === fieldName).validation;
    };

    handleChangeAddressFields = (fieldValue, field = 'city') => {
        let fieldName = this.getFieldName(field);
        let validationString;

        if(this.getValidatorsByField(fieldName)){
            this.getValidatorsByField(fieldName).some(validator => {
                let validationValue = validator.value ? validator.value : null;
                validationString = validateField(validator.type, fieldValue, validationValue);
                if (validationString !== 'valid') {
                    return true;
                }
                return false;
            });
        }

        let newState = this.state.values.map(fields => {
            fields[fieldName].value = fieldValue;
            fields[fieldName].validationString = validationString;
            return fields;
        });

        let check = this.state.values[0].city.validationString === 'valid' &&
                    this.state.values[0].address.validationString === 'valid';
        this.setState({values: newState, isAddressValid: check});
        if (check) {
            this.props.onChangeValue(newState[0], this.props.data.field, check);
        }
    };

    render() {
        let addressData = this.state.addressData;
        let values = this.state.values[0];
        return [
            <ContactFormInputItem
                data={addressData[0]}
                key={addressData[0].field+"-0"}
                idValue={addressData[0].field+"-0"}
                value={values.address.value}
                onChangeValue={this.handleChangeAddressFields}
                validationString={values.address.validationString}
            />,
            <ContactFormInputItem
                data={addressData[1]}
                key={addressData[1].field+"-1"}
                idValue={addressData[0].field+"-1"}
                value={values.alevik.value}
                onChangeValue={this.handleChangeAddressFields}
            />,
            <ContractFormDropdownItem
                data={addressData[2]}
                key={addressData[2].field+"-2"}
                idValue={addressData[0].field+"-2"}
                value={values.city.value}
                onChangeValue={this.handleChangeAddressFields}
                validationString={values.city.validationString}
            />
        ];
    }
}