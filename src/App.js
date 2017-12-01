import React, { Component } from 'react';
import axios from 'axios';
import './css/App.css';
import Clock from './components/Clock';
import logo from './images/logo.svg';
import moment from 'moment'

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

  formatTimeToHourOfDay(time){
    return moment(time).format("hh:mm a");
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
    const akiraStatus = 'We are ' + (this.state.openForBusiness ? 'open today!' : 'closed today.');
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} alt="Akira Logo"/>
          <h1>{akiraStatus}</h1>
        </div>

        <h2>{this.formatTimeToHourOfDay(this.state.operationHours.open_at)}</h2>
        <h2>{this.formatTimeToHourOfDay(this.state.operationHours.closed_at)}</h2>

        <Clock initialTime={this.state.time}/>
      </div>
    );
  }
}

export default App;
