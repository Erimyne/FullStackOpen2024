import { useState } from 'react';

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
	]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [searchTerm, setSearchTerm] = useState('');

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

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
	};

	const personsToShow = searchTerm
		? persons.filter((person) =>
				person.name.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<div>
				filter with{' Name'}
				<input value={searchTerm} onChange={handleSearchChange} />
			</div>
			<h1>Add a new</h1>
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
			{personsToShow.map((person, index) => (
				<p key={index}>
					{person.name} {person.number}
				</p>
			))}
		</div>
	);
};

export default App;
