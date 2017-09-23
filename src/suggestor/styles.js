export const SPIN_STYLES = {
	position: 'absolute',
	cursor: 'pointer',
	margin: 'auto',
	color: '#ccc',
	fontSize: 16,
	right: 10,
	top: 0,
	bottom: 0,
	height: 14,
	zIndex: 4
};

export const X_STYLES = {
	...SPIN_STYLES,
	fontSize: 14,
	right: 30
};

export const getListStyles = visible => ({
	display: visible ? 'block' : 'none',
	maxHeight: 250,
	minWidth: 30,
	width: 'inherit',
	overflow: 'auto',
	cursor: 'pointer'
});

export const glyphicon = name => `glyphicon glyphicon-${name}`;
