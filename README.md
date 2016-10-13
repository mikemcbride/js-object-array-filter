JS Object Array Filter
======================

This is a filter function that aims to be a pretty efficient way of filtering an array of objects based on whether any of the values contain the filter term.

## The problem

It's not always easy to tell if an object contains ANY value, or to filter an array of objects based on ones that contain that value. Frameworks like Angular give you some out of the box filtering capabilities to easily filter an array of objects based on a term. The example you've probably seen most often is you have a table with an input field above it and you can type in the input field to filter the rows. The filter is applying the term to every object in the array and seeing if the object contains it, and filters out objects that don't.

This works fine, until you start to scale. Objects with a dozen properties and arrays that are a few hundred in length perform fine. But what happens when you start to get back objects with hundreds of properties on them, like something an enterprise-level API might give you. And what happens when you are looking at thousands of items in the array, not hundreds. Now it's a different story... the filter starts to break down.

## Why this function is better

This function only checks the object values, not the property names. In the case of Angular, let's say you have an object that looked like this:

```javascript
{
	"name": "Mike",
	"occupation": "Developer",
	"skills": [
		"javascript",
		"html",
		"css",
		"java"
	]
}
```
If you use the default filter and type "name", it won't filter anything out (the object would still show). Seems kind of odd, right? When we are getting data back from an API, we expect that all of the objects will look the same (structurally, at least), so I don't care about checking the property.

This function recursively checks nested objects for the value, and it bails as soon as it finds a match. Below you'll find a few examples of how to use it.

## Usage

### `Array.filter()`

Assuming you don't change the function name (`objectInArray`), you can reference it using the default JavaScript `Array.filter`. See the example below:

```js
const arr = [
	{
		"name": "Mike",
		"occupation": "developer",
		"skills": [
			"javascript",
			"html",
			"css",
			"java"
		]
	},
	{
		"name": "Becky",
		"occupation": "nurse",
		"skills": [
			"patient care",
			"oncology",
			"pediatrics",
			"sleeping"
		]
	},
	{
		"name": "Rose",
		"occupation": "child",
		"skills": [
			"watching Elmo",
			"reading",
			"playing",
			"sleeping"
		]
	}
]

const filteredArray = arr.filter(objectInArray("sleeping"))

console.log(JSON.stringify(filteredArray, null, 2))
```

### Standalone function

You can also use the `objectHasValue` function by itself if you only want to check one object, or if you want to implement it a different way. Here's how that would look:

```js
const myObject = {
	"name": "Mike",
	"occupation": "developer",
	"skills": [
		"javascript",
		"html",
		"css",
		"java"
	]
}

objectHasValue(myObject, "css") // => true
objectHasValue(myObject, "nurse") // => false
```

## License

MIT
