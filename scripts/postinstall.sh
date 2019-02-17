#!/bin/bash

# Paths
ROOT_PATH=$(pwd)

# Log
log() {
  CYAN='\033[0;36m'
  NONE='\033[0m'
  echo "\n  ${CYAN}[colony-starter-basic]${NONE} $1\n"
}

# Pull down docker image
docker pull ethereum/solc:0.4.23

# Update colonyNetwork submodule
git submodule update --init --recursive

# Move to colonyNetwork
cd lib/colonyNetwork

# Install colonyNetwork dependencies
yarn

# Provision colonyNetwork contracts
yarn run provision:token:contracts
