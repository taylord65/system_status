import React, { Component } from 'react';
import axios from 'axios';
import './css/App.css';
import Clock from './components/Clock';
import logo from './images/logo.svg';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      openForBusiness: null,
      operationHours: {
        open_at: null,
        closed_at: null
      },
      time: null
    };
  }

  componentDidMount() {
    axios.get('https://app.akira.md/api/system_status')
      .then(res => {
        const systemStatus = res.data;
        
        this.setState({
          openForBusiness: systemStatus.is_open_for_business,
          operationHours: {
            open_at: systemStatus.open_hours_today.open_at,
            closed_at: systemStatus.open_hours_today.close_at
          },
          time: systemStatus.system_time
        });
      });
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} alt="Akira Logo"/>
        </div>

        <Clock/>

      </div>
    );
  }
}

export default App;
