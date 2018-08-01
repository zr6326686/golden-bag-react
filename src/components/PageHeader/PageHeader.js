import React from 'react';
import PageHeaderStyles from './PageHeader.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button, Icon} from 'antd';

export default class PageHeader extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onAdd: PropTypes.func,
    isBack: PropTypes.bool,
    noBtn: PropTypes.bool,
  };

  render() {
    return (
      <header className={PageHeaderStyles.page_header}>
        <h1>{this.props.title}</h1>
        {this.props.isBack ?
          <Link to={{
            pathname: '/users',
          }}><Button className={PageHeaderStyles.button} type="primary" size="large" ghost>
            <Icon type="left"/>返回
          </Button>
          </Link> : !this.props.noBtn &&
          <Button onClick={this.props.onAdd} className={PageHeaderStyles.button} type="primary" icon="plus"
                  size="large">新建</Button>
        }
      </header>
    );
  }
}




