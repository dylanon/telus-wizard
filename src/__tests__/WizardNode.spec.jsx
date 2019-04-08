import { cleanup } from 'react-testing-library'
import WizardNode from '../WizardNode'

afterEach(cleanup)

it('WizardNode -> should return a component with props', () => {
  const params = {
    id: 'test',
    component: () => {},
    lang: 'fr',
    title: 'Im a custom title',
    copy: 'Im custom copy'
  }
  const node = new WizardNode(params).buildComponent()

  expect(node.props).toEqual({
    title: params.title,
    copy: params.copy,
    lang: params.lang,
    options: [],
    goToNextStep: null,
    goToPrevStep: null
  })
})
