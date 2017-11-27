import React, { Component } from 'react';
import ErrorMessageItem from './ErrorMessageItem';

export default class ContactFormInputItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkedValue: this.props.data.defaultValue,
            inputValue: this.props.value,
            isRequired: false,
            isInputValid: this.props.validationType ? this.props.validationType : true
        };
        this.inputChangeValue = this.inputChangeValue.bind(this);
    }

    inputChangeValue = (fieldValue, field) => {
        this.props.onChangeValue(fieldValue, field);
        this.setState({inputValue: fieldValue});
    };

    render() {
        let inputContent;
        let data = this.props.data;
        let type = data.type;
        let field = this.props.idValue ? this.props.idValue : data.field;
        let checkedValue = this.state.checkedValue;
        let title = data.title || "";
        let value = this.state.inputValue;
        let options;

        switch (type) {
            case 'radio' :
                options = data.options.map((option, index) => {
                    return (
                        <div className="grid" key={field+"-"+index}>
                            <div className="col-5 col_sm-11"></div>
                            <div className="col-7 col_sm-11">
                                <input
                                    type={type}
                                    key={field+"-input-"+index}
                                    value={option.value}
                                    name={field}
                                    id={field+"-"+index}
                                    onChange={e => this.props.onChangeValue(e.target.value, field, e)}
                                    defaultChecked={checkedValue === option.value}
                                />
                                <label htmlFor={field+"-"+index} key={field+"-label-"+index}>{option.text}</label>
                            </div>
                        </div>
                    );
                });
                inputContent = [options];
                break;
            case 'checkbox' :
                options = data.options.map((option, index) => {
                    return (
                        <div className="grid" key={field+"-"+index}>
                            <div className="col-5 col_sm-11"></div>
                            <div className="col-7 col_sm-11">
                                <input
                                    type={type}
                                    key={field+"-input-"+index}
                                    value={option.value}
                                    name={field} id={field+"-"+index}
                                    onChange={e => this.inputChangeValue(e.target.value, field, e)}
                                    defaultChecked={checkedValue === option.value}
                                />
                                <label htmlFor={field+"-"+index} key={field+"-label-"+index}>{option.text}</label>
                                <div>
                                    <ErrorMessageItem
                                        childClass={type}
                                        fieldName={option.text}
                                        isRequired={this.state.isRequired}
                                        validationString={this.props.validationString}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                });
                inputContent = [options];
                break;
            default :
                inputContent = <div className="grid" key={field}>
                    <div className="col-5 col_sm-11">
                        <label className="to-right" htmlFor={field} key={field+"-label"}>
                            {title}
                        </label>
                    </div>
                    <div className="col-7 col_sm-11">
                        <input
                            type={type}
                            id={field}
                            key={field+"-input"}
                            onChange={e => this.inputChangeValue(e.target.value, field, e)}
                            value={type === 'text' ? value : ''}
                        />
                    </div>
                    <div className="col-5 sm-hidden"></div>
                    <div className="col-7 col_sm-11">
                        <ErrorMessageItem
                            childClass={type}
                            fieldName={title}
                            isRequired={this.state.isRequired}
                            validationString={this.props.validationString}
                        />
                    </div>
                </div>;
        }

        return [inputContent];
    }
}



