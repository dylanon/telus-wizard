import React from 'react'
import WizardNode from './WizardNode'
import WizardUI from './WizardUI'

class Wizard {
  constructor () {
    this.steps = null
    this.lang = 'en'
    this._currentNode = null
    this.defaultComponent = null
  }

  _validateStep (id) {
    if (!id) {
      throw new Error('Error: addStep() -> ID is required.')
    }
    if (this.steps.find(node => node.id === id)) {
      throw new Error(`Error: addStep() -> Duplicate ID '${id}' found.`)
    }
  }

  _validateBuild () {
    for (let i = 0; i < this.steps.length; i += 1) {
      const step = this.steps[i]

      if (!step.component) {
        throw new Error('Error: build() -> No default component set and step missing custom component.')
      }

      if (step.options.length === 0) {
        throw new Error('Error: build() -> Steps must have at least one option/link.')
      }

      for (let o = 0; o < step.options.length; o += 1) {
        const option = step.options[o]

        if (option.step && !this.steps.find(node => node.id === option.step)) {
          throw new Error(`Error: build() -> withOption() -> ID '${option.id}' doesn't exist.`)
        }
      }
    }
  }

  createSteps () {
    this.steps = []

    return this
  }

  setLang (lang) {
    this.lang = lang

    return this
  }

  setDefaultComponent (component) {
    this.defaultComponent = component

    return this
  }

  addStep (id, params, component) {
    this._validateStep(id)

    const step = new WizardNode({
      id,
      ...params,
      component: component || this.defaultComponent,
      lang: this.lang
    })

    this._currentNode = step
    this.steps.push(step)

    return this
  }

  withOption (text, step) {
    this._currentNode.options.push({
      text,
      step
    })

    return this
  }

  withLink (text, url) {
    this._currentNode.options.push({
      text,
      url
    })

    return this
  }

  build (initialStep) {
    this._validateBuild()

    return (
      <WizardUI
        steps={this.steps}
        initialStep={initialStep}
        lang={this.lang}
      />
    )
  }
}

export default Wizard
