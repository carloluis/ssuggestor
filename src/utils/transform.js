import strip from './strip-tilde';

function transform(keepAccents, value) {
	const lowered = value.toLowerCase();
	return keepAccents ? lowered : strip(lowered);
}

export default transform;
