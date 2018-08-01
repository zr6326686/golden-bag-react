import React from 'react';
import PageHeaderStyles from './PageHeader.css';
import PropTypes from 'prop-types';
import {Button, Icon} from 'antd';

export default class PageHeader extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isBack: PropTypes.bool,
  };

  render() {
    return (
      <header className={PageHeaderStyles.page_header}>
        <h1>{this.props.title}</h1>
        {this.props.isBack ?
          <Button onClick={this.props.onClick} className={PageHeaderStyles.button} type="primary" size="large" ghost>
            <Icon type="left"/>返回
          </Button>
          : this.props.onClick &&
          <Button onClick={this.props.onClick} className={PageHeaderStyles.button} type="primary" icon="plus"
                  size="large">新建</Button>
        }
      </header>
    );
  }
}




