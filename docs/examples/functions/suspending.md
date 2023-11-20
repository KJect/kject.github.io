---
sidebar_position: 1
---

# Suspending functions
Every function called by KJect can be suspending.

It is always the callers decision if the result of a function should be awaited or not.

```kotlin title="Function.kt"
suspend fun function(): String {
    return "Hello World"
}
```

```kotlin title="Main.kt"
val deferred = KJect.call(::function)

// highlight-start
// the caller can await the result
val value = deferred.await()
// highlight-end
```

The dispatcher can be changed by using the `@On` annotation to a function.

```kotlin title="Function.kt"
@On(On.Dispatcher.IO)
suspend fun function(): String {
    return "Hello World"
}
```

:::note

Per default the scope passed to the `launch` function is used as the dispatcher.

:::
