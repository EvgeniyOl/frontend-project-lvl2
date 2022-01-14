install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
test-coverage:
	npm run test-coverage
test:
	npm test
