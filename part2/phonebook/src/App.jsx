/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from 'react';
import phonebook from './backend/phonebook';

const Filter = ({ value, onChange }) => (
	<div>
		filter shown with <input value={value} onChange={onChange} />
	</div>
);

const PersonForm = ({
	onSubmit,
	name,
	onNameChange,
	number,
	onNumberChange,
}) => (
	<form onSubmit={onSubmit}>
		<div>
			name: <input value={name} onChange={onNameChange} />
		</div>
		<div>
			number: <input value={number} onChange={onNumberChange} />
		</div>
		<div>
			<button type="submit">add</button>
		</div>
	</form>
);

const Persons = ({ persons, onDelete }) => (
	<div>
		{persons.map((person, index) => (
			<p key={index}>
				{person.name} {person.number}
				<button onClick={() => onDelete(person.id)}>Delete</button>
			</p>
		))}
	</div>
);

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newFilter, setNewFilter] = useState('');

	useEffect(() => {
		phonebook.getAll().then((initialPerson) => {
			setPersons(initialPerson);
		});
	}, []);

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

			phonebook.create(personObject).then((returnedPhonebook) => {
				setPersons(persons.concat(returnedPhonebook));
				setNewName('');
				setNewNumber('');
			});
		}
	};

	const handleSearchChange = (event) => {
		setNewFilter(event.target.value);
	};

	const personsToShow = newFilter
		? persons.filter((person) =>
				person.name.toLowerCase().includes(newFilter.toLowerCase())
		  )
		: persons;

	const deletePerson = (id) => {
		const person = persons.find((p) => p.id === id);
		if (window.confirm(`Delete ${person.name}?`)) {
			phonebook
				.deletePerson(id)
				.then(() => {
					setPersons(persons.filter((p) => p.id !== id));
				})
				.catch((error) => {
					alert(`the person '${person.name}' was already deleted from server`);
					setPersons(persons.filter((p) => p.id !== id));
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter value={newFilter} onChange={handleSearchChange} />
			<h1>Add a new</h1>
			<PersonForm
				onSubmit={addName}
				name={newName}
				onNameChange={handleNameChange}
				number={newNumber}
				onNumberChange={handleNumberChange}
			/>
			<h2>Numbers</h2>
			<Persons persons={personsToShow} onDelete={deletePerson} />
		</div>
	);
};

export default App;
