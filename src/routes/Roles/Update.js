import React from 'react';
import RoleForm from './RoleForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import {message} from 'antd';
import {connect} from 'dva';

@connect(({roles}) => ({
  currentRole: roles.current,
}))
export default class Add extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'roles/fetchCurrent',
      id: this.props.match.params.id,
    });
  }

  onSubmit(values) {
    const hide = message.loading('更新角色中...', 0);
    values.permissions = values.permissions
      .reduce((prev, current) => [...prev, ...current])
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
        <RoleForm
          currentRole={this.props.currentRole.data}
          currentPermissions={this.props.currentRole.meta && this.props.currentRole.meta.permissions}
          onSubmit={this.onSubmit.bind(this)}
          title="编辑"
          l/>
      </div>
    );
  }
}
