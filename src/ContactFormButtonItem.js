import React, { Component } from 'react'

export default class ContactFormButtonItem extends Component {
    render() {
        return <button>{this.props.data.title}</button>
    }
}