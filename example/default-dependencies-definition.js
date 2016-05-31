// gravity-falls/injection/character/index.js
import logger from './logger'

export default {
	logger
}

/*------------------------*/

// gravity-falls/injection/character/logger.js
export default {
	log: function loggerLog{
		console.log(...arguments);
	}
}