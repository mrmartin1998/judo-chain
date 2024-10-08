# JudoChain

## Project Overview:
JudoChain is a decentralized application (DApp) built on Ethereum that facilitates registration, management, and interactions for Judokas (Judo practitioners). The project integrates blockchain technology to track promotions, votes, and social interactions among Judokas, ensuring transparency, security, and immutability. The platform allows users to register their Judo ranks, vote for each other, engage in social interactions (like sending friend requests and forum posts), and update personal profiles, all while using smart contracts to record these activities on-chain.

## Key Features:

### 1. Judoka Registration:
- Judokas (Judo practitioners) can register on the platform with their personal information, including their name, email, belt rank, gym, promotion date, and location.
- Smart contract: `JudokaRegistry.sol` ensures Judokas are registered on the blockchain and stores their promotions and voting power based on their belt level.

### 2. Profile Management:
- Judokas can update their profile information, including their location (city, state, country), social media handles, and a brief description.
- Smart contract: `ProfileManagement.sol` handles updating and storing Judoka profiles on the blockchain.

### 3. Voting System:
- Registered Judokas can vote for each other to verify or acknowledge their progress, awarding points to other Judokas based on their belt level.
- Smart contract: `VotingContract.sol` manages the voting system and updates points for each Judoka based on the votes received.

### 4. Social Interactions:
- Users can send friend requests to each other and engage in private messaging once the requests are accepted.
- Smart contract: `MessagingContract.sol` handles sending and accepting friend requests, along with sending private messages between friends.
- Users can also post content and comment on forum posts, engaging in public discussions.
- Smart contract: `ForumContract.sol` allows Judokas to create forum posts and comment on them.

### 5. Blockchain Integration:
- The platform records key activities like Judoka registration, profile updates, votes, friend requests, and forum interactions on the Ethereum blockchain, providing an immutable and transparent record of all activities.
- Smart contracts interact with the blockchain to ensure that all actions are securely recorded.

### 6. Deployment and Hosting:
- The project is deployed on **Vercel** for frontend hosting.
- The smart contracts are deployed to a local Ethereum network (via Ganache) and managed using **Truffle** for migration and deployment.
- The frontend uses **Next.js** as a framework to interact with the blockchain and display data from the smart contracts.

## Technologies Used:
- **Blockchain & Ethereum**:
  - Smart contracts written in Solidity.
  - Truffle for contract deployment and migrations.
  - Web3.js to connect the frontend with the blockchain.
  
- **Frontend**:
  - Next.js for server-side rendering and a React-based frontend.
  - Web3.js for interacting with the Ethereum blockchain from the frontend.
  
- **Backend**:
  - Smart contracts deployed on a local Ethereum network using Ganache.
  
- **Social & Voting Systems**:
  - Friend requests, messaging, and a voting system are implemented using smart contracts and recorded on the blockchain for transparency.

## Workflow Summary:
### 1. User Registration:
- Users register as Judokas on the platform by submitting their personal details and gym information. The smart contract calculates their voting power based on their belt level.

### 2. Profile Updates:
- Users can update their location and description, which is recorded on the blockchain.

### 3. Voting:
- Judokas can vote for other Judokas, awarding them points based on their voting power, which is determined by their rank.

### 4. Friend Requests and Messaging:
- Judokas can send friend requests, accept them, and communicate via private messages once the connection is established.

### 5. Forum Interaction:
- Users can post in forums, comment on posts, and engage in public discussions.

## Conclusion:
JudoChain is a fully decentralized platform that uses smart contracts to provide secure, transparent, and immutable record-keeping for the Judo community. The system enables Judokas to engage in a social and voting system while keeping track of their achievements and interactions on the blockchain.
