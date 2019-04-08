import React from 'react'
import { cleanup } from 'react-testing-library'
import Wizard from '../index'
import WizardUI from '../WizardUI'
import WizardNode from '../WizardNode'

afterEach(cleanup)

it('WizardBuilder -> should initialize steps', () => {
  const wizard = new Wizard().createSteps()

  expect(wizard.steps).toEqual([])
})

it('WizardBuilder -> should set language and pass to steps', () => {
  const lang = 'fr'
  const wizard = new Wizard()
    .setLang(lang)
    .createSteps()
    .addStep('test')

  expect(wizard.steps[0].lang).toEqual(lang)
})

it('WizardBuilder -> should store default component', () => {
  const defaultComponent = 'Im a default component'
  const wizard = new Wizard()
    .setDefaultComponent(defaultComponent)
    .createSteps()
    .addStep('test')

  expect(wizard.steps[0].component).toEqual(defaultComponent)
})

it('WizardBuilder -> should update internal variables when steps are added', () => {
  const step1Id = 'test'
  const wizard = new Wizard()
    .createSteps()
    .addStep(step1Id)

  expect(wizard.steps.length).toEqual(1)
  expect(wizard._currentNode).toEqual(new WizardNode({ id: step1Id, component: null, lang: 'en' }))

  const step2Id = 'test 2'
  wizard.addStep(step2Id)

  expect(wizard.steps.length).toEqual(2)
  expect(wizard._currentNode).toEqual(new WizardNode({ id: step2Id, component: null, lang: 'en' }))
})

it('WizardBuilder -> should fail validation when adding a bad step', () => {
  expect(() => {
    new Wizard()
      .createSteps()
      .addStep()
  }).toThrow()

  expect(() => {
    new Wizard()
      .createSteps()
      .addStep('test')
      .addStep('test')
  }).toThrow()
})

it('WizardBuilder -> should fail validation on build when things are wrong', () => {
  expect(() => {
    new Wizard()
      .createSteps()
      .addStep('test')
      .withOption('option', 'test')
      .build()
  }).toThrow()

  expect(() => {
    new Wizard()
      .createSteps()
      .setDefaultComponent(() => {})
      .addStep('test')
      .build()
  }).toThrow()

  expect(() => {
    new Wizard()
      .createSteps()
      .setDefaultComponent(() => {})
      .addStep('test')
      .withOption('test', 'bad-id')
      .build()
  }).toThrow()
})

it('WizardBuilder -> should add options', () => {
  const wizard = new Wizard()
    .createSteps()
    .addStep('test')
    .withOption('option 1', 'test')
    .withLink('option 2', 'url')

  expect(wizard._currentNode.options).toEqual([
    { step: 'test', text: 'option 1' },
    { url: 'url', text: 'option 2' }
  ])
  expect(wizard.steps[0].options).toEqual([
    { step: 'test', text: 'option 1' },
    { url: 'url', text: 'option 2' }
  ])
})

it('WizardBuilder -> should return a UI component with props on build', () => {
  const defaultComponent = 'Im a default component'
  const id = 'test'
  const link = ['option', 'test']

  const wizard = new Wizard()
    .createSteps()
    .setDefaultComponent(defaultComponent)
    .addStep(id)
    .withLink(link[0], link[1])
    .build('test')

  const builtStep = new WizardNode({
    id,
    component: defaultComponent,
    options: [{ text: link[0], url: link[1] }],
    lang: 'en'
  })

  expect(wizard).toEqual(<WizardUI
    initialStep="test"
    lang="en"
    steps={[builtStep]}
  />)
})
