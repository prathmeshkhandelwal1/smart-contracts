var BlacklistValidator = artifacts.require("./BlacklistValidator.sol");
var SmartController = artifacts.require("./SmartController.sol");
var PolygonPosEUR = artifacts.require("./xTokenFrontend.sol");
var MintableTokenLib = artifacts.require("./MintableTokenLib.sol");
var TokenStorageLib = artifacts.require("./TokenStorageLib.sol");
var SmartTokenLib = artifacts.require("./SmartTokenLib.sol");
var ERC20Lib = artifacts.require("./ERC20Lib.sol");
var ERC677Lib = artifacts.require("./ERC677Lib.sol");


module.exports = function(deployer, network) {
  // Set the correct Chain Manager Address. On Localchain, the address is 0x;

  // Only to be deployed on polygon's networks or local chain.
    deployer.link(SmartTokenLib, SmartController);
    deployer.link(TokenStorageLib, SmartController);
    deployer.link(ERC20Lib, SmartController);
    deployer.link(ERC677Lib, SmartController);
    deployer.link(MintableTokenLib, SmartController);

    return deployer.deploy(PolygonPosEUR).then(frontend => 
      deployer.deploy(SmartController, '0x0000000000000000000000000000000000000000', BlacklistValidator.address, web3.utils.asciiToHex("EUR"), frontend.address).then(controller => {
        if (network.startsWith('poa'))
          controller.addSystemAccount('0x7b88c13D5A56549B2F09BB7D8300e256056fdD85');
        return frontend.setController(controller.address);
      }));

};
