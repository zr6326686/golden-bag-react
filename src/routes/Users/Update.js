import React from 'react';
import UserForm from './UserForm';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import {message} from 'antd';

@connect(({users, loading}) => ({
  currentUser: users.current,
  loading: loading.models.user,
}))
export default class Update extends React.PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'users/fetchCurrent',
      params: {
        id: this.props.match.params.id
      }
    });
  }

  onSubmit(values) {
    const hide = message.loading('更新中..', 0);
    // 更新
    this.props.dispatch({
      type: 'users/updateUser',
      user: values,
      id: this.props.match.params.id,
    }).then(() => {
      hide();
      this.props.history.push('/users');
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="更新用户" isBack onClick={() => {
          this.props.history.push('/users');
        }}/>
        <UserForm userId={this.props.match.params.id} title="更新" onSubmit={this.onSubmit.bind(this)}
                  currentUser={this.props.currentUser}/>
      </div>
    );
  }
}

