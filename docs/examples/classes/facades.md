---
sidebar_position: 3
---

# Facades
Often you want to hide your implementation behind an interface or an abstract class.
KJect provides you with the ability to do so with facades.

Any class can be annotated with `@Facade` and provide a building, that needs to implement the facade.
If you try to get or create a facade, KJect will call the according action on the building.

## Example
```kotlin title="Facade.kt"
@Facade(SomeBuilding::class)
interface SomeFacade {

    fun doSomething()
    
}
```

```kotlin title="Building.kt"
class SomeBuilding : SomeFacade {

    override fun doSomething() {
        println("Doing something")
    }

}
```

:::warning

`@Require`, `@Initialize` and `@Dispose` must be used on the building.
Providing them on the facade will not have any effect.

:::