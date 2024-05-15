import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

	const handleSubmit = (event) => {
		setNewName(event.target.value);
	};

	const addName = (event) => {
		event.preventDefault();
		const existingPerson = persons.find((person) => person.name === newName);

		existingPerson
			? alert(`${newName} is already added to phonebook`)
			: setPersons(persons.concat({ name: newName }));

		setNewName('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				<div>
					name: <input value={newName} onChange={handleSubmit} />
				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{persons.map((person, index) => (
				<p key={index}>{person.name}</p>
			))}
		</div>
	);
};

export default App;
