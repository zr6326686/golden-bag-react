import React from 'react';
import AccountStyles from './Account.css';
import PropTypes from 'prop-types';
import {Avatar, Dropdown, Menu} from 'antd';

export default class Account extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object,
  };

  static defaultProp = {
    user: {}
  };

  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a href="/auth/logout">退出登录</a>
        </Menu.Item>
      </Menu>

    );

    return (
      <Dropdown overlay={menu}>
        <div className={AccountStyles.wrapper}>
          <Avatar size="large">{this.props.user.name}</Avatar>
          <div className={AccountStyles.info}>
            <span>{this.props.user.name}</span>
            <p>{this.props.user.roles && this.props.user.roles.length && this.props.user.roles[0].name}</p>
          </div>
        </div>
      </Dropdown>
    )
      ;
  }
}
