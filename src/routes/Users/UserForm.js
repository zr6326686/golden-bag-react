import React from 'react';
import {Button, Cascader, DatePicker, Form, Input, InputNumber, Radio, Select, Spin} from 'antd';
import UserFromStyles from './UserForm.css';
import {connect} from 'dva';
import moment from 'moment';
import PropTypes from 'prop-types';

@connect(({users, departments, loading, roles, templates}) => ({
  searchUsers: users.searchUsers,
  loading: loading.models.users,
  departmentList: departments.list,
  roleList: roles.list.content,
  templates: templates.templateTypes,
}))
@Form.create()
export default class UserForm extends React.PureComponent {

  static propTypes = {
    currentUser: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.string,
  };
  static defaultProps = {
    userId: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'departments/fetch',
    });
    this.props.dispatch({
      type: 'roles/fetch',
    });
    this.props.dispatch({
      type: 'templates/fetchTemplateTypes',
    });
  }

  handleSearchUser(keyword) {
    this.props.dispatch({
      type: 'users/searchUsers',
      params: {keyword, ignoreId: this.props.userId}
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const user = {
          ...values,
          roles: values.roles.map(id => ({id})),
          directManager: {id: values.directManager},
          indirectManager: {id: values.indirectManager}
        };
        this.props.onSubmit(user);
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const tailFormItemLayout = {
      wrapperCol: {span: 14, offset: 6},
    };
    const {getFieldDecorator} = this.props.form;

    const searchOptions = this.props.searchUsers.map(item => {
      return (<Select.Option value={item.id} key={item.id}>{item.name}({item.phone})</Select.Option>)
    });

    const currentUser = this.props.currentUser || {};

    if (currentUser.roles) {
      currentUser.roleids = currentUser.roles.map(item => item.id);
    }

    return (
      <Form className={UserFromStyles.user_form} onSubmit={this.handleSubmit.bind(this)}>

        <Form.Item
          {...formItemLayout}
          label="姓名"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入姓名',
            }],
            initialValue: currentUser.name,
          })(
            <Input placeholder="请输入姓名"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('phone', {
            rules: [{
              required: true, message: '请输入手机号',
            }],
            initialValue: currentUser.phone,
          })(
            <Input placeholder="请输入手机号"/>
          )}
        </Form.Item>
        {!currentUser.id && <Form.Item
          {...formItemLayout}
          label="密码"
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请设置密码',
            }],
          })(
            <Input type="password" placeholder="请设置密码"/>
          )}
        </Form.Item>}
        <Form.Item
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('gender', {
            rules: [{
              required: true, message: '请选择性别',
            }],
            initialValue: currentUser.gender,
          })(
            <Radio.Group>
              <Radio value="MAN">男</Radio>
              <Radio value="WOMAN">女</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="职级系数"
        >
          {getFieldDecorator('rankCoefficient', {
            rules: [{
              required: true, message: '请输入职级系数',
            }],
            initialValue: currentUser.rankCoefficient,
          })(
            <InputNumber min={0} step={0.1} placeholder="职级系数"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="入职时间"
        >
          {getFieldDecorator('entryDate', {
            rules: [{
              required: true, message: '请输入入职时间',
            }],
            initialValue: currentUser.entryDate ? moment(currentUser.entryDate, 'YYYY-MM-DD') : null,
          })(
            <DatePicker placeholder="请选择入职时间"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="所属部门"
        >
          {getFieldDecorator('departmentIds', {
            rules: [{
              required: true, message: '请选择所属部门',
            }],
            initialValue: currentUser.departmentIds,
          })(
            <Cascader
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
              changeOnSelect
              options={this.props.departmentList}
              notFoundContent={this.props.loading ? <Spin size="small"/> : null}
              placeholder="请选择所属部门"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="直接经理"
        >
          {getFieldDecorator('directManager', {
            rules: [{
              required: true, message: '请选择直接经理',
            }],
            initialValue: currentUser.directManager && currentUser.directManager.id,
          })(
            <Select
              showSearch
              placeholder="请选择直接经理"
              filterOption={false}
              notFoundContent={this.props.loading ? <Spin size="small"/> : null}
              onSearch={this.handleSearchUser.bind(this)}>
              {searchOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="间接经理"
        >
          {getFieldDecorator('indirectManager', {
            initialValue: currentUser.indirectManager && currentUser.indirectManager.id,
          })(
            <Select
              showSearch
              placeholder="请选择间接经理"
              filterOption={false}
              notFoundContent={this.props.loading ? <Spin size="small"/> : null}
              onSearch={this.handleSearchUser.bind(this)}>
              {searchOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="角色"
        >
          {getFieldDecorator('roles', {
            initialValue: currentUser.roleids,
          })(
            <Select
              mode="multiple"
              placeholder="请选择角色"
            >
              {this.props.roleList.map((item, index) => {
                return <Select.Option value={item.id} key={index}>{item.name}</Select.Option>;
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="模版"
        >
          {getFieldDecorator('type', {
            initialValue: currentUser.type && currentUser.type.id,
          })(
            <Select placeholder="请选择模版">
              {this.props.templates.map((item, index) => {
                return <Select.Option key={index}>{item.name}</Select.Option>;
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button htmlType="submit" loading={this.props.loading} type="primary" size="large">{this.props.title}</Button>
        </Form.Item>
      </Form>

    );
  }
}

