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
    const snapshot = renderer.create(<Message message={message} loader={{active: false}} errors={[]}/>).toJSON();
    expect(snapshot).toMatchSnapshot();
  });
  // Successful Message
  it('should render successful message when message is truthy and loader both active and error are false', () => {
    const { container } = render(<Message message={message} loader={{active: false, error: false}} errors={[]}/>);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    const header = container.querySelector('[data-testid="modal-header"]');
    const footer = container.querySelector('[data-testid="modal-footer"]');
    expect(getNodeText(messageWrapper.firstChild)).toMatch(message);
    expect(emptyDivWraper).not.toBeInTheDocument();
    expect(getNodeText(header.children[1])).toMatch('Success');
    expect(getNodeText(footer.firstChild)).toMatch('Everything went smoothly!');
  });
  // Failure message without errors from validator
  it('should render failure message when message is truthy and loader.active is false but loader.error is true', () => {
    const { container } = render(<Message message={message} loader={{active: false, error: true}} errors={[]} />);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    const header = container.querySelector('[data-testid="modal-header"]');
    const footer = container.querySelector('[data-testid="modal-footer"]');
    const errors = container.querySelector('[data-testid="errors"');
    expect(getNodeText(messageWrapper.firstChild)).toMatch(message);
    expect(emptyDivWraper).not.toBeInTheDocument();
    expect(getNodeText(header.children[1])).toMatch('Failure');
    expect(getNodeText(footer.firstChild)).toMatch('Something went wrong!');
    expect(errors).not.toBeInTheDocument();
  });
  // Failure message with errors from validator
  it('should render failure message when message is truthy and loader.active is false but loader.error is true', () => {
    const { container } = render(<Message message={message} loader={{active: false, error: true}} errors={[{msg: 'error one'}, {msg: 'error two'}]} />);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    const header = container.querySelector('[data-testid="modal-header"]');
    const footer = container.querySelector('[data-testid="modal-footer"]');
    const errors = container.querySelector('[data-testid="errors"');
    expect(getNodeText(messageWrapper.firstChild)).toMatch(message);
    expect(emptyDivWraper).not.toBeInTheDocument();
    expect(getNodeText(header.children[1])).toMatch('Failure');
    expect(getNodeText(footer.firstChild)).toMatch('Something went wrong!');
    expect(errors).toBeInTheDocument();
    expect(getNodeText(errors.firstChild)).toMatch('error one');
    expect(getNodeText(errors.children[1])).toMatch('error two');
  });
  // There is no request yet
  it('should render empty div when message is falsy', () => {
    const { container } = render(<Message message='' loader={{active: false}} errors={[]}/>);
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
    const { container } = render(<Message message={message} loader={{active: true}} errors={[]}u/>);
    const messageWrapper = container.querySelector('[data-testid="message"]');
    const loaderWrapper = container.querySelector('[data-testid="loader"]');
    const emptyDivWraper = container.querySelector('[data-testid="emptyDiv"]');
    expect(loaderWrapper).toBeInTheDocument();
    expect(messageWrapper).not.toBeInTheDocument();
    expect(emptyDivWraper).not.toBeInTheDocument();
  });
})