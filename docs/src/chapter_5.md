### Chapter 5: **Retrieving Tags and Public Keys**

In the previous chapter, we explored how to register a wallet tag with a public key and associated contract information. Now, we’ll turn our attention to the retrieval process: how to query the registry to get the details of a tag or public key.

The smart contract provides two essential functions for retrieval:
1. **`get_key`**: Retrieves the wallet details given a tag.
2. **`get_tag`**: Performs a reverse lookup to get the tag associated with a given public key.

---

#### 5.1 Retrieving Account Details by Tag: `get_key`

Once a tag is registered, users or wallet providers may want to query the registry to get the public key and associated contract details for that tag. The function designed for this purpose is `get_key`.

Here is the function definition:

```rust
#[receive(
    contract = "registry",
    name = "get_key",
    parameter = "String",
    error = "Error",
)]
fn get_key(ctx: &ReceiveContext, host: &Host<State>) -> RegistryResult<Registry> {
    let mut tag: String = ctx.parameter_cursor().get()?;
    if !tag.ends_with(".ccd") {
        tag.push_str(".ccd");
    }
    host.state.get(tag)
}
```

##### 5.1.1 Function Workflow

1. **Parameter Parsing**: 
   - The function accepts a tag as its input parameter, which is provided by the user or wallet provider.
   - The contract first parses the input to retrieve the tag. If the tag does not already end with `.ccd`, the contract appends this suffix automatically to ensure the tag conforms to the CIS5 wallet standard.

2. **Tag Lookup**: 
   - After processing the tag, the contract checks its internal registry to find the details associated with the tag. 
   - It uses the `host.state.get(tag)` method to query the `State` map and retrieve the `Registry` object linked to the tag. If the tag is not found, the contract returns an error (`Error::TagDoesNotExist`).

3. **Return**: 
   - If the tag exists, the contract returns the corresponding `Registry` object, which includes:
     - The public key.
     - The smart contract wallet address.
     - The wallet provider.

##### 5.1.2 Sample Usage Scenario

Consider a wallet provider that needs to send tokens to a user registered in the CIS5 wallet registry. Instead of asking the user for their public key and contract details, the provider can use the user’s tag (e.g., `"alice.ccd"`) to query the contract via `get_key`.

For example, the provider could invoke the `get_key` function with the following input:

```json
"alice"
```

The contract would return:

```json
{
    "public_key": "ed25519:9cf7b748...",
    "contract_address": "ccd1qqx...",
    "provider": "MyWalletApp"
}
```

The provider can now send tokens to `"alice.ccd"` without requiring manual input from the user.

---

#### 5.2 Reverse Lookup by Public Key: `get_tag`

In some cases, users or wallet providers might have a public key but not the corresponding tag. The `get_tag` function enables reverse lookup, allowing anyone to retrieve the tag associated with a given public key.

Here’s the function definition:

```rust
#[receive(
    contract = "registry",
    name = "get_tag",
    parameter = "PublicKeyEd25519",
    error = "Error",
)]
fn get_tag(ctx: &ReceiveContext, host: &Host<State>) -> RegistryResult<String> {
    let key: PublicKeyEd25519 = ctx.parameter_cursor().get()?;
    host.state.get_tag(key)
}
```

##### 5.2.1 Function Workflow

1. **Parameter Parsing**:
   - The `get_tag` function accepts a public key as input, specifically of type `PublicKeyEd25519`.
   - The contract parses this parameter from the input, ensuring the public key is correctly formatted.

2. **Public Key Lookup**:
   - After extracting the public key, the contract checks its internal lookup table to see if there is a tag associated with this key.
   - It uses the `host.state.get_tag(key)` method to perform this reverse lookup in the `lookup` map. If no tag exists for the public key, the contract returns an error (`Error::KeyDoesNotExist`).

3. **Return**:
   - If the public key exists, the contract returns the tag associated with it, such as `"alice.ccd"`. This tag can then be used for further queries or transactions.

##### 5.2.2 Sample Usage Scenario

Consider a scenario where a wallet provider has a user’s public key (`ed25519:9cf7b748...`) but does not know the associated tag. To simplify the transaction process, the provider can perform a reverse lookup using the `get_tag` function.

The input would look like this:

```json
"ed25519:9cf7b748..."
```

The contract would return:

```json
"alice.ccd"
```

With the tag `"alice.ccd"`, the provider can then look up additional details or use it for transactions.

---

#### 5.3 Error Handling in Retrieval

Both `get_key` and `get_tag` functions include error handling mechanisms that return appropriate errors when a tag or public key is not found.

1. **`Error::TagDoesNotExist`**:
   - This error is triggered when a tag lookup fails, meaning the tag provided is not registered in the contract.

2. **`Error::KeyDoesNotExist`**:
   - This error occurs during reverse lookup when a public key is not found in the `lookup` map.

These errors help users and providers quickly identify issues and take corrective action, whether it’s rechecking the tag or public key, or informing the user that they need to register their wallet first.

---

### Chapter Summary

In this chapter, we’ve explored the two main retrieval functions of the CIS5 wallet registry:
- **`get_key`**: Retrieves wallet details based on a tag.
- **`get_tag`**: Performs a reverse lookup to retrieve the tag associated with a public key.

These functions simplify asset transfers by removing the need for manual input and reducing the risk of errors. By utilizing the `.ccd` tag standard, wallet providers and users can securely and efficiently interact with the registry.

In the next chapter, **Chapter 6: Security Considerations**, we’ll examine the security features of the contract, including signature verification and nonce management, and how they protect the integrity of the registry.

---