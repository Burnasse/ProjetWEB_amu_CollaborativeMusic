import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Join from './ChatComponent/Join/Join';
import MusicRoom from "./MusicRoom";
import "./App.css";

class App extends React.Component{
    render() {
        return (<Router>
            <Route path = "/" exact component={Join} />
            <Route path= "/musicroom" component={MusicRoom} />
        </Router>)
    }
}

export default App;