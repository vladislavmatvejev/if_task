import React, { Component } from 'react';
import _ from 'lodash';
import ContactFormInputItem from './ContactFormInputItem';
import ContactFormAddressItem from './ContactFormAddressItem';
import ContactFormDropdownItem from './ContactFormDropdownItem';
import ContactFormButtonItem from './ContactFormButtonItem'

export default class ContactForm extends Component {
    constructor(){
        super();
        const data = [
            {
                field: 'fullname',
                title: 'Ees- ja perenimi',
                type: 'text',
                _isRequired: true,
                validation: 'yes'
            },
            {
                field: 'phone-number',
                title: 'Telefon',
                type: 'text',
                _isRequired: true
            },
            {
                field: 'email',
                title: 'E-post',
                type: 'text',
                _isRequired: true
            },
            {
                field: 'address-person',
                type: 'address',
                _isRequired: true
            },
            {
                field: 'different-address',
                type: 'radio',
                options: [
                    {
                        text: 'Kohaletometamine sama aadressile',
                        value: false
                    },
                    {
                        text: 'Kohaletometamine erinevale aadressile',
                        value: true
                    }
                ],
                _isRequired: true,
                conditional: ['physical-address'],
                defaultValue: false
            },
            {
                field: 'physical-address',
                type: 'address',
                _isRequired: true,
                isHidden: true
            },
            {
                field: 'terms',
                type: 'checkbox',
                options: [
                    {
                        text: 'Olen tingimustega tutvunud',
                        value: true
                    }
                ],
                _isRequired: true,
                defaultValue: false
            },
            {
                field: 'saveBtn',
                title: 'Salvesta',
                type: 'button',
                validation: 'yes'
            }
        ];

        this.state = {
            formData: _.clone(data),
            hiddenFields: this.getHiddenFields(data),
            requiredFields: this.getRequiredFields(data),
            isHidden: false
        };
        this.isFieldHidden = this.isFieldHidden.bind(this);
    }

    getHiddenFields(data) {
        return data.filter(hidden => hidden.isHidden);
    }

    getRequiredFields(data) {
        return data.filter(required => required._isRequired);
    }

    isFieldHiddenHere(item) {
        return this.state.hiddenFields.find(field => field.field === item.field);
    }

    handleChangeValue = e => this.setState(
            {
                isHidden: e.target.value
            }
        );
    isFieldHidden(hidden) {
        this.setState({ isHidden: hidden });
        console.log('hidden ', this.state.isHidden);
    };
    render() {
        console.log('state', this.state);
        var data = this.state.formData || "";
        let hiddenField = data.isHidden || false;
        var menuContent;
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
                    switch (inputRow.type) {
                        case "text" :
                            return <ContactFormInputItem data={inputRow} key={field} />;
                        case "address" :
                            return !this.isFieldHiddenHere(inputRow.field) && this.state.isHidden ?
                                [<ContactFormAddressItem
                                    data={inputRow}
                                    key={field}
                                />] :
                                [''];
                        case "dropdown" :
                            return <ContactFormDropdownItem data={inputRow} key={field} />;
                        case "button" :
                            return <ContactFormButtonItem data={inputRow} key={field} />
                        default:
                            return <ContactFormInputItem
                                data={inputRow}
                                key={field}
                                hiddenField={this.state.hiddenField}
                                isFieldHidden={this.isFieldHidden}
                                onChangeValue={this.handleChangeValue}
                            />;
                    }
                }
            );
        }

        return [menuContent];
    }
}