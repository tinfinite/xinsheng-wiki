dist:
	node run build && \
	rm -rf dist && mkdir dist && \
	./node_modules/.bin/babel server --out-dir dist/server && \
	cp package.json dist/ && \
	cp index.js dist \

.PHONY: dist
