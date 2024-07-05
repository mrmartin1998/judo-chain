const { Web3 } = require('web3');
const path = require('path');
const JudokaRegistry = require(path.resolve(__dirname, '../build/contracts/JudokaRegistry.json'));
const VotingContract = require(path.resolve(__dirname, '../build/contracts/VotingContract.json'));
const MessagingContract = require(path.resolve(__dirname, '../build/contracts/MessagingContract.json'));

// Initialize Web3 instance
const web3 = new Web3('http://127.0.0.1:7545');

const judokaRegistryAddress = '0x8CA1dB236B6FFf7b71F65e506695606B5c66aEc2';
const votingContractAddress = '0xBea8cE8953DA81FeBc788E697BD9Fb83d6B56dbb';
const messagingContractAddress = '0x3BF607e1AED8fB460ED2D91C6a0Ba78beaF0648e';

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);
const messagingContract = new web3.eth.Contract(MessagingContract.abi, messagingContractAddress);

// Function to handle BigInt serialization in JSON
function jsonifyBigInt(object) {
  return JSON.stringify(object, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
}

// Function to get the list of registered judokas
async function getRegisteredJudokas() {
  try {
    const judokaAddresses = await judokaRegistryContract.methods.getAllJudokas().call();
    let judokas = [];
    for (let i = 0; i < judokaAddresses.length; i++) {
      const judokaAddress = judokaAddresses[i];
      const judokaInfo = await judokaRegistryContract.methods.getJudoka(judokaAddress).call();
      judokas.push({ address: judokaAddress, info: jsonifyBigInt(judokaInfo) });
    }
    console.log("Registered Judokas: ", judokas);
  } catch (error) {
    console.error("Error getting registered judokas: ", error);
  }
}

async function simulateJohnDoe() {
  const accounts = await web3.eth.getAccounts();
  const johnDoeAddress = accounts[1]; // Assume John's account is the second one
  const janeSmithAddress = accounts[2]; // Assume Jane's account is the third one

  // Retrieve the list of registered judokas
  await getRegisteredJudokas();

  // Check if John Doe is registered and update info if necessary
  const johnDoeInfo = await judokaRegistryContract.methods.getJudoka(johnDoeAddress).call();
  console.log(`John Doe Info: ${jsonifyBigInt(johnDoeInfo)}`);

  if (!johnDoeInfo.isRegistered) {
    // Register John Doe
    try {
      await judokaRegistryContract.methods.registerJudoka(
        'John',
        'Doe',
        'john.doe@example.com',
        'Black',
        '2023-01-01',
        'Gym A'
      ).send({
        from: johnDoeAddress,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log('John Doe registered successfully.');
    } catch (error) {
      console.error(`Error registering John Doe:`, error);
      return; // Exit if registration fails
    }
  } else {
    console.log('John Doe is already registered.');
  }

  // Check if Jane Smith is registered and register if necessary
  const janeSmithInfo = await judokaRegistryContract.methods.getJudoka(janeSmithAddress).call();
  console.log(`Jane Smith Info: ${jsonifyBigInt(janeSmithInfo)}`);

  if (!janeSmithInfo.isRegistered) {
    // Register Jane Smith
    try {
      await judokaRegistryContract.methods.registerJudoka(
        'Jane',
        'Smith',
        'jane.smith@example.com',
        'White',
        '2023-01-01',
        'Gym B'
      ).send({
        from: janeSmithAddress,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log('Jane Smith registered successfully.');
    } catch (error) {
      console.error(`Error registering Jane Smith:`, error);
      return; // Exit if registration fails
    }
  } else {
    console.log('Jane Smith is already registered.');
  }

  // Update John Doe's Personal Information
  try {
    await judokaRegistryContract.methods.updateJudoka(
      'John',
      'Doe',
      'john.new@example.com',
      'Black',
      '2023-01-01',
      'New Gym A'
    ).send({
      from: johnDoeAddress,
      gas: 500000,
      gasPrice: web3.utils.toWei('20', 'gwei')
    });
    console.log('John Doe information updated successfully.');
  } catch (error) {
    console.error(`Error updating John Doe information:`, error);
  }

  // Vote on a Proposal
  try {
    if (votingContract.methods.voteForUser) {
      await votingContract.methods.voteForUser(janeSmithAddress, true).send({
        from: johnDoeAddress,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log('John Doe voted successfully.');
    } else {
      console.log('Function voteForUser does not exist in VotingContract.');
    }
  } catch (error) {
    console.error(`Error voting:`, error);
  }

  // Send Friend Request
  try {
    if (messagingContract.methods.sendFriendRequest) {
      await messagingContract.methods.sendFriendRequest(janeSmithAddress).send({
        from: johnDoeAddress,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log('John Doe sent friend request successfully.');
    } else {
      console.log('Function sendFriendRequest does not exist in MessagingContract.');
    }
  } catch (error) {
    console.error(`Error sending friend request:`, error);
  }

  // Accept Friend Request
  try {
    const friendRequests = await messagingContract.methods.getUserFriendRequests(janeSmithAddress).call();
    console.log(`Jane's friend requests: ${jsonifyBigInt(friendRequests)}`);
    let requestId = null;
    for (let i = 0; i < friendRequests.length; i++) {
      const request = await messagingContract.methods.getFriendRequest(friendRequests[i]).call();
      console.log(`Friend Request ${i}: ${jsonifyBigInt(request)}`);
      console.log(`Checking request ${i}: requester=${request[0]}, expected=${johnDoeAddress}`);
      if (request && request[0] && request[0].toLowerCase() === johnDoeAddress.toLowerCase()) {
        requestId = friendRequests[i];
        break;  // Accept the first valid friend request
      }
    }

    if (requestId !== null) {
      await messagingContract.methods.acceptFriendRequest(requestId).send({
        from: janeSmithAddress,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log('Jane Smith accepted friend request successfully.');

      // Retrieve and print friends of John Doe and Jane Smith
      const johnFriends = await messagingContract.methods.getUserFriends(johnDoeAddress).call();
      const janeFriends = await messagingContract.methods.getUserFriends(janeSmithAddress).call();
      console.log(`John Doe's friends: ${jsonifyBigInt(johnFriends)}`);
      console.log(`Jane Smith's friends: ${jsonifyBigInt(janeFriends)}`);

      // Send Message
      try {
        if (messagingContract.methods.sendMessage) {
          await messagingContract.methods.sendMessage(janeSmithAddress, 'Hello Jane!').send({
            from: johnDoeAddress,
            gas: 500000,
            gasPrice: web3.utils.toWei('20', 'gwei')
          });
          console.log('John Doe sent message successfully.');
        } else {
          console.log('Function sendMessage does not exist in MessagingContract.');
        }
      } catch (error) {
        console.error(`Error sending message:`, error);
      }
    } else {
      console.log('No friend request found from John Doe.');
    }
  } catch (error) {
    console.error(`Error accepting friend request:`, error);
  }
}

simulateJohnDoe();
