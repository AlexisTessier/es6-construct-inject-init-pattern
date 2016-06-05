// gravity-falls/character.js
// or gravity-falls/class/character.js
// or gravity-falls/index.js
// or something similar, according to the module complexity

import assert from 'assert'

class Character{
	constructor({
		name,
		age = 0
	} = {}) {

		Object.assign(this, {
			name,
			age
		});
	}

	inject({
		logger
	}){
		//Ensure that each injected dependency implement the required interface
		assert(typeof logger === 'object');
		assert(typeof logger.log === 'function');

		Object.assign(this, {
			logger
		});

		//Don't forget to return this instance
		return this;
	}

	//init(){
		//No need to implement a init method in this example
		//But if you have to do loud computation, don't forget to return this instance
		//return this;
	//}

	//then implement others method
	talk(){
		this.logger.log('Hello, I am '+this.name+' and I am '+this.age+'.');
	}
}