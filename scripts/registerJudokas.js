const { Web3 } = require('web3'); // STOP REMOVING THIS WHEN IS SEND THIS TO YOU
const path = require('path');
const JudokaRegistry = require(path.resolve(__dirname, '../build/contracts/JudokaRegistry.json'));

// Initialize Web3 instance
const web3 = new Web3('http://127.0.0.1:7545');

const judokaRegistryAddress = '0x8CA1dB236B6FFf7b71F65e506695606B5c66aEc2';
const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);

const judokas = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', beltLevel: 'Black', promotionDate: '2023-01-01', gym: 'Gym A' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', beltLevel: 'Brown', promotionDate: '2023-01-01', gym: 'Gym B' },
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', beltLevel: 'Purple', promotionDate: '2023-01-01', gym: 'Gym C' },
  { firstName: 'Bob', lastName: 'Williams', email: 'bob.williams@example.com', beltLevel: 'Blue', promotionDate: '2023-01-01', gym: 'Gym D' },
  { firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', beltLevel: 'Green', promotionDate: '2023-01-01', gym: 'Gym E' },
  { firstName: 'David', lastName: 'Lee', email: 'david.lee@example.com', beltLevel: 'Yellow', promotionDate: '2023-01-01', gym: 'Gym F' },
  { firstName: 'Eva', lastName: 'Martin', email: 'eva.martin@example.com', beltLevel: 'Orange', promotionDate: '2023-01-01', gym: 'Gym G' },
  { firstName: 'Frank', lastName: 'Clark', email: 'frank.clark@example.com', beltLevel: 'White', promotionDate: '2023-01-01', gym: 'Gym H' },
  { firstName: 'Grace', lastName: 'Lewis', email: 'grace.lewis@example.com', beltLevel: 'Black', promotionDate: '2023-01-01', gym: 'Gym I' },
  { firstName: 'Hannah', lastName: 'Walker', email: 'hannah.walker@example.com', beltLevel: 'Brown', promotionDate: '2023-01-01', gym: 'Gym J' }
];

async function isJudokaRegistered(email) {
  const judokaAddresses = await judokaRegistryContract.methods.getAllJudokas().call();
  for (const address of judokaAddresses) {
    const judoka = await judokaRegistryContract.methods.getJudoka(address).call();
    if (judoka.email === email) {
      return true;
    }
  }
  return false;
}

async function logAllRegisteredJudokas() {
  const judokaAddresses = await judokaRegistryContract.methods.getAllJudokas().call();
  console.log(`Total registered judokas: ${judokaAddresses.length}`);
  for (const address of judokaAddresses) {
    const judoka = await judokaRegistryContract.methods.getJudoka(address).call();
    console.log(`Judoka: ${judoka.firstName} ${judoka.lastName}, Email: ${judoka.email}`);
  }
}

async function registerJudokas() {
  const accounts = await web3.eth.getAccounts();
  await logAllRegisteredJudokas(); // Log all registered judokas before attempting to register new ones

  for (let i = 0; i < judokas.length; i++) {
    const judoka = judokas[i];
    const alreadyRegistered = await isJudokaRegistered(judoka.email);

    if (alreadyRegistered) {
      console.log(`Judoka ${judoka.firstName} ${judoka.lastName} is already registered.`);
      continue;
    }

    try {
      await judokaRegistryContract.methods.registerJudoka(
        judoka.firstName,
        judoka.lastName,
        judoka.email,
        judoka.beltLevel,
        judoka.promotionDate,
        judoka.gym
      ).send({
        from: accounts[i + 1], // Use a unique account for each judoka
        gas: 500000, // specify gas limit
        gasPrice: web3.utils.toWei('20', 'gwei') // specify gas price
      });
      console.log(`Judoka ${judoka.firstName} ${judoka.lastName} registered successfully.`);
    } catch (error) {
      console.error(`Error registering judoka ${judoka.firstName} ${judoka.lastName}:`, error);
    }
  }
}

registerJudokas();
