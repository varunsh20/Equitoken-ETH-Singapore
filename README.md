# EquiToken
 - [Smart Contracts Repo](https://github.com/varunsh20/Equitoken-Contracts)
 - [World Id Verify Backend](https://github.com/varunsh20/world-id-backend)

## :right_anger_bubble: Overview:

EquiToken is a Real World Asset (RWA) Tokenization platform that allows users to purchase tokenized versions of real-world stocks like Tesla, NVIDIA, Meta, and Google. These tokens are backed 1:1 by the corresponding assets and are traded in real-time through Alpacca Brokerage's APIs. Users can specify the number of stock tokens they wish to purchase, and in the backend, the same amount of real stocks is bought via Alpaca. Every user on the platform is authenticated through World ID to ensure Security and Transparency.  

Unlike traditional systems, the "Buy" API call to purchase stocks is executed on-chain using Chainlink's Functions. Upon successful execution, an equivalent number of ERC-20 tokens are minted to the user’s address with the price being fetched thorugh Chainlink Oracles. For selling, users invoke the sell function, which triggers the "Sell" API to sell the stocks in real time, burns the user's tokens, and returns the corresponding USDT amount.

To ensure transparency and trust, the brokerage account is always over-collateralized by double the amount the user intends to purchase, maintaining a robust check on balances.

### [View dApp](https://equitoken.netlify.app/)

![equi-1](https://github.com/user-attachments/assets/27cc003d-43dd-4753-883c-9a8769241d73)

## :hammer_and_wrench: Tech Stack:
### Backend
 - **Solidity** for writing Smart Contracts
 - **Remix** and **Foundary** for Smart Contract Development, Deployment & Testing.
 - **JavaScript** for writing deploy scripts and test cases.
 - **Alpacca** Platform for trading stocks in real time.
 - **ChainLink's Fuunctions** for executing the APIs on-chain resulting in trading tokens through Smart Contract calls.
 - **World ID** for Proof of Humanhood and Identity to secure the platform and ensuring Transparency.
 - **Dynamic Wallet** for easier user onboarding allowing users to connect with their already registered wallet or create a new one, allowing easier on-ramping and off-ramping.
 - **Alchemy** for providing RPC node urls to interact and fetch data from blockchain.
 - **ERC-20** standard for evm compatible tokens used in the dApp and **ERC-4626** contract for our Tokenized Vault used to provide claims amount to users.


### Frontend
 - **JavaScript & React.js** for building interactive dynamic UI interface.
 - **Ethers.js** for integrating the Smart Contracts with UI application.
 - **Chakra-UI** Library for designing and styling UI.

## :eyes: Usage:
