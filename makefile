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
start:
	gendiff ./__fixtures__/file1.json ./__fixtures__/file2.json
