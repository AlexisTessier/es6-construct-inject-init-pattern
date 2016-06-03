import Character from 'gravity-falls'

import assert from 'assert'

var loggerMock = {
	history: [],
	log: function() {
		loggerMock.history.push(...arguments);
	}
};

console.log('Character test suite');

	let prettyGirl = new Character({
		name: 'Wendy',
		age: 15
	}).inject({
		logger: loggerMock
	});

	assert(loggerMock.history.length === 0);

	console.log('\tIf a Character talk,, he must say "Hello", his name and his age.');
	prettyGirl.talk();

	assert(loggerMock.history.length === 1);
	assert(loggerMock.history[0] === 'Hello, I am Wendy and I am 15.');

console.log('Character test suite passed');