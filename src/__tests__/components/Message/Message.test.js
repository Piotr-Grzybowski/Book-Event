import { cleanup, getNodeText } from '@testing-library/react';
import React from 'react';
import Message from '../../../components/Message/Message';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import register from 'ignore-styles';
register(['.css', '.sass', '.scss']);


describe('Message component', () => {
  const message = 'some example message';

  afterEach(cleanup);

  it('should match snapshot', () => {
    const snapshot = renderer.create(<Message message={message} loader={{active: false}} />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  it('should render message when message is truthy and loader.active is false', () => {
    const { container } = render(<Message message={message} loader={{active: false}} />);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    expect(getNodeText(messageWrapper.firstChild)).toMatch(message);
    expect(emptyDivWraper).not.toBeInTheDocument();
  });
  it('should render empty div when message is falsy', () => {
    const { container } = render(<Message message='' loader={{active: false}} />);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const loaderWrapper = container.querySelector('[data-testid="loader"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    expect(messageWrapper).not.toBeInTheDocument();
    expect(loaderWrapper).not.toBeInTheDocument();
    expect(emptyDivWraper).toBeInTheDocument();
    expect(emptyDivWraper.firstChild).not.toBeInTheDocument();
  })
  it('should render loader when message is truthy and loader.active is true', () => {
    const { container } = render(<Message message={message} loader={{active: true}} />);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const loaderWrapper = container.querySelector('[data-testid="loader"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    expect(loaderWrapper).toBeInTheDocument();
    expect(messageWrapper).not.toBeInTheDocument();
    expect(emptyDivWraper).not.toBeInTheDocument();
  });
})