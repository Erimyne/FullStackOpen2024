import { useState } from 'react';

const StatisticsLine = ({ text, value }) => {
	return (
		<table>
			<tbody>
				<tr>
					<td>{text}</td>
					<td>{value}</td>
				</tr>
			</tbody>
		</table>
	);
};

const Statistics = ({ good, neutral, bad }) => {
	let statistics;
	let all = good + neutral + bad;
	let average = Number(good - bad) / all;
	let positive = (good / all) * 100;

	if (all > 0) {
		statistics = (
			<div>
				<StatisticsLine text="good" value={good} />
				<StatisticsLine text="neutral" value={neutral} />
				<StatisticsLine text="bad" value={bad} />
				<StatisticsLine text="all" value={all} />
				<StatisticsLine text="average" value={average} />
				<StatisticsLine text="positive" value={positive + '%'} />
			</div>
		);
	} else {
		statistics = <p>No feedback given</p>;
	}
	return (
		<div>
			<h1>statistics</h1>
			{statistics}
		</div>
	);
};

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>{text}</button>
);

function App() {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const handleGood = () => {
		setGood(good + 1);
	};
	const handleNeutral = () => {
		setNeutral(neutral + 1);
	};
	const handleBad = () => {
		setBad(bad + 1);
	};

	return (
		<div>
			<h1>Give feedback</h1>
			<Button handleClick={handleGood} text="good" />
			<Button handleClick={handleNeutral} text="neutral" />
			<Button handleClick={handleBad} text="bad" />

			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
}

export default App;
