import React from "react";
import {Route} from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

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