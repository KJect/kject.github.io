---
sidebar_position: 4
---

# Putting it all together
After looking at the different examples separately let's put it all together.

For this we will create a dummy database and a small event-system that can use it.

## Database
Let's start with the database.

We want to have a facade on the database, so we can easily switch the implementation later on,
for example when using another database.

For this we assume a simple key-value database.

```kotlin title="Database.kt"
@Facade(DatabaseImplementation::class)
interface Database {

    operator fun get(key: String): String?
    
    operator fun set(key: String, value: String)
    
    operator fun contains(key: String): Boolean
    
    operator fun minus(key: String)

}
```

Now we need to create a building for the database.
We may use some external database library, we simulate the connection and disconnection process by a delay of 1 second.

However we will use a map to make everything work.

```kotlin title="DatabaseImplementation.kt"
internal class DatabaseImplementation : Database {
    
    private val map = mutableMapOf<String, String>()
    
    @Initialize
    suspend fun connect() {
        delay(1000)
    }
    
    @Dispose
    suspend fun disconnect() {
        delay(1000)
        map.clear()
    }
    
    override operator fun get(key: String) = map[key]
    
    override operator fun set(key: String, value: String) {
        map[key] = value
    }
    
    override operator fun contains(key: String) = map.containsKey(key)
    
    override operator fun minus(key: String) {
        map.remove(key)
    }

}
```

So this is our database.
Let's create a small event-system that can use it.

## Event-System
We want to have an event base class that can be extended by any event.

```kotlin title="Event.kt"
abstract class Event
```

Now let's create a `EventHandler` we can use for calling listeners.
The handler should have a map of events to their corresponding listeners,
a function to listen to a specific event and a function to call an event.

The function to call an event should invoke all functions using KJect while providing the event as a parameter,
when the class of the parameter matches the class of the event.

```kotlin title="EventHandler.kt"
object EventHandler {

    val listeners = mutableMapOf<KClass<out Event>, MutableList<KFunction<*>>>()
    
    inline fun <reified E : Event> on(listener: KFunction<*>) {
        listeners.getOrPut(E::class) { mutableListOf() }.add(listener)
    }

    suspend fun call(event: Event) {
        listeners[event::class]?.forEach { function ->
            KJect.call(function) {
                this.parameters
                    .filter { it.type.classifier == event::class }
                    .forEach {
                        this[it] = event
                    }
            }
        }
    }

}
```

## Running the example
To run the example let's first create a event, when a user is created.

```kotlin title="SomeEvent.kt"
class UserCreatedEvent(val userName: String, val created: LocalDateTime) : Event()
```

Then let's create a listener that updates the users creation date in the database.

```kotlin title="SomeListener.kt"
@On(On.Dispatcher.IO)
fun onUserCreate(event: UserCreatedEvent, @Inject database: Database) {
    database[event.userName] = event.created.toString()
}
```

Now let's start everything and try it out.
```kotlin title="Main.kt"
fun main() = runBlocking {
    // Start KJect
    KJect.launch(this)
    
    // Register the listener
    KJect.getOrCreate<EventHandler>().on<UserCreatedEvent>(::onUserCreate)
    
    // Call the event
    KJect.getOrCreate<EventHandler>().call(UserCreatedEvent("SomeUser", LocalDateTime.now()))

    // Wait for the listener to finish
    delay(100)
    
    // Print out the users creation date
    println(KJect.getOrCreate<Database>()["SomeUser"])
    
    // Dispose KJect
    KJect.dispose()
}
```