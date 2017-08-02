module.exports = {
	'*.js': ['prettier --write --use-tabs --single-quote', 'git add'],
	'*.json': ['prettier --write --single-quote', 'git add']
};
