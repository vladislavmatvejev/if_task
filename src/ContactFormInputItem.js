import React, { Component } from 'react';

export default class ContactFormInputItem extends Component {
    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.state = {
            checkedValue: this.props.data.defaultValue,
            isHidden: this.props.data.isFieldHidden
        };
    }
    handleOnChange() {
        this.setState({
            checkedValue: this.state.checkedValue,
            isHidden: this.state.checkedValue
        });
        this.props.isFieldHidden(this.state.checkedValue);
    }
    render() {
        let inputContent;
        let data = this.props.data;
        let field = data.field;
        let type = data.type;
        let checkedValue = this.state.checkedValue;
        let title = data.title || "";

        switch (type) {
            case 'radio' :
            case 'checkbox' :
                let options = data.options.map((option, index) => {
                    return (
                        <div key={field+"-"+index}>
                            <input
                                type={type}
                                key={field+"-input-"+index}
                                value={option.value}
                                name={field} id={field+"-"+index}
                                onChange={this.props.onChangeValue}
                                defaultChecked={checkedValue === option.value}
                            />
                            <label htmlFor={field+"-"+index} key={field+"-label-"+index}>{option.text}</label>
                        </div>
                    );
                });
                inputContent = [options];
                break;
            default :
                inputContent = <div key={field}><label htmlFor={field} key={field+"-label"}>{title}</label><input type={type} id={field} key={field+"-input"} /></div>;
        }

        return [inputContent];
    }
}



