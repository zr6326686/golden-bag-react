import React from 'react';
import UserForm from './UserForm';
import {connect} from 'dva';

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

  render() {
    return (
      <div><UserForm currentUser={this.props.currentUser}/></div>
    );
  }
}

