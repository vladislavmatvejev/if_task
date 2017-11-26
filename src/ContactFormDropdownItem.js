import React, { Component } from 'react';
import ErrorMessageItem from './Components/ErrorMessageItem';
import DropDown from 'react-select';
import {required} from './Validation/ValidateFields';
import '../node_modules/react-select/dist/react-select.css';

export default class ContactFormDropdownItem extends Component {
    constructor(props) {
        super(props);
        this.updateValue = this.updateValue.bind(this);
        this.state = {
            selectValue: '',
            isRequired: this.props.isRequired
        }
        this.updateValue = this.updateValue.bind(this);
    }
    updateValue(newValue) {
        this.setState({
            selectValue: newValue,
            isRequired: required(newValue)
        });
        this.props.onChangeValue(newValue);
    }
    render() {
        const data = this.props.data;
        let label = data.title;
        let options = data.options.map((option) => {
            return {value: option, label: option};
        });
        return <div className="grid">
            <div className="col-5 col_sm-11">
                <label className="to-right">{label}</label>
            </div>
            <div className="col-7 col_sm-11">
                <DropDown
                    id={data.type}
                    name={data.type}
                    options={options}
                    simpleValue
                    value={this.state.selectValue}
                    onChange={this.updateValue}
                    clearable={false}
                    searchable={false}
                    placeholder="Vali"
                />
            </div>
            <div className="col-5 sm-hidden"></div>
            <div className="col-7 col_sm-11">
                <ErrorMessageItem
                    childClass={data.type}
                    fieldName={label}
                    isRequired={this.state.isRequired}
                    validationString={this.props.validationString}
                />
            </div>
        </div>;
    }
}


/*<div className="grid-3">
    <div className="col-5 col_sm-11">
        <label className="to-right">{label}</label>
    </div>
    <div className="col-7 col_sm-11">
        <select>{options}</select>
    </div>
</div>*/