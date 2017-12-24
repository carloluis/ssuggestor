function autoBind(instance) {
	const constructor = 'constructor';
	for (let propName of Object.getOwnPropertyNames(instance.constructor.prototype)) {
		const prop = instance[propName];
		if (propName !== constructor && prop instanceof Function) {
			instance[propName] = prop.bind(instance);
		}
	}
}

export default autoBind;
