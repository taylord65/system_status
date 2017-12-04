import React, { Component } from 'react';
import axios from 'axios';
import './css/App.css';
import './css/animate.css';
import logo from './images/logo.svg';
import spinner from './images/spinner.svg';
import Clock from './components/Clock';
import moment from 'moment';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dataReady: false,
      openForBusiness: null,
      operationHours: {
        open_at: null,
        closed_at: null
      },
      time: null
    };
  }

  formatTimeToHourOfDay(time){
    return moment(time).format("ha");
  }

  componentDidMount() {
    axios.get('https://cors-anywhere.herokuapp.com/https://app.akira.md/api/system_status')
      .then(res => {
        const systemStatus = res.data;
        
        this.setState({
          dataReady: true,
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
    let akiraStatus = null;

    if(this.state.dataReady){
      akiraStatus = 'We are ' + (this.state.openForBusiness ? 'open!' : 'closed');
    }

    return (
      <div className="App animated fadeIn">
        <div className="appContainer">
          <div className="App-header">
            <img src={logo} alt="Akira Logo"/>

              {this.state.dataReady ? (
                <div className="hoursNotice">
                  <h1 className={"animated fadeIn " + (this.state.openForBusiness ? 'openStatus' : 'closedStatus')}>{akiraStatus}</h1>
                  <div className="seperator animated fadeIn"></div>
                  <h2 className="animated fadeIn">Today's hours: {this.formatTimeToHourOfDay(this.state.operationHours.open_at)} - {this.formatTimeToHourOfDay(this.state.operationHours.closed_at)}</h2>
                </div>
              ) : 
                <div className="hoursNotice spinContainer">
                    <img src={spinner} alt="spinner" className="spin"/>
                </div>
              }

          </div>
          <Clock initialTime={this.state.time} ready={this.state.dataReady}/>
        </div>
      </div>
    );
  }
}

export default App;
