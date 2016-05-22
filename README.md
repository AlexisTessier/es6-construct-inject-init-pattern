# Construct Inject Init
A pattern about how to write classes, and deal with dependency injection. Actually, it's more an implementation style guide.

***Author note:***
*I'm still experimenting this pattern.*
*Examples and implementation details are written in ES6 but the pattern is declinable in others programming languages.*

##Purpose
The goal of this pattern is to define a simple way to implement dependency injection.

###Explanation

The Construct Inject Init pattern is based on the use of 3 distincts methods :
+ **The constructor method:** 
	This is just the basic constructor of a class. It should be as simple as possible. Use it to set instance parameters and defaults, avoid loud processing and operations which need an injected dependency.

+ **inject** *(optional)*: 
	This method, if implemented, must take dependencies as parameters, then validate that these injected dependencies correctly implement interfaces, and finnaly, assign them to the instance. Must return the current instance.

+ **init** *(optional)*
	This method, if implemented, is a kind of constructor extension, but it can contain complex operations and also use some  injected dependencies. Must return the current instance. It shouldn't take any parameter since it's just an extension of the constructor method.

###Constructor parameters versus injected dependencies
Constructor parameters are values that define the instance itself. They have and keep their semantic only in the context of the instanciated class.

Injected dependencies are values that could have a sense even in a more global context (an application for example). They even may have no real semantic in the instanciated class.

###Example

```javascript
```

###Usage

###Construct Inject Init and factory
