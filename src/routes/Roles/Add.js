import React from 'react';
import RoleForm from './RoleForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import {message} from 'antd';
import {connect} from 'dva';

@connect()
export default class Add extends React.PureComponent {

  onSubmit(values) {
    const hide = message.loading('创建角色中...', 0);
    values.permissions = values.permissions
      .map(item => ({id: item}));
    this.props.dispatch({
      type: 'roles/addRole',
      role: values,
    }).then(() => {
      hide();
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="添加角色" isBack onClick={() => {
          this.props.history.push('/roles');
        }}/>
        <RoleForm onSubmit={this.onSubmit.bind(this)} title="添加"/>
      </div>
    );
  }
}
