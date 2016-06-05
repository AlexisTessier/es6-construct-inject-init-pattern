// gravity-falls/factory.js
// or gravity-falls/factory/character.js
// or something similar, according to the module complexity

import Character from './index'
import characterInjection from './injection/character'

export default function characterDefaultFactory() {
	return new Character(...arguments).inject(characterInjection);
}