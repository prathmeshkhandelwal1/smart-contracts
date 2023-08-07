const HDWalletProvider = require('@truffle/hdwallet-provider');
const toWei = new require('web3').utils.toWei;

const address = "0x7b88c13D5A56549B2F09BB7D8300e256056fdD85";
const key = "PK";
const mnemonic = process.env['MNEMONIC'];
const poahost = process.env['POA_HOST'];
const etherscanKey = "PK";
const polygonscanKey = process.env['POLYGONSCAN_API'];
const gnosisscanKey = process.env['GNOSISSCAN_API'];

// var url = "https://optimism-goerli.publicnode.com";
var url = "https://arbitrum-goerli.publicnode.com";
var walletProvider;

try {

  if (key != undefined || mnemonic != undefined) {

    if (address == undefined) {
      throw Error('ADDRESS not set');
    }
    if (url == undefined) {
      throw Error('URL not set');
    }

    walletProvider = new HDWalletProvider({
      privateKeys: [key],
      providerOrUrl: url,
    });

    var walletAddress = walletProvider.getAddress();
    if (walletAddress != address.toLowerCase()) {
      throw Error(`Wallet address ${walletAddress} does not match ${address}`);
    }

  } else {
    console.log("WARNING: both KEY and MNEMONIC undefined");
  }

} catch (e) {
  console.log(e.toString());
  process.exit();
}

module.exports = {

  networks: {
    development: {
      host: "localhost",
      port: 9545,
      network_id: "*", // Match any network id
    },
    poa: {
      host: poahost != undefined ? poahost : "localhost",
      port: 8545,
      network_id: 12346,
    },
    optimism: {
      provider: () => walletProvider,
      network_id: 420,
      gas: 5000000,
      from: address,
      gasPrice: toWei('50', 'gwei'),
      timeoutBlocks: 200,
      skipDryRun: true,
      pollingInterval: 1800000,
      disabledConfirmationListener: true
    },
    arbitrum: {
      provider: () => walletProvider,
      network_id: 421613,
      gas: 5000000,
      from: address,
      gasPrice: toWei('50', 'gwei'),
      timeoutBlocks: 200,
      skipDryRun: true,
      pollingInterval: 1800000,
      disabledConfirmationListener: true
    },

    goerli: {
      provider: () => walletProvider,
      network_id: 5,
      gas: 5000000,
      from: address,
      gasPrice: toWei('10', 'gwei'),
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    mainnet: {
      provider: () => walletProvider,
      network_id: 1,
      gas: 6800000,
      from: address,
      gasPrice: toWei('15', 'gwei'),
    },
    polygon_pos_mumbai: {
      provider: () => walletProvider,
      network_id: 80001,
      confirmation: 2,
      timeoutBlocks: 200,
      // chainId: 80001,
      gas: 4465030,
      gasPrice: toWei('41', 'gwei'),
    },
    polygon_pos_mainnet: {
      provider: () => walletProvider,
      network_id: 137,
      confirmation: 2,
      timeoutBlocks: 200,
      // chainId: 137,
      gas: 4465030,
    },
    gnosischain_chiado: {
      provider: walletProvider,
      network_id: 10200,
      from: address,
      gasPrice: toWei('2', 'gwei'),
      timeoutBlocks: 200,
      skipDryRun: true
    },
    gnosischain_mainnet: {
      provider: walletProvider,
      network_id: 100,
      from: address,
      // gasPrice: toWei('2', 'gwei'),
      timeoutBlocks: 200,
      maxFeePerGas: toWei('15', 'gwei'),
      maxPriorityFeePerGas: toWei('2', 'gwei'),
      skipDryRun: true
    },
    dashboard: {
      network_id: 1,
      // chainId: 80001,
      confirmation: 2,
      timeoutBlocks: 200,
      // gasPrice: toWei('2', 'gwei'),
      from: address,
      // gasLimit: 30000000,
      gas: 4465030,
      maxFeePerGas: toWei('20', 'gwei'),
      maxPriorityFeePerGas: toWei('4', 'gwei'),
    },
  },

  compilers: {
    solc: {
      version: "0.8.11",    // fetch exact version from solc-bin (default: truffle's version)
      settings: {           // see the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 1000
        },
      },
    },
  },

  plugins: [
    'truffle-plugin-verify',
    'solidity-coverage',
  ],

  api_keys: {
    etherscan: etherscanKey,
    polygonscan: polygonscanKey,
    gnosisscan: gnosisscanKey,
    optimismscan: etherscanKey,
    arbiscan: etherscanKey
  },

  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      excludeContracts: ['Migrations'],
    },
  },

};
