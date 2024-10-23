### Chapter 7: **Interacting with the Contract**

In this chapter, we will explore how users and wallet providers can interact with the CIS5 wallet registry smart contract after it has been deployed. This includes the functionalities for registering wallet tags, retrieving wallet details, and conducting reverse lookups for tags associated with public keys. We will also cover best practices for using the contract effectively.

>This chapter assumes that you have worked with the concordium `@concordium/ccd-js-gen` and `@concordium/web-sdk` in the past or atleast in theory. if not please refer to this [tutorial](https://medium.com/@buki.offor/concordium-full-stack-smart-contract-account-tutorial-part-two-2aa6fb81f2b7)
---

#### 7.1 Registering a Wallet Tag

To register a new wallet tag, a user must call the `register` function of the contract, providing their public key, signature, and the desired tag. Here’s a detailed breakdown of how this interaction occurs.

##### 7.1.1 Preparing the Registration Message

Before making the call, users need to create a `RegisterMessage`. This message includes the signer’s public key, the signature for authentication, and the registration details encapsulated in a `RegisterParam`. Here’s an example of how to construct this message:

```ts
// creates the register object parameter
const param: Registry.RegisterParameter = {
	message: {
		data: {
			contract_address: ContractAddress.create(100, 0), //address of the smartwallet that operates this key
			provider: "AfrixLabs",
			public_key:"c82ce198a0595e621d9ab066b3950b78efbeea4eecfaf246bc3e0238d8d6d799",
		},
		expiry_time: Timestamp.futureMinutes(15),
		tag: "buki.ccd",
	},
	signature:"5ac312ac52171a91866e3e9de7bfe7caa24cc9385175f6718b3df00b912bd0e2b300a0e684e1d461b2de2a79d1149f04923b7b338dcfbfb2493b214d9683c70d",
   signer:"c82ce198a0595e621d9ab066b3950b78efbeea4eecfaf246bc3e0238d8d6d799",
};
```

##### 7.1.2 Calling the Register Function

With the registration message prepared, users can call the contract’s `register` function. If successful, the tag will be stored on-chain, and the contract will log an event:

```ts
// create an instance of the contract address
const contractAddr = ContractAddress.create(10289);
const contract = Registry.createUnchecked(this.grpc, contractAddr)

// simulate a registeration to confirm if the transaction will be successfull 
const response = await Registry.dryRunRegister(contract, param)

// check the output
if (!response || response.tag === 'failure' || !response.returnValue) {
   const parsedErrorCode = Registry.parseErrorMessageRegister(response)?.type;
   return { status: false, message: JSON.stringify(parsedErrorCode) }
}
// gas fee
const maxContractExecutionEnergy = Energy.create(response.usedEnergy.value + BigInt(200));

// construct metadata object
const metadata: ContractTransactionMetadata = {
         amount: CcdAmount.zero(),
         senderAddress: AccountAddress.fromBase58("38TN6fTCjgHYp7vXDagLJsb6s3UHzDANaGS2wXwgQLBUJrEian"),
         energy: maxContractExecutionEnergy
   }

// send the actual transaction
await Registry.sendRegister(contract, metadata, param, this.signer);
```

If the tag already exists, the contract will return an `Error::TagAlreadyExists`, ensuring that each public key is associated with a unique tag.

---

#### 7.2 Retrieving Wallet Details

Users can easily retrieve the details associated with their registered tag by invoking the `get_key` function. This function takes a string as input and returns the corresponding `Registry` object, which contains important information about the user's wallet.

##### 7.2.1 Using the Get Key Function

To query the contract for wallet details, users should ensure their tag ends with `.ccd`, which indicates a registered wallet tag. Here’s how to call the `get_key` function:

```ts
const contractAddr = ContractAddress.create(10289);

const contract = Registry.createUnchecked(this.grpc, contractAddr)

let tag: Registry.GetKeyParameter = "buki.ccd";

// simulate the transaction request
const result = await Registry.dryRunGetKey(contract,tag);

return result;
```

If the tag exists in the registry, the function will return the `Registry` object with the user’s public key, contract address, and provider information. If the tag does not exist, an `Error::TagDoesNotExist` will be returned.

---

#### 7.3 Reverse Lookup for Tag

For users who want to find their registered tag based on their public key, the `get_tag` function allows them to perform a reverse lookup. This functionality is crucial for users who may forget their tags or want to verify their registered information.

##### 7.3.1 Calling the Get Tag Function

To retrieve the tag associated with a given public key, users simply need to call the `get_tag` function:

```ts
const contractAddr = ContractAddress.create(10289);
const contract = Registry.createUnchecked(this.grpc, contractAddr)
const key: Registry.GetTagParameter = 'c82ce198a0595e621d9ab066b3950b78efbeea4eecfaf246bc3e0238d8d6d799';
const result = await Registry.dryRunGetTag(contract,key);
return result;
```

This function will return the associated tag if the public key exists in the registry. If not, it will return an `Error::KeyDoesNotExist`, ensuring that users have clear feedback on the validity of their query.

---

#### 7.4 Best Practices for Usage

When interacting with the CIS5 wallet registry contract, users should follow these best practices to ensure a smooth experience:

1. **Tag Uniqueness**:
   - Always check that the desired tag does not already exist before attempting to register it. This prevents unnecessary errors and ensures clarity in the registry.

2. **Correct Tag Formatting**:
   - Ensure that all tags used in registration and queries end with `.ccd`. This helps maintain a consistent format and avoids lookup issues. Also users should keep the tag length prefarable under 12 characters, this is not enforced by the contract though.

3. **Secure Key Management**:
   - Users should store their private keys securely. Never share private keys or signatures publicly, as this can compromise wallet security.

4. **Thorough Testing**:
   - Always test interactions in a safe environment before relying on them for actual transactions. This is crucial for understanding how the contract behaves under various conditions.

---

### Chapter Summary

In this chapter, we explored the ways users can interact with the CIS5 wallet registry smart contract, focusing on:

- **Registering Wallet Tags**: How to prepare and submit registration messages to the contract.
- **Retrieving Wallet Details**: Using the `get_key` function to access wallet information based on tags.
- **Reverse Lookups for Tags**: How to use the `get_tag` function to find tags associated with public keys.
- **Best Practices for Usage**: Key recommendations for ensuring secure and effective interactions with the contract.

In the next chapter, **Chapter 8: Real-World Applications**, we will delve into potential use cases for the CIS5 wallet registry, exploring how it can simplify user onboarding and asset transfers in various blockchain applications.

---

