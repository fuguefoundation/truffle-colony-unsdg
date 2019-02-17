# Colony UNSDG

Develop the humanitarian within. Learn Truffle and Colony while applying the UN Sustainable Development Goals.

## Prerequisites

- Yarn 1.12.3
- Node 10.12.0

_You may find it helpful to use Node Version Manager (`nvm`) to manage Node versions._

## Development

### Clone the repo

Open a new terminal window and start [Ganache](https://github.com/trufflesuite/ganache-cli):

```
git clone https://github.com/fuguefoundation/truffle-colony-unsdg.git
```

### Initialize the Project

```
yarn initialize
```

### Install Project Packages

```
yarn
```

### Start Network

Open a new terminal window and start [Ganache](https://github.com/trufflesuite/ganache-cli):

```
yarn start-ganache
```

### Deploy Contracts

Open a new terminal window and deploy the [colonyNetwork](https://github.com/JoinColony/colonyNetwork) contracts:

```
yarn deploy-contracts
```

### Start TrufflePig

Once the contracts have been deployed, start [TrufflePig](https://github.com/JoinColony/trufflepig):

```
yarn start-trufflepig
```

### Start Dev Server

Once the network has been seeded, start the development server:

```
yarn start
```

### Open Your Browser

Open your browser and checkout the example react app::

[localhost:4200](http://localhost:4200)

### Run Tests

Open a new terminal window and run the tests:

```
yarn test
```
