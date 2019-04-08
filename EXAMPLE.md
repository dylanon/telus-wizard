Example showing how to use @telus/telus-wizard.

```javascript
import React, { PureComponent } from 'react'
import Wizard from '@telus/telus-wizard'
import StandardComponent from './components/Standard'
import UsageComponent from './components/Usage'

const STEP_IDS = {
  START: 'start',
  USAGE: 'usage',
}

class WizardExample extends PureComponent {
  constructor() {
    super()

    this.steps = null
  }

  componentDidMount() {
    this.steps = this.buildSteps()
  }

  buildSteps = () => {
    const steps = new Wizard()
      .setLang('fr')
      .setDefaultComponent(StandardComponent)
      .createSteps()
      .addStep(
        STEP_IDS.START,
        {
          title: 'Start your journey',
          copy: 'Cupcake ipsum dolor sit amet muffin wafer pie sweet. Jujubes I love bear claw soufflé.',
          backButton: false,
        }
      )
        .withOption('I want to see my usage', STEP_IDS.USAGE)
        .withLink('Go back home', '//telus.com')
      .addStep(
        STEP_IDS.USAGE,
        {
          step: 2,
          totalSteps: 3,
          title: 'Lets look at your usage',
          copy: 'Tart jelly-o gingerbread brownie soufflé. Apple pie oat cake cake.',
          backButton: true
        },
        UsageComponent
      )
        .withLink('I\'m satisfied', '//telus.com')
        .withLink('Help', '//telus.com/support')
      .build(STEP_IDS.START)

    return steps
  }

  render() {
    return (
      <section className="step-wizard">
        {this.steps}
      </section>
    )
  }
}

export default WizardExample

```
