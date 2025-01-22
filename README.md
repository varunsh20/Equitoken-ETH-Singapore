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
**The working and usage of the project is described below:**

### Authentication & Onboarding
- Users need to verify themselves by scanning this World ID QR code through their world id app on mobile, this helps to achieve Proof of Humanhood and gives a unique identity to every user. This verification is handled on the backend by world id api.
- After verification users can onboard themselves on the platform through Dynamic Wallet intgration. It allows users to sign up with their email and connect with their already existing wallet or create a new wallet for them and also allows crypto on-ramping and off-ramping.

 ![equi-3](https://github.com/user-attachments/assets/5c41a1b7-8a9e-4ed0-b6d4-380a0113bac2)
 ![equi-4](https://github.com/user-attachments/assets/4898ff7a-9d93-4bfa-994e-4a8ab5e00667)
 ![equi-5](https://github.com/user-attachments/assets/4717b05d-a49f-429c-b349-90ff121e651a)

### Trading Tokens
- After onboarding users can proceed to trade tokens like cMeta, cTSLA, cNVDA, cGOOG, they all represents their corresponding ticker in real world.
- The trading occurs in real time after users call buy/sell function, the corresponding buy or sell script will get executed on-chain with the help of chainlink's functions and the API call will buy or sell these stocks on the alpaca brokerage account.
- When the buy function is called, given amount of stocks are purchased on alpacca and equal number of tokens are minted on user's address. Similarly on sell call, given number of stocks are sold on brokerage account and equal number of tokens are burned.

![equi-6](https://github.com/user-attachments/assets/7dd89bb2-a3ac-4ca0-8288-1d3a2f2fbec8)
![equi-7](https://github.com/user-attachments/assets/bcdf26d9-669c-40f6-b798-737842f7d496)

## :ledger: Future Work:
- Implementing Chanlink's Proof of Reserves to track that the tokens are actually backed 1:1 by the stocks on the brokerage account.
- Developing Liquidity Pools for these tokens using Uniswap V4 so that they can be traded and swap easily on blockchain through other tokens.
- Developing a Lending/Borrowing Functionality to make these tokens more liquid and enabling more use-cases rather than sitting idle in wallets, they can be used as collateral to borrow other assets.

