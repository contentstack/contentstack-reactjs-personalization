// App Main Component 

/**
 * Module dependencies.
 */

import React, { Component } from "react";
import './staticAssets/css/style.css'
import Header from '../src/components/Header'



class App extends Component {

  render() {

    return (
      <div className="App">
        <Header />  
      </div>
    );
  }
}

export default App;
