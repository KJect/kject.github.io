---
sidebar_position: 1
---

# Launching and Disposing
KJect has a simple state machine that can be launched and disposed.
If already launched it can't be launched again, and KJect can only be disposed if it is launched.

## Launching
To launch a simple KJect instance, call the `launch` function on the `KJect` object.
This function is suspending and requires a coroutine scope to be passed as a parameter.

:::warning

The coroutine scope passed to the `launch` function must stay alive until KJect is disposed.

:::

```
fun main() {
    runBlocking {
        // highlight
        KJect.launch(this)
    }
}
```

After launching KJect can be used in any other example provided in this documentation.

## Disposing
After you are done using KJect it is important, that you dispose it.
Disposing is important for the cleanup process of KJect.

```
fun main() {
    runBlocking {
        KJect.launch(this)
        
        // ...
             
        // highlight
        KJect.dispose()
    }
}
```

:::note

In the following examples we will assume to be in a coroutine scope, where KJect is launched and not disposed yet.

:::