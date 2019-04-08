import React from 'react'

class WizardNode {
  constructor (opts = {}) {
    const {
      id,
      component,
      options,
      lang,
      ...customProps
    } = opts

    this.id = id
    this.component = component
    this.options = options || []
    this.lang = lang
    this.customProps = customProps
  }

  buildComponent (goToNextStep = null, goToPrevStep = null) {
    const Component = this.component

    return (
      <Component
        {...this.customProps}
        lang={this.lang}
        options={this.options}
        goToNextStep={goToNextStep}
        goToPrevStep={goToPrevStep}
      />
    )
  }
}

export default WizardNode
