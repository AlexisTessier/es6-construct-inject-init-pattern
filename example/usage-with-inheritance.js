import Character from 'gravity-falls'

import assert from 'assert'

class GeometricCharacter extends Character {
	constructor({
		shape = 'triangle',
		color = 'yellow'
	} = {}) {
		super(...arguments);

		Object.assign(this, {
			color
		});
	}

	/*
	inject({
		injectedDependency
	}){
		super.inject(...arguments);

		assert(typeof injectedDependency === 'object');
		assert(typeof injectedDependency.method === 'function');

		Object.assign(this, {
			injectedDependency
		});

		return this;
	}
	*/

	/*
	init(){
		super.init();

		return this;
	}
	*/
}