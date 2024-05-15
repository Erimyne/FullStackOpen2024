import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const addName = (event) => {
		event.preventDefault();
		const personExists = persons.find((person) => person.name === newName);
		const numberExists = persons.find((person) => person.number === newNumber);

		if (personExists) {
			alert(`${newName}  is already added to phonebook`);
		} else if (numberExists) {
			alert(`${newNumber}  is already added to phonebook`);
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
			};
			setPersons(persons.concat(personObject));
			setNewName('');
			setNewNumber('');
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleNameChange} />
					<div>
						number: <input value={newNumber} onChange={handleNumberChange} />
					</div>
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person, index) => (
				<p key={index}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
