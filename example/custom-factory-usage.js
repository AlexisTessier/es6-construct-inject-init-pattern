
// the following example simply repeat the log,
// but a real use case could be to inject a logger which write the logs in files

import Character from 'gravity-falls'

function TweenBrothers() {
	return new Character(...arguments).inject({
		logger: {
			log: () => {
				console.log(...arguments);
				console.log(...arguments);
			}
		}
	});
}

let uncles = TweenBrothers({
	name: 'Stanley/Stanford',
	age: 'old'
});

uncles.talk(); 

//'Hello, I am Stanley/Stanford and I am old.'
//'Hello, I am Stanley/Stanford and I am old.'