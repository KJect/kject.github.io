---
sidebar_position: 2
---

# Lifecycle
You can hook into the lifecycle of an instance by annotating methods with `@Initialize` and `@Dispose`.

The initialize function will be called when the instance is created and 
the dispose function will be called when the instance is disposed.

KJect will ensure that all classes required by `@Require` are disposed after the instance is disposed.

You can use any other class by adding them as a parameter with the `@Inject` annotation.

## Example
```kotlin
@Require(Other::class)
class ExampleClass {
    
    @Initialize
    fun initialize(@Inject other: Other) {
        println("Initializing ExampleClass")
    }
    
    @Dispose
    fun dispose() {
        println("Disposing ExampleClass")
        // highlight
        // Note: Other is not disposed yet
    }
    
}
```