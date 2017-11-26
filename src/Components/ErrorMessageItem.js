import React, { Component } from 'react';
import {getErrorMessage} from '../Validation/ErrorMessages';

export default class ErrorMessageItem extends Component {
    render() {
        let errorMessage = getErrorMessage(this.props.fieldName, this.props.validationString);
        //console.log('error messge', errorMessage);
        //console.log('error message', this.props.validationString);
        // if(this.props.isRequired && !this.props.isValid) {
        //     errorMessage = ErrorMessages.isRequired(this.props.fieldName);
        // } else if (!this.props.isRequired && !this.props.isValid) {
        //     errorMessage = ErrorMessages.isRequired(this.props.fieldName);
        // } else {
        //     errorMessage = true;
        // }
        return errorMessage ? [<div key={this.props.fieldName}>
            <p className={"errorMessage errorMessage-"+this.props.childClass}>
                {errorMessage}
            </p>
        </div>] : [];
    }
}