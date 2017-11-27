import React, { Component } from 'react';
import {getErrorMessage} from '../Validation/ErrorMessages';

export default class ErrorMessageItem extends Component {
    render() {
        let errorMessage = getErrorMessage(this.props.fieldName, this.props.validationString);

        return errorMessage ? [<div key={this.props.fieldName}>
            <p className={"errorMessage errorMessage-"+this.props.childClass}>
                {errorMessage}
            </p>
        </div>] : [];
    }
}