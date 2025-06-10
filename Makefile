# Makefile for funkode-ui
MAKEFLAGS += -j2
-include .env
export

CURRENT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
CURRENT_PATH := $(shell pwd)
DEFAULT_BRANCH := $(shell git remote show upstream | sed -n '/HEAD branch/s/.*: //p')
AMM := ${HOME}/amm

.PHONY: gitRebase
gitRebase:
	git checkout $(DEFAULT_BRANCH) && \
		git pull upstream $(DEFAULT_BRANCH) && \
		git push origin $(DEFAULT_BRANCH) && \
		git checkout $(CURRENT_BRANCH) && \
		git rebase $(DEFAULT_BRANCH)
		git push --force origin $(CURRENT_BRANCH)

.PHONY: gitAmmend
gitAmmend:
	git add . && git commit --amend --no-edit && git push --force origin $(CURRENT_BRANCH)

# Variables
NODE_MODULES = ./node_modules
NPM = pnpm
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

.PHONY: serve
serve:
	$(NPM) build-storybook && serve storybook-static
