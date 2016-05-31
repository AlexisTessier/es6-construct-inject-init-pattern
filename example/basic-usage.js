import Character from 'gravity-falls'
import characterInjection from 'gravity-falls/injection/character'

let brother = new Character({
	name: "Dipper",
	age: 12
}).inject(characterInjection);

brother.talk(); //'Hello, I am Dipper and I am 12.'