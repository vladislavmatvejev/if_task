import React, { Component } from 'react'

export default class ContactFormButtonItem extends Component {
    render() {
        return <div className="grid-right">
                <button type="submit" id={this.props.buttonId} className="submitForm">{this.props.data.title}</button>
        </div>
    }
}