### Chapter 2: **Understanding the CIS5 Wallet Registry**

The CIS5 wallet standard is designed to streamline blockchain transactions by providing a standardized way of handling public keys and smart contracts. However, its use becomes much more practical when combined with a system that allows these cryptographic public keys to be associated with human-readable tags. This is where the wallet registry comes in.

In this chapter, we will break down the CIS5 wallet registry smart contract step by step, explaining its functionality and importance within the broader context of blockchain technology. We’ll also dive into the core features of the contract, its structure, and its interactions on the Concordium blockchain.

#### 2.1 What is the CIS5 Wallet Standard?

The CIS5 wallet standard defines a structure for managing blockchain wallets on Concordium. At its core, it allows users to control a wallet through a specific type of cryptographic key, `PublicKeyEd25519`, which is known for its security and efficiency in signing digital signatures.

However, as secure as this key may be, it remains unreadable to humans. The CIS5 standard enables decentralized wallets but does not offer a way to make these keys more user-friendly. This limitation makes it difficult for users to interact with the blockchain without directly managing these complex keys and there coresponding smart contract wallets.

The CIS5 wallet registry is built to overcome this limitation by allowing users to create a unique tag associated with their public key. This tag, such as `user123.ccd`, becomes a recognizable identifier that users can easily share, reducing the risk of human error when transferring assets or interacting with smart contracts.

#### 2.2 Purpose of the Wallet Registry

The wallet registry serves several purposes within a blockchain environment:

1. **Human Readability:** Instead of dealing with long, cryptographic strings, users can register a simple, memorable tag, which is appended with `.ccd` to signify that it is a registered CIS5 wallet address. For example, a user could register `alice.ccd` instead of having to use their public key.
   
2. **Standardized Lookup System:** Once registered, these tags can be queried by other smart contracts or wallets to retrieve the associated public key and wallet information. This creates a standard system where any wallet provider that supports the CIS5 standard can interact with the registry seamlessly.

3. **Error Reduction:** By using a human-readable tag instead of a complex cryptographic key, the registry reduces the likelihood of errors during transactions. Users no longer need to worry about copying and pasting their public keys, which can lead to costly mistakes if done incorrectly.

4. **Interoperability:** While various wallets and smart contracts can operate independently on the blockchain, the wallet registry provides a unified system for managing wallet information across different platforms and providers. Any wallet or app that supports the CIS5 standard can easily query the registry for details about a specific tag.

#### 2.3 The Core Features of the Smart Contract

The CIS5 wallet registry smart contract is designed with three key operations:

1. **Registering a Tag:**
   The `register` function allows a user to associate a human-readable tag with their public key. This tag is unique and cannot be changed once registered. The function ensures that each public key can only be associated with one tag, preventing duplicate entries or accidental overwrites. This function is trustless because each wallet data is pre-signed by the corresponding private key that claims to hold this public key. This signature is verified on chain before the registeration occurs.

2. **Retrieving a Key by Tag:**
   The `get_key` function allows other smart contracts, applications, or users to query the registry by providing a tag (e.g., `alice.ccd`). The registry returns the associated public key and other relevant wallet information, such as the wallet provider and contract address.

3. **Reverse Lookup (Getting a Tag by Key):**
   The `get_tag` function performs a reverse lookup, where a public key is provided, and the associated tag is returned. This is useful in cases where a user or service only knows the public key but needs to find the human-readable tag.

#### 2.4 Contract Structure Overview

The CIS5 wallet registry smart contract is divided into several components, each of which handles a specific part of the contract’s functionality. Here’s a high-level breakdown of the structure:

- **State Definition:**
  The contract maintains a `registry`, which is a mapping between tags and the associated wallet details. It also maintains a `lookup`, which is a reverse mapping that associates public keys with their registered tags. This ensures that both forward and reverse lookups are efficient.

- **Error Handling:**
  The contract defines several custom error types, such as `TagAlreadyExists` and `TagDoesNotExist`, which handle invalid operations gracefully. For example, if a user tries to register a tag that has already been claimed, the contract returns the `TagAlreadyExists` error.

- **Signature Validation:**
  Each operation is cryptographically secure, and the contract validates signatures to ensure that only the owner of a public key can register a tag or manage the associated wallet information. This prevents unauthorized users from tampering with the registry.

- **Event Logging:**
  Events are logged for each action performed within the smart contract. For example, when a new tag is registered, an event is emitted with details about the tag and the associated public key. This allows external applications to track updates to the registry.

The following chapters will delve into each of these functions in greater detail, walking through the code and its logic. But before we move forward, let's discuss the technical environment where the contract operates: the Concordium blockchain.

#### 2.5 Why Concordium?

Concordium is a public, proof-of-stake blockchain with a strong focus on privacy and regulatory compliance. It offers several features that make it an ideal platform for deploying smart contracts, especially those related to wallet management.

- **Privacy and Compliance:** Concordium's built-in identity layer ensures that users maintain their privacy while complying with regulations. This is especially important for applications like wallet registries, where user data must be handled carefully.
  
- **Security:** The blockchain uses highly secure cryptographic algorithms which forms the backbone of the CIS5 wallet standard. The smart contract relies on these cryptographic primitives to ensure that public keys and signatures are handled securely.

- **Efficiency:** Concordium is designed to handle a high volume of transactions without sacrificing security or speed. This is crucial for scalability, where users will regularly query the network for information.

In the next chapter, we will explore the initialization process of the CIS5 wallet registry, walking through the contract’s deployment and initial setup.

---