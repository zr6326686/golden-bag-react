import React from 'react';
import UserForm from './UserForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import {message} from 'antd';
import {connect} from 'dva';

@connect()
export default class Edit extends React.PureComponent {
  onSubmit(values) {
    const hide = message.loading('创建中..', 0);
    // 创建
    this.props.dispatch({
      type: 'users/addUser',
      user: values,
    }).then(() => {
      hide();
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="添加用户" isBack onClick={() => {
          this.props.history.push('/users');
        }}/>
        <UserForm title="添加" onSubmit={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}

