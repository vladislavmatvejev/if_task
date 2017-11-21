import React, { Component } from 'react';

export default class ContactFormDropdownItem extends Component {
    render() {
        var data = this.props.data;
        var label = data.title;
        var options = data.options.map((option, index) => {
            return <option value={option} key={index}>{option}</option>;
        });
        return <div><label>{label}</label><select>{options}</select></div>;
    }
}