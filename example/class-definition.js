class Human{
	constructor({
		name,
		age = 0
	} = {}) {

		Object.assign(this, {
			name,
			age
		});
	}

	//Avoid using default dependencies
	//The default factory set them for you
	inject({
		logger
	}){
		//Ensure that each injected dependency implement the needed interface
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
		this.logger.log('woof, I am '+this.name+' and I am '+this.age+' years old.');
	}
}