# Construct Inject Init
A pattern about how to write classes in ES6, and deal with dependency injection.

##Note

This pattern in absolutely not a standard way to do things, and I'm still experiment it, and change it day to days. But it seems to work well for now, so I wrote it here to keep a trace of it.

##Example

###Define the class
```javascript

class LemonMan{
	//First, the constructor. It has to use full advantage of destructuring assignement. Just use to set start parameters without making any complex transformation. Constructor parameters must be literals.
	constructor({
		name= "",
		color= "yellow"
    } = {}){
    
		this.name = name.length > 0 ? name : "John Doe";
		this.color = color;
	}
	//Then, the inject method. Also use destructuring assignement, but to set the instance dependencies. Each dependency must have a default value. Plus, inject method must return this.
	inject({
		logger = console,
		context = window
	} = {}){
	
		//Use the assign method (or a polyfill) to set dependencies
		Object.assign(this, {
			logger, context
		});
		
		return this;
	}
	
	//Then, the init method. Return this to and can make complex initilization action. Destructuring assignement is not mandatory.
	init(){
		this.description = this.name === "John doe" ? "but he has no real name" : "and his name is "+this.name;
		
		return this;
	}
	
	describe(){
		this.logger.log("He is "+this.color+" "+this.description);
	}
}

let greenLemonMan = new LemonMan({color:"green"}).inject().init();

greenLemonMan.describe();
```
