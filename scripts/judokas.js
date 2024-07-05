const { Web3 } = require('web3');
const path = require('path');
const JudokaRegistry = require(path.resolve(__dirname, '../build/contracts/JudokaRegistry.json'));
const VotingContract = require(path.resolve(__dirname, '../build/contracts/VotingContract.json'));
const MessagingContract = require(path.resolve(__dirname, '../build/contracts/MessagingContract.json'));
const ForumContract = require(path.resolve(__dirname, '../build/contracts/ForumContract.json'));
const ProfileManagement = require(path.resolve(__dirname, '../build/contracts/ProfileManagement.json'));

// Initialize Web3 instance
const web3 = new Web3('http://127.0.0.1:7545');

const judokaRegistryAddress = '0x239cB6edC2A80d3020a2b1f266aB6797Cca6ec71';
const votingContractAddress = '0x413Cf9b2Bfc3D88DC3161B56995BE04DE85ee12F';
const messagingContractAddress = '0x7CDdfA7C98bc8b6E03f07e1322d84D73872F929B';
const forumContractAddress = '0x51c021FB6Af613480C5A1afC31aaEC073F8f5965';
const profileManagementAddress = '0x433D6D4222FcD7f34C0C2eEC5E2Ec0eDC18986f2';

const judokaRegistryContract = new web3.eth.Contract(JudokaRegistry.abi, judokaRegistryAddress);
const votingContract = new web3.eth.Contract(VotingContract.abi, votingContractAddress);
const messagingContract = new web3.eth.Contract(MessagingContract.abi, messagingContractAddress);
const forumContract = new web3.eth.Contract(ForumContract.abi, forumContractAddress);
const profileManagementContract = new web3.eth.Contract(ProfileManagement.abi, profileManagementAddress);

// Function to handle BigInt serialization in JSON
function jsonifyBigInt(object) {
  return JSON.stringify(object, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  );
}

