import React from 'react';
import ExceptionStyles from './Exception.css';
import {Button} from 'antd';

export default class PageError extends React.PureComponent {
  render() {
    return (
      <main className={ExceptionStyles.main}>
        <h1>(*+﹏+*)~ </h1>
        <p>抱歉，出了个小错.</p>
        <Button onClick={() => {
          this.props.history.push('/');
        }} type="primary" size="large">返回首页</Button>
      </main>
    );
  }
}
