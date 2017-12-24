import autoBind from '../auto-bind';

class Test {
	constructor(data, bind = true) {
		this.bar = data;
		bind && autoBind(this);
	}
	foo() {
		return this.bar;
	}
}

describe('auto-bind', () => {
	const test = new Test('Bind');

	it('should bind all class functions to class instance', () => {
		const { foo } = test;
		expect(foo()).toBe(test.foo());
	});
});

describe('without auto-bind', () => {
	const test = new Test('No Bind', false);

	it('should access when it is called from class instance', () => {
		expect(test.foo()).toBe('No Bind');
	});

	it('cannot read bar field', () => {
		const { foo } = test;
		expect(foo).toThrow("Cannot read property 'bar' of undefined");
	});
});
