import React from 'react';
import moment from 'moment'

class Clock extends React.Component {

	componentDidUpdate(){

		if(!this.props.initialTime){
			return;
		}

		var initialTimeDate = moment(this.props.initialTime).toDate();
		//this is an object currently not a date.

		console.log(initialTimeDate);

		var sec = document.getElementById('sec');
		var min = document.getElementById('min');
		var hour = document.getElementById('hour');

	    function rot(el, deg) {
	        el.setAttribute('transform', 'rotate(' + deg + ' 50 50)')
	    }

		setInterval(function () {
			//.setSeconds(initialTimeDate.getSeconds() + 1)
		    var d = initialTimeDate;
		    console.log(typeof(d));
		    rot(sec, 6 * d.getSeconds())
		    rot(min, 6 * d.getMinutes())
		    rot(hour, 30 * (d.getHours() % 12) + d.getMinutes() / 2)
		}, 1000);
	}

	render() {
		return (
			<div>
				<svg id="clock" viewBox="0 0 100 100">
				<circle id="face" cx="50" cy="50" r="45" />
					<g id="hands">
						<rect id="hour" x="48.5" y="22.5" width="5" height="30" rx="2.5" ry="2.55" />
						<rect id="min" x="48" y="12.5" width="3" height="40" rx="2" ry="2" />
						<line id="sec" x1="50" y1="50" x2="50" y2="16" />
					</g>
				</svg>
			</div>
		);
	}
}

export default Clock;
