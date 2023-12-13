# Uskok validator

## Simple library for validating objects in javascript.

## Example:

```js
const objectToTest = {
  name: 'Vuk',
  age: '13'
}

const schema = uskokValidator.object({
  fields: {
    name: uskokValidator.string(),
    age: uskokValidator.number()
  }
})

console.log(schema(objectToTest))
/*
{
  computedMessage: "age: Value is not the right type, type: 'number'",
  errorCode: 'wrong_type',
  name: 'age'
}
*/
```
## There is a lot more to it but this is just one example