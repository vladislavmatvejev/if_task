import React, { Component } from 'react';
import _ from 'lodash';
import ContactFormInputItem from './ContactFormInputItem';
import ContractFormDropdownItem from './ContactFormDropdownItem';
import {required} from './Validation/ValidateFields';

export default class ContactFormAddressItem extends Component {

    constructor(props) {
        super(props);
        const data = this.props.data;
        let field = data.field;

        const addressData = [
            {
                field: field,
                title: 'Tänav, maja, korter',
                type: 'text',
                _isRequired: true
            },
            {
                field: field,
                title: 'Küla/alevik',
                type: 'text',
                _isRequired: false
            },
            {
                field: field,
                title: 'Linn/maakond',
                type: 'dropdown',
                options: ['Tallinn', 'Tartu', 'Narva'],
                _isRequired: true
            }
        ];

        this.state = {
            addressData: _.clone(addressData),
            values: [{
                address: this.props.value.address,
                alevik: this.props.value.alevik,
                city: this.props.value.city || ''
            }],
            isAddressValid: !this.props.isRequired
        }
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
    handleChangeAddressFields = (fieldValue, fieldName = 'city') => {
        let newState = this.state.values.map(fields => {
            fields[this.getFieldName(fieldName)] = fieldValue;
            return fields;
        });
        let check = this.state.values[0].city !== '' && this.state.values.address !== '';
        this.setState({values: newState, isAddressValid: check});
        this.props.onChangeValue(newState[0], this.props.data.field, check);
    };

    render() {
        let addressData = this.state.addressData;
        return [
            <ContactFormInputItem
                data={addressData[0]}
                key={addressData[0].field+"-0"}
                idValue={addressData[0].field+"-0"}
                value={this.state.address}
                onChangeValue={this.handleChangeAddressFields}
                isRequired={required(this.state.address)}
            />,
            <ContactFormInputItem
                data={addressData[1]}
                key={addressData[1].field+"-1"}
                idValue={addressData[0].field+"-1"}
                value={this.state.alevik}
                onChangeValue={this.handleChangeAddressFields}
            />,
            <ContractFormDropdownItem
                data={addressData[2]}
                key={addressData[2].field+"-2"}
                idValue={addressData[0].field+"-2"}
                value={this.state.city}
                onChangeValue={this.handleChangeAddressFields}
                isRequired={required(this.state.city)}
            />
        ];
    }
}