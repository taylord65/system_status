import React from 'react';
import moment from 'moment'

class Clock extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			timeOutId: null,
			sec: this.getRotation(0),
			min: this.getRotation(0),
			hour: this.getRotation(0)
		};
	}

    getRotation(deg) {
        return `rotate(${deg} 50 50)`;
    }

	componentWillUnmount() {
		clearInterval(this.state.timeOutId);
	}

	componentDidUpdate(){

		if(!this.state.timeOutId){

			var self = this;

			var currentTime = moment(this.props.initialTime);

			(function updateClock() {
				self.setState({
					sec: self.getRotation(6 * currentTime.seconds()),
					min: self.getRotation(6 * currentTime.minutes()),
					hour: self.getRotation(30 * (currentTime.hours() % 12) + currentTime.minutes() / 2)
				});
			    currentTime = currentTime.add(1, 's');
			    self.state.timeOutId = setTimeout(updateClock, 1000);
			})();
		}
	}

	render() {
		return (
			<div className="clockContainer">
				{this.props.ready ? (
				<svg id="clock" viewBox="0 0 100 100" className="animated fadeIn">
				<circle id="ring2" cx="50" cy="50" r="49" />
				<circle id="ring1" cx="50" cy="50" r="47" />
				<circle id="face" cx="50" cy="50" r="45" />
					<g id="hands">
						<rect id="hour" x="48.5" y="22.5" width="5" height="30" transform={this.state.hour}/>
						<rect id="min" x="48" y="12.5" width="3" height="40" transform={this.state.min}/>
						<line id="sec" x1="50" y1="50" x2="50" y2="16" transform={this.state.sec}/>
					</g>
				<circle id="dot" cx="50" cy="50" r="1" />
				</svg>
				) : null}
			</div>
		);
	}
}

export default Clock;
