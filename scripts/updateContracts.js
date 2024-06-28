const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '..', 'build', 'contracts');
const contractsDir = path.join(__dirname, '..', 'src', 'app', 'utils');
const contractJsPath = path.join(contractsDir, 'contract.js');

// Read contract addresses from deployment
async function updateContractAddresses() {
  try {
    const files = fs.readdirSync(buildDir);
    const contractAddresses = {};

    files.forEach(file => {
      if (file.endsWith('.json')) {
        const contract = JSON.parse(fs.readFileSync(path.join(buildDir, file)));
        const contractName = path.basename(file, '.json');
        if (contract.networks && Object.keys(contract.networks).length > 0) {
          const networkId = Object.keys(contract.networks)[0];
          const address = contract.networks[networkId].address;
          contractAddresses[contractName] = address;
        }
      }
    });

    console.log("Contract Addresses:", contractAddresses); // Log contract addresses for debugging
    return contractAddresses;
  } catch (error) {
    console.error("Error reading contract addresses:", error);
    process.exit(1);
  }
}

// Generate contract.js file
async function generateContractJs(contractAddresses) {
  try {
    const imports = [];
    const addresses = [];
    const contractInstances = [];
    const exportInstances = [];

    for (const [contractName, address] of Object.entries(contractAddresses)) {
      imports.push(`import ${contractName} from '../../../build/contracts/${contractName}.json';`);
      addresses.push(`const ${contractName.charAt(0).toLowerCase() + contractName.slice(1)}Address = '${address}';`);
      const instanceName = `${contractName.charAt(0).toLowerCase()}${contractName.slice(1)}Contract`;
      contractInstances.push(`const ${instanceName} = new web3.eth.Contract(${contractName}.abi, ${contractName.charAt(0).toLowerCase() + contractName.slice(1)}Address);`);
      exportInstances.push(`    ${instanceName}`);
    }

    const contractJsContent = `
import web3 from './web3';
${imports.join('\n')}

// Deployed contract addresses
${addresses.join('\n')}
${contractInstances.join('\n')}

export {
${exportInstances.join(',\n')}
};
`;

    fs.writeFileSync(contractJsPath, contractJsContent);
    console.log(`contract.js updated successfully at ${contractJsPath}`);
  } catch (error) {
    console.error("Error generating contract.js:", error);
    process.exit(1);
  }
}

// Run the script
(async () => {
  const contractAddresses = await updateContractAddresses();
  await generateContractJs(contractAddresses);
})();
