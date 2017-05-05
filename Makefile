dist:
	rm -rf client/dist && \
	cd client && npm run build && cd .. && \
	rm -rf dist && mkdir dist && \
	./node_modules/.bin/babel server --out-dir dist/server && \
	cp -R client dist/ && \
	cp package.json dist/ && \
	cp index.js dist && \
	cp server/.admin.js dist/server/ && \
	cp server/api/website.css dist/server/api/ && \
	cp server/api/book.json dist/server/api/ 

.PHONY: dist
