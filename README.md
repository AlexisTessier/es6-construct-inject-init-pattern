# Construct Inject Init

![Project Status : deprecated](https://img.shields.io/badge/Project%20Status-deprecated-red.svg)

**This module/pattern is currently deprecated. It was an attempt to understand what is exactly the dependencies injection. [This video from Fun Fun Function](https://www.youtube.com/watch?v=0X1Ns2NRfks) is far more effective to achieve this goal (and provides a simpler and better pattern)**

A pattern about how to write classes, and deal with dependency injection. Actually, it's more an implementation guideline.

***Author note:***
*Examples and implementation details are written in ES6 but the pattern is declinable in others programming languages I guess.*

##Purpose

The goal of this pattern is to define a simple way to implement dependency injection.

###Prerequisite knowledge

+ **Inversion of Control and Dependency Injection**
	
	The following article is the best explanation I have found about dependency injection and its purpose.
	[http://www.jamesshore.com/Blog/Dependency-Injection-Demystified.html](http://www.jamesshore.com/Blog/Dependency-Injection-Demystified.html)

	In brief, dependency injection should be used to allow to override the behaviour of some components, and this is usefull when you want to do tests (and even without test, allow more modularity is always a good thing)

###Pattern explanation

The Construct Inject Init pattern is based on the use of 3 distinct methods :
- **The constructor method**: 
	This is just the basic constructor of a class. It should be as simple as possible. Use it to set instance parameters and defaults, avoid loud processing and operations which needs an injected dependency.

- **inject** *(optional)*: 
	This method, if implemented, must take dependencies as parameters, then validate that these injected dependencies correctly implement required interfaces, and finally, assign them to the instance. Must return the current instance. No default dependencies should be defined **here**.

- **init** *(optional)*:
	This method, if implemented, is a kind of constructor extension, but it can contain complex operations and also use some injected dependencies. Must return the current instance. It shouldn't take any parameter since it's just an extension of the constructor method.

###Constructor parameters versus injected dependencies

Constructor parameters are values that define the instance itself. They have and keep their semantic only in the context of the instanciated class.

Injected dependencies are values that could have a sense even in a more global context (an application for example). They even may have no real semantic in the instanciated class.

###Default dependencies

- Default dependencies must be defined in order to provide a default behaviour to the object.
- Default dependencies must be defined separatly from the class definition, in order to avoid a unnecessarly overhead if the default dependency isn't used.
- Each default dependency must be accessible independently from the others dependencies, in order to allow an user to override dependencies as needed (and write custom factory methods).
- Default dependencies definition files should be stored in a path of kind: *module-name/injection/class-name*, in order to be easily injected by the user if he doesn't use the default factory

###Construct Inject Init and factory

- Each class should have a related default factory function which accepts parameters, creates an instance using these parameters, then injects default dependencies in the instance, and finally returns the instance.
- Default factory methods should be accessible easily, via a path of kind: *module-name/factory* or *module-name/factory/class-name* if the module provides several classes.

###Example

###### [Class definition](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/class-definition.js)

Let's define a naive class with a talk method and which need a logger object to log a message.

```javascript
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
```

###### [Default dependencies definition](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/default-dependencies-definition.js)

Providing a default behaviour is important.

```javascript
// gravity-falls/injection/character/logger.js
export default {
	log: function loggerLog (){
		console.log(...arguments);
	}
}

/*----------*/

// gravity-falls/injection/character/index.js
import logger from './logger'

export default {
	logger
}
```

###### [Basic usage](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/basic-usage.js)

Note that having to manually inject dependencies is not convenient a lot for an user... it should be done just in factories methods.

```javascript
import Character from 'gravity-falls/character'
import characterInjection from 'gravity-falls/injection/character'

let brother = new Character({
	name: "Dipper",
	age: 12
}).inject(characterInjection);

brother.talk(); //'Hello, I am Dipper and I am 12.'
```

###### [Default factory definition](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/default-factory-definition.js)

Using a factory is more convenient than manually inject the dependencies.

```javascript
// gravity-falls/factory.js
// or gravity-falls/factory/character.js
// or something similar, according to the module complexity

import Character from './index'
import characterInjection from './injection/character'

export default function characterDefaultFactory() {
	return new Character(...arguments).inject(characterInjection);
}
```

###### [Factory usage](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/factory-usage.js)

```javascript
import Character from 'gravity-falls/factory/character'

let sister = Character({
	name: "Mabel",
	age: 12
});

sister.talk(); //'Hello, I am Mabel and I am 12.'
```

###### [Testing purpose](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/testing-purpose.js)

Now, imagine you would test the talk method and ensure that the logged message is correct, you can use a [mock object](https://en.wikipedia.org/wiki/Mock_object) instead of the default logger and ensure that its log method is correctly called.

```javascript
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

	console.log('If a Character talk, he must say "Hello", his name and his age.');
	prettyGirl.talk();

	assert(loggerMock.history.length === 1);
	assert(loggerMock.history[0] === 'Hello, I am Wendy and I am 15.');

console.log('Character test suite passed');
```

###### [Custom factory usage](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/custom-factory-usage.js)

Also, you could just want to change the behaviour of the class.

```javascript

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
```

###### [Usage with inheritance](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/usage-with-inheritance.js)

```javascript
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
```

###Concrete implementation examples

- [Spritesheet-generator](https://github.com/AlexisTessier/spritesheet-generator/tree/master/sources)
