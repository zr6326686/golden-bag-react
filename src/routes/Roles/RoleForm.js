import React from 'react';
import {Button, Checkbox, Divider, Form, Input} from 'antd';
import RoleFormStyles from './RoleForm.css';
import PropTypes from 'prop-types';
import {connect} from 'dva';

@connect(({roles, loading}) => ({
  permissions: roles.permissions,
  loading: loading.models.roles,
}))
@Form.create()
export default class RoleForm extends React.Component {

  static propTypes = {
    currentRole: PropTypes.object,
    currentPermissions: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };
  static defaultProps = {
    currentPermissions: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'roles/fetchPermissions',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  }

  render() {

    const {getFieldDecorator} = this.props.form;

    const currentRole = this.props.currentRole || {};

    const permissions = Object.keys(this.props.permissions).map(key => {
      return (
        <Form.Item
          label={key}
          key={key}
        >
          {Object.keys(this.props.permissions[key]).map((itemKey, index) => {
            const options = this.props.permissions[key][itemKey].map(child => {
              return {
                value: child.id,
                label: child.displayName,
              };
            });
            return (
              <div className={RoleFormStyles.permission_item} key={itemKey}>
                <h3 className={RoleFormStyles.permission_item_title}>
                  {itemKey}
                </h3>
                <Divider className={RoleFormStyles.divider}/>
                <Form.Item>
                  {getFieldDecorator('permissions', {
                    initialValue: this.props.currentPermissions,
                  })(
                    <Checkbox.Group options={options}/>
                  )}
                </Form.Item>
              </div>
            );
          })}
        </Form.Item>
      )
    });

    return (
      <Form className={RoleFormStyles.role_form} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item
          label="角色名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入角色名称',
            }],
            initialValue: currentRole.name,
          })(
            <Input placeholder="请输入角色名称"/>
          )}
        </Form.Item>
        <Form.Item
          label="角色描述"
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: '请输入角色描述',
            }],
            initialValue: currentRole.description,
          })(
            <Input placeholder="请输入角色描述"/>
          )}
        </Form.Item>
        <h2 className={RoleFormStyles.permission_title}>选择权限: </h2>
        {permissions}
        <Form.Item>
          <Button htmlType="submit" loading={this.props.loading} type="primary" size="large">{this.props.title}</Button>
        </Form.Item>
      </Form>

    );
  }
}

