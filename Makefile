# Makefile for funkode-ui

# Variables
NODE_MODULES = ./node_modules
NPM = npm
TSC = $(NODE_MODULES)/.bin/tsc
LIB_DIR = lib
DIST_DIR = dist
SRC_DIR = lib

# Default target
.PHONY: all
all: build

# Install dependencies
.PHONY: install
install:
	$(NPM) install

# Build the project
.PHONY: build
build:
	$(NPM) run build

# Clean the build artifacts
.PHONY: clean
clean:
	rm -rf $(DIST_DIR)

# Run development server
.PHONY: run
run:
	$(NPM) run storybook

# Lint the code
.PHONY: lint
lint:
	npx @biomejs/biome lint --write .

# Format the code
.PHONY: format
format:
	npx @biomejs/biome format --write . 
