const Header = ({ name }) => {
	return <h2>{name}</h2>;
};
const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Total = ({ parts }) => {
	const newTotal = parts.reduce((total, part) => total + part.exercises, 0);
	return <b>Total of {newTotal} exercises</b>;
};

const Content = ({ course }) => {
	return (
		<div>
			{course.parts.map((part) => (
				<Part key={part.id} part={part} />
			))}
		</div>
	);
};

const Course = ({ courses }) => {
	return (
		<div>
			<h1>Web development curriculum</h1>
			{courses.map((course) => (
				<div key={course.id}>
					<Header name={course.name} />
					<Content course={course} />
					<Total parts={course.parts} />
				</div>
			))}
		</div>
	);
};
export default Course;
