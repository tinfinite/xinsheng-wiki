dist:
	rm -rf client/dist && \
	npm run build && \
	rm -rf dist && mkdir dist && \
	./node_modules/.bin/babel server --out-dir dist/server && \
	cp -R client dist/ && \
	cp package.json dist/ && \
	cp index.js dist \

.PHONY: dist
