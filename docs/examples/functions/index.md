---
sidebar_position: 3
---

# Functions
KJect provides the ability to call function.
This feature can be used to automatically inject instances into functions.

## Simple Calling
To call a function throw KJect execute the `call` function on the `KJect` object.

:::note

You can use @Inject on parameters to get or create an instance from KJect

:::

```kotlin title="Function"
fun function(@Inject someInstance: SomeInstance) {
    // ...
}
```

```kotlin title="Main"
KJect.call(::function)
```

## Parameters
KJect provides a `CallBuilder` to add parameters to function calls.
You can provide values for any parameter of the function.

There are two special parameters that can be set via the `CallBuilder`:
- The instance parameter, witch tells Kotlin on witch instance to call a function.
- The receiver parameter, witch tells Kotlin on witch instance to call a receiver function.

In addition, you can set any other parameter of the function by name.

```kotlin title="Function"
fun String.function(@Inject someInstance: SomeInstance, someValue: String) {
    // ...
}
```

```kotlin title="Main"
KJect.call(::function) {
    // instance = "Hello World"
    receiver = "Hello World"
    this["someValue"] = "Some Value"
}
``` 

## Return Values
The value returned by the function is parsed to a [`Deferred`](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines/-deferred/) and returned by the `call` function.

This is important for [suspending functions](./suspending.md).

```kotlin title="Function.kt"
fun function(): String {
    return "Hello World"
}
```

```kotlin title="Main.kt"
val value = KJect.call(::function).await()
```

:::note

All functions return values are parsed to a `Deferred` and returned by the `call` function,
regardless if the called function is suspending or not.

:::