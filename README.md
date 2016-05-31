# Construct Inject Init

A pattern about how to write classes, and deal with dependency injection. Actually, it's more an implementation style guide.

***Author note:***
*I'm still experimenting this pattern.*
*Examples and implementation details are written in ES6 but the pattern is declinable in others programming languages I guess.*

##Purpose

The goal of this pattern is to define a simple way to implement dependency injection.

###Explanation

The Construct Inject Init pattern is based on the use of 3 distincts methods :
- **The constructor method**: 
	This is just the basic constructor of a class. It should be as simple as possible. Use it to set instance parameters and defaults, avoid loud processing and operations which needs an injected dependency.

- **inject** *(optional)*: 
	This method, if implemented, must take dependencies as parameters, then validate that these injected dependencies correctly implement required interfaces, and finnaly, assign them to the instance. Must return the current instance. No default dependencies should be defined **here**.

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

- Each class should have a related default factory function which accepts parameters, creates a instance using these parameters, then injects default dependencies in the instance, and finaly returns the instance.
- Default factory methods should be accessible easily, via a path of kind: *module-name/factory* or *module-name/factory/class-name* if the module provides several classes.

###Example

- [Class definition](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/class-definition.js)
- [Default dependencies definition](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/default-dependencies-definition.js)
- [Basic usage](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/basic-usage.js)
- [Default factory definition](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/default-factory-definition.js)
- [Factory usage](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/factory-usage.js)
- [Custom factory usage](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/custom-factory-usage.js)
- [Usage with inheritance (not written yet)](https://github.com/AlexisTessier/es6-construct-inject-init-pattern/blob/master/example/usage-with-inheritance.js)

###Concrete implementation examples

- [Spritesheet-generator](https://github.com/AlexisTessier/spritesheet-generator/tree/master/sources)