// List of judokas to be registered
const judokas = [
  { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', beltLevel: 'Black (1st Dan)', promotionDate: '2023-01-01', gym: 'Gym A', city: 'City A', state: 'State A', country: 'Country A', description: 'Judoka from Gym A' },
  { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', beltLevel: 'Brown', promotionDate: '2023-01-01', gym: 'Gym B', city: 'City B', state: 'State B', country: 'Country B', description: 'Judoka from Gym B' },
  { firstName: 'Alice', lastName: 'Johnson', email: 'alice.johnson@example.com', beltLevel: 'Green', promotionDate: '2023-01-01', gym: 'Gym C', city: 'City C', state: 'State C', country: 'Country C', description: 'Judoka from Gym C' },
  { firstName: 'Bob', lastName: 'Williams', email: 'bob.williams@example.com', beltLevel: 'Blue', promotionDate: '2023-01-01', gym: 'Gym D', city: 'City D', state: 'State D', country: 'Country D', description: 'Judoka from Gym D' },
  { firstName: 'Charlie', lastName: 'Brown', email: 'charlie.brown@example.com', beltLevel: 'Green', promotionDate: '2023-01-01', gym: 'Gym E', city: 'City E', state: 'State E', country: 'Country E', description: 'Judoka from Gym E' },
  { firstName: 'David', lastName: 'Lee', email: 'david.lee@example.com', beltLevel: 'Yellow', promotionDate: '2023-01-01', gym: 'Gym F', city: 'City F', state: 'State F', country: 'Country F', description: 'Judoka from Gym F' },
  { firstName: 'Eva', lastName: 'Martin', email: 'eva.martin@example.com', beltLevel: 'Orange', promotionDate: '2023-01-01', gym: 'Gym G', city: 'City G', state: 'State G', country: 'Country G', description: 'Judoka from Gym G' },
  { firstName: 'Frank', lastName: 'Clark', email: 'frank.clark@example.com', beltLevel: 'White', promotionDate: '2023-01-01', gym: 'Gym H', city: 'City H', state: 'State H', country: 'Country H', description: 'Judoka from Gym H' },
  { firstName: 'Grace', lastName: 'Lewis', email: 'grace.lewis@example.com', beltLevel: 'Black (1st Dan)', promotionDate: '2023-01-01', gym: 'Gym I', city: 'City I', state: 'State I', country: 'Country I', description: 'Judoka from Gym I' }
];

// Function to register all judokas
async function registerJudokas(accounts) {
  for (let i = 0; i < judokas.length; i++) {
    const judoka = judokas[i];
    const account = accounts[i + 1]; // Assuming first account is for deployment/admin
    try {
      await judokaRegistryContract.methods.registerJudoka(
        judoka.firstName,
        judoka.lastName,
        judoka.email,
        judoka.beltLevel,
        judoka.promotionDate,
        judoka.gym
      ).send({
        from: account,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log(`${judoka.firstName} ${judoka.lastName} registered successfully.`);
    } catch (error) {
      console.error(`Error registering ${judoka.firstName} ${judoka.lastName}:`, error);
    }
  }
}

// Function to update profile information
async function updateProfileInfo(accounts) {
  for (let i = 0; i < judokas.length; i++) {
    const judoka = judokas[i];
    const account = accounts[i + 1];
    try {
      await profileManagementContract.methods.updateCity(judoka.city).send({
        from: account,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      await profileManagementContract.methods.updateState(judoka.state).send({
        from: account,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      await profileManagementContract.methods.updateCountry(judoka.country).send({
        from: account,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      await profileManagementContract.methods.updateDescription(judoka.description).send({
        from: account,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log(`${judoka.firstName} ${judoka.lastName} updated their profile information.`);
    } catch (error) {
      console.error(`Error updating profile information for ${judoka.firstName} ${judoka.lastName}:`, error);
    }
  }
}

// Function to send and accept friend requests
async function handleFriendRequests(accounts) {
  // Send friend requests
  for (let i = 0; i < accounts.length - 1; i++) {
    for (let j = i + 1; j < accounts.length; j++) {
      try {
        await messagingContract.methods.sendFriendRequest(accounts[j]).send({
          from: accounts[i],
          gas: 500000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        });
        console.log(`Friend request sent from ${accounts[i]} to ${accounts[j]}`);
      } catch (error) {
        console.error(`Error sending friend request from ${accounts[i]} to ${accounts[j]}:`, error);
      }
    }
  }

  // Accept friend requests
  for (let i = 0; i < accounts.length; i++) {
    const friendRequests = await messagingContract.methods.getUserFriendRequests(accounts[i]).call();
    for (let j = 0; j < friendRequests.length; j++) {
      try {
        await messagingContract.methods.acceptFriendRequest(friendRequests[j]).send({
          from: accounts[i],
          gas: 500000,
          gasPrice: web3.utils.toWei('20', 'gwei')
        });
        console.log(`Friend request ${friendRequests[j]} accepted by ${accounts[i]}`);
      } catch (error) {
        console.error(`Error accepting friend request ${friendRequests[j]} by ${accounts[i]}:`, error);
      }
    }
  }
}

// Function to update judoka information
async function updateJudokaInfo(accounts) {
  for (let i = 0; i < judokas.length; i++) {
    const judoka = judokas[i];
    const account = accounts[i + 1];
    try {
      await judokaRegistryContract.methods.updateJudoka(
        judoka.firstName,
        judoka.lastName,
        judoka.email,
        judoka.beltLevel,
        judoka.promotionDate,
        `New ${judoka.gym}`
      ).send({
        from: account,
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log(`${judoka.firstName} ${judoka.lastName} updated their information.`);
    } catch (error) {
      console.error(`Error updating information for ${judoka.firstName} ${judoka.lastName}:`, error);
    }
  }
}

// Function to handle forum posts and comments
async function handleForumPosts(accounts) {
  // Create posts
  for (let i = 0; i < judokas.length; i++) {
    const judoka = judokas[i];
    try {
      await forumContract.methods.createPost(`Post by ${judoka.firstName}`, 'This is a post content.').send({
        from: accounts[i + 1],
        gas: 500000,
        gasPrice: web3.utils.toWei('20', 'gwei')
      });
      console.log(`Post created by ${judoka.firstName}`);
    } catch (error) {
      console.error(`Error creating post by ${judoka.firstName}:`, error);
    }
  }

  // Create comments on each post
  for (let i = 1; i <= judokas.length; i++) {
    for (let j = 0; j < judokas.length; j++) {
      if (j !== i - 1) { // Avoid self-commenting
        try {
          await forumContract.methods.createComment(i, `Comment by ${judokas[j].firstName}`).send({
            from: accounts[j + 1],
            gas: 500000,
            gasPrice: web3.utils.toWei('20', 'gwei')
          });
          console.log(`Comment by ${judokas[j].firstName} on post ${i}`);
        } catch (error) {
          console.error(`Error creating comment by ${judokas[j].firstName} on post ${i}:`, error);
        }
      }
    }
  }
}

// Function to vote for each other
async function handleVoting(accounts) {
  for (let i = 0; i < accounts.length; i++) {
    for (let j = 0; j < accounts.length; j++) {
      if (i !== j) { // Avoid self-voting
        try {
          await votingContract.methods.voteForUser(accounts[j], true).send({
            from: accounts[i],
            gas: 500000,
            gasPrice: web3.utils.toWei('20', 'gwei')
          });
          console.log(`Vote by ${accounts[i]} for ${accounts[j]}`);
        } catch (error) {
          console.error(`Error voting by ${accounts[i]} for ${accounts[j]}:`, error);
        }
      }
    }
  }
}

async function simulateJudokas() {
  const accounts = await web3.eth.getAccounts();

  await registerJudokas(accounts);
  await handleFriendRequests(accounts);
  await updateJudokaInfo(accounts);
  await updateProfileInfo(accounts);
  await handleForumPosts(accounts);
  await handleVoting(accounts);
}

simulateJudokas();
