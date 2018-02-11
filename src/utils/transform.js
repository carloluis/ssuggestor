import strip from './strip-tilde';

function transform(keepAccents, value) {
	return (keepAccents ? value : strip(value)).toLowerCase();
}

export default transform;
