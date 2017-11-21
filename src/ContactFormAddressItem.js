import React, { Component } from 'react';
import _ from 'lodash';
import ContactFormInputItem from './ContactFormInputItem';
import ContractFormDropdownItem from './ContactFormDropdownItem';

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
                type: 'text'
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
            addressData: _.clone(addressData)
        }
    }

    render() {
        let addressData = this.state.addressData;
        return [<ContactFormInputItem data={addressData[0]} key={addressData[0].field+"-0"}/>,
                <ContactFormInputItem data={addressData[1]} key={addressData[1].field+"-1"}/>,
                <ContractFormDropdownItem data={addressData[2]} key={addressData[2].field+"-2"}/>]
    }
}