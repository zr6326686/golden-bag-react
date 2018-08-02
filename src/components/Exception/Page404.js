import React from 'react';
import ExceptionStyles from './Exception.css';
import {Button} from 'antd';

export default class Page404 extends React.PureComponent {
  render() {
    return (
      <main className={ExceptionStyles.main}>
        <h1>(*+﹏+*)~ 404</h1>
        <p>抱歉，你访问的页面可能不存在</p>
        <Button type="primary" size="large">返回首页</Button>
      </main>
    );
  }
}
