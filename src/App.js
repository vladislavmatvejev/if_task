import React, { Component } from 'react';
import './App.css';
import ContactForm from './ContactForm';

class App extends Component {

    render() {
        return (<div className="App" key="App">
            <div className="App-intro" key="App-intro">
                <ContactForm/>
            </div>
        </div>);
    }
}

export default App;
