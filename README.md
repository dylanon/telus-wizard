# telus-wizard

[![version][npm-image]][npm-url] [![Build Status][circle-image]][circle-url]

> Wizard that renders a React component based on the steps you pass to it

🧙‍♂️🧙‍♀️

There are two elements to this package - the step builder and the component rendered. You'll want to use the step builder to generate the nodes for each of your steps and then render the component it outputs.

View an example of how to use this package [here](https://github.com/telus/telus-wizard/blob/master/EXAMPLE.md)

To include in your application:
```bash
npm install @telus/telus-wizard --save
```

## Builder methods
### setLang
```
.setLang(language = String)
```
**Optional**. Default is `en`, but you can set whatever you want here and it will be passed to all of your steps as a prop.

### setDefaultComponent
```
.setDefaultComponent(Component = Function)
```
**Optional, but recommended**. Default is `null`. This method allows you to set a generic component to be used for your steps. Can be overridden for individual steps.

### setTransition
```
.setTransition(isEnabled = Boolean)
```

Default is `true`. This method allows you to disable transitions between steps.

### createSteps
```
.createSteps()
```
**Required**. Initializes steps.

### addStep
```
.addStep(id = String, parameters = Object, Component = Function)
```
**Required**. At least one step must be created.

- `id` is required. Must be unique. This is how you reference this step (in withOption or build)
- `parameters` is optional. This object transforms 1:1 into props passed into the component. Allows you to use a unique component with whatever props you need.
- `Component` is optional. If not passed, a default component must have been set with `.setDefaultComponent()`.

### withOption, withLink
```
.withOption(copy = String, id = String)
```
```
.withLink(copy = String, url = String)
```
**At least one option or link required per step**. All steps must have a CTA/button for the customer, so you must include *one* of either withOption or withLink.

- `withOption` requires both parameters. id refers to the step id
- `withLink` requires both parameters.

### build
```
.build(initialStep = String)
```
**Required**. Validates and builds the steps, returning one top-level component. `initialStep` is required, dictating which step you want to start with using the step id.

---
## Local Development
If you want to work locally on this package, run:

```bash
npm run setup-local
```

---
> Github: [@telus](https://github.com/telus) &bull;
> Twitter: [@telusdigital](https://twitter.com/telusdigital)

[circle-url]: https://circleci.com/gh/telus/telus-wizard
[circle-image]: https://img.shields.io/circleci/project/github/telus/telus-wizard/master.svg?style=for-the-badge&logo=circleci

[npm-url]: https://www.npmjs.com/package/@telus/telus-wizard
[npm-image]: https://img.shields.io/npm/v/@telus/telus-wizard.svg?style=for-the-badge&logo=npm
