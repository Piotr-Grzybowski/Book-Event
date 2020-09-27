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
  // Successful Message
  it('should render successful message when message is truthy and loader both active and error are false', () => {
    const { container } = render(<Message message={message} loader={{active: false, error: false}} />);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    const header = container.querySelector('[data-testid="modal-header"]');
    const footer = container.querySelector('[data-testid="modal-footer"]');
    expect(getNodeText(messageWrapper.firstChild)).toMatch(message);
    expect(emptyDivWraper).not.toBeInTheDocument();
    expect(getNodeText(header.children[1])).toMatch('Success');
    expect(getNodeText(footer.firstChild)).toMatch('Everything went smoothly!');
  });
  // Failure Message
  it('should render failure message when message is truthy and loader.active is false but loader.error is true', () => {
    const { container } = render(<Message message={message} loader={{active: false, error: true}} />);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    const header = container.querySelector('[data-testid="modal-header"]');
    const footer = container.querySelector('[data-testid="modal-footer"]');
    expect(getNodeText(messageWrapper.firstChild)).toMatch(message);
    expect(emptyDivWraper).not.toBeInTheDocument();
    expect(getNodeText(header.children[1])).toMatch('Failure');
    expect(getNodeText(footer.firstChild)).toMatch('Something went wrong!');
  });
  // There is no request yet
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
  // Loader is spinning
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