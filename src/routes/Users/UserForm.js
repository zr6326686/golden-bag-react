import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import {Button, Cascader, DatePicker, Form, Input, InputNumber, message, Radio, Select, Spin} from 'antd';
import UserFromStyles from './UserForm.css';
import {connect} from 'dva';
import moment from 'moment';
import PropTypes from 'prop-types';

@connect(({users, departments, loading}) => ({
  searchUsers: users.searchUsers,
  loading: loading.models.users,
  departmentList: departments.list,
}))
@Form.create()
export default class UserForm extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'departments/fetch',
    });
  }

  handleSearchUser(keyword, ignoreId = '') {
    this.props.dispatch({
      type: 'users/searchUsers',
      params: {keyword, ignoreId}
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.match && this.props.match.params.id) {
          const hide = message.loading('更新中..', 0);
          // 更新
          this.props.dispatch({
            type: 'users/updateUser',
            user: values,
            id: this.props.match.params.id,
          }).then(() => {
            hide();
          });
        } else {
          const hide = message.loading('创建中..', 0);
          // 创建
          this.props.dispatch({
            type: 'users/addUser',
            user: values,
          }).then(() => {
            hide();
          });
        }
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
    const title = currentUser.id ? '更新' : '添加';
    return (
      <div>
        <PageHeader isBack title={`${title}用户`}/>
        <Form className={UserFromStyles.user_form} onSubmit={this.handleSubmit.bind(this)}>

          <Spin spinning={this.props.loading}>
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
            <Form.Item
              {...formItemLayout}
              label="性别"
            >
              {getFieldDecorator('gender', {
                initialValue: currentUser.gender,
              })(
                <Radio.Group>
                  <Radio value="Man">男</Radio>
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
                  required: true, message: '请输入职级系数',
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
          </Spin>
          <Form.Item {...tailFormItemLayout}>
            <Button htmlType="submit" loading={this.props.loading} type="primary" size="large">{title}</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

UserForm.propTypes = {
  currentUser: PropTypes.object,
};
