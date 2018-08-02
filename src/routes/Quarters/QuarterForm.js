import React from 'react';
import {Button, DatePicker, Form, Input, InputNumber} from 'antd';
import QuarterForm from './QuarterForm.css';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import moment from 'moment';

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
    currentQuarter: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'quarters/fetch',
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
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };
    const tailFormItemLayout = {
      wrapperCol: {span: 14, offset: 6},
    };
    const {getFieldDecorator} = this.props.form;


    return (
      <Form className={QuarterForm.form} onSubmit={this.handleSubmit.bind(this)}>

        <Form.Item
          {...formItemLayout}
          label="季度名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入季度名称',
            }],
            initialValue: this.props.currentQuarter.name,
          })(
            <Input placeholder="请输入季度名称"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="单价"
        >
          {getFieldDecorator('price', {
            rules: [{
              required: true, message: '请输入单价',
            }],
            initialValue: this.props.currentQuarter.price,
          })(
            <InputNumber min={0} step={0.1} placeholder="单价"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="季度开始时间"
        >
          {getFieldDecorator('entryDate', {
            initialValue: this.props.currentQuarter.startDate ? moment(this.props.currentQuarter.startDate, 'YYYY-MM-DD') : null,
          })(
            <DatePicker disabled placeholder="季度开始时间"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="开始考核日期"
        >
          {getFieldDecorator('entryDate', {
            rules: [{
              required: true, message: '请设置开始考核日期',
            }],
            initialValue: this.props.currentQuarter.startAssessmentDate ? moment(this.props.currentQuarter.startAssessmentDate, 'YYYY-MM-DD') : null,
          })(
            <DatePicker placeholder="请设置开始考核日期"/>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button htmlType="submit" loading={this.props.loading} type="primary" size="large">{this.props.title}</Button>
        </Form.Item>
      </Form>

    );
  }
}

