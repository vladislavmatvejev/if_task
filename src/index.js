import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import ReadOnlyForm from './Components/ReadOnlyForm';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App}/>
            <Route path="/read-only" component={ReadOnlyForm} something={'foo'}/>
        </div>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();