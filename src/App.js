import React, { Component } from 'react';
import axios from 'axios';
import './css/App.css';
import './css/animate.css';
import Clock from './components/Clock';
import logo from './images/logo.svg';
import moment from 'moment'

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
    const dataReady = this.state.dataReady;

    let akiraStatus = null
    let statusHeader = null;

    if(dataReady){
      akiraStatus = 'We are ' + (this.state.openForBusiness ? 'open!' : 'closed');
      statusHeader = <div className="hoursNotice">
                      <h1 className={"animated fadeIn " + (this.state.openForBusiness ? 'openStatus' : 'closedStatus')}>{akiraStatus}</h1>
                      <div className="seperator animated fadeIn"></div>
                      <h2 className="animated fadeIn">Today's hours: {this.formatTimeToHourOfDay(this.state.operationHours.open_at)} - {this.formatTimeToHourOfDay(this.state.operationHours.closed_at)}</h2>
                    </div>;
    } else {
      statusHeader = <div className="hoursNotice"></div>;
    }

    return (
      <div className="App animated fadeIn">
        <div className="appContainer">
          <div className="App-header">
            <img src={logo} alt="Akira Logo"/>
            {statusHeader}
          </div>
          <Clock initialTime={this.state.time} ready={this.state.dataReady}/>
        </div>
      </div>
    );
  }
}

export default App;
