import React, { Component } from 'react';
import './App.css';
import ContactForm from './Components/ContactForm';

class App extends Component {

    render() {
        return (
            <div className="App form-container" key="App">
                <div className="grid-center">
                    <h1>Kontaktandmed</h1>
                </div>
                <ContactForm/>
            </div>
        );
    }
}

export default App;
