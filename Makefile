.PHONY: run build clean

# Start the development server
run:
	npm run serve

# Build the site
build:
	npm run build

# Clean the output directory
clean:
	rm -rf _site
