---
sidebar_position: 1
---

# What is KJect?
KJect is a dependency injection framework for Kotlin.
It is designed to be simple, lightweight, and easy to use.

## What is Dependency Injection?
Dependency Injection is the general concept of providing an object with the dependencies it needs to function.

KJect takes this concept and applies it to Kotlin.
For this KJect views every dependency as a singleton.

A Singleton in general is a class that is only initialized once.

While this is the general concept of dependency injection KJect also provides a few other features,
such as method calling (also with suspending functions), launch and dispose hooks and facades.

## Why use Dependency Injection?
While it is possible to manage your dependencies manually, it is often a lot of work to do so.
In Kotlin, we could make use of the `object` keyword, but this also doesn't solve all problems.

KJect aims to solve these problems by providing a simple and lightweight framework for dependency injection.