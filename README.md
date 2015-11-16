# Construct Inject Init
A pattern about how to write classes in ES6, and deal with dependency injection.

##Note

This pattern is absolutely not a standard way to do things, and I'm still experiment it, and change it day to days. But it seems to work well for now, so I wrote it here to keep a trace of it.

##Example

[Demo here](https://github.com/AlexisTessier/es6-draft)

Clone the project, do npm install, gulp watch then node test-construct-inject-init

[Source file](https://github.com/AlexisTessier/es6-draft/blob/master/sources/construct-inject-init.js)

###Define the class
```javascript

class LemonMan{
	//First, the constructor.
	constructor({
		name= "",
		color= "yellow"
	} = {}){
		//It has to use full advantage of destructuring assignement and default value.
		//Eventually it can implement assertions about type of each parameter
		assert(typeof name === "string");
		assert(typeof color === "string");

		//use a param object to save the object parameters
		this.param = {
			name,
			color
		};
	}
	//Then, the inject method. Also use destructuring assignement, but to set the instance dependencies. Each dependency must have a default value. 
	inject({
		logger = console
	} = {}){
		//Eventually it can implement assertions to describe the dependencies
		assert(typeof logger === 'object');
		assert(typeof logger.log === 'function');
	
		//Use the assign method (or a polyfill) to set dependencies
		Object.assign(this, {
			logger
		});
		
		//Plus, inject method must return this.
		return this;
	}
	
	//Then, the init method. Accept no parameters
	init(){
		//Do more complex stuff
		this.description = this.name === "John Doe" ? "but he has no real name" : "and his name is "+this.name;
		
		//Dependencies can be used
		this.logger.log("Hello...");
		
		//Return this too
		return this;
	}

	//Then define getters, setters, and methods
	/*===============*/
	
	get name(){
		return this.param.name.length > 0 ? this.param.name : "John Doe"
	}

	get color(){
		return this.param.color;
	}

	/*===============*/

	describe(){
		this.logger.log("He is "+this.color+" "+this.description);
	}
}
```

###Use it

```javascript
//instantiate, using parameters if you want
let greenLemonMan = new LemonMan({color:"green"});

//For testing purpose, or more control over dependencies, inject custom dependencies
greenLemonMan.inject({
	logger : {
		log : function(){
			//log stuff
		}
	}
});
//or inject the default dependencies for simple use
greenLemonMan.inject();

//init the instance (You can because dependencies were yet injected)
greenLemonMan.init();

//Then use the instance
greenLemonMan.describe();

//You can do all that stuff using chaining

new LemonMan({name:"Jack Smith"}).inject().init().describe();
```
###Working with extends
```javascript

class BigLemonMan extends LemonMan{
	constructor({
		level= 0
	} = {}){
		assert(typeof level === "number");

		super(...arguments);

		Object.assign(this.param, {
			level
		});
	}

	inject({
		objectConstructor = Object
	} = {}){
		super.inject(...arguments);

		Object.assign(this, {
			objectConstructor
		});

		return this;
	}

	init(){
		super.init();
		
		this.object = new this.objectConstructor();

		this.description += ". Also, his object is an instance of "+this.object.constructor.name+".";

		return this;
	}
}

```