import React from 'react';
import {Button, Cascader, Form, Input, message, Spin} from 'antd';
import PropTypes from 'prop-types';
import DepartmentFormStyles from './DepartmentForm.css';
import {connect} from 'dva';

@connect(({departments, loading}) => ({
  loading: loading.models.departments,
  departmentList: departments.list,
}))
@Form.create()
export default class DepartmentForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        if (this.props.currentDepartment && this.props.currentDepartment.id) {
          // 更新
          const hide = message.loading('更新中..', 0);
          this.props.dispatch({
            type: 'departments/updateDepartment',
            department: values,
            id: this.props.currentDepartment.id,
          }).then(() => {
            hide();
          });
        } else {
          // 创建
          const hide = message.loading('创建中..', 0);
          this.props.dispatch({
            type: 'departments/addDepartment',
            department: values,
          }).then(() => {
            hide();
          });
        }
      }
    });
  }

  render() {
    const formItemLayout = {
      labelCol: {span: 4},
      wrapperCol: {span: 18},
    };
    const tailFormItemLayout = {
      wrapperCol: {span: 18, offset: 4},
    };
    const {getFieldDecorator} = this.props.form;
    const currentDepartment = this.props.currentDepartment || {};
    const title = currentDepartment.id ? '更新' : '添加';
    return (
      <Form className={DepartmentFormStyles.department_form} onSubmit={this.handleSubmit.bind(this)}>
        <Form.Item
          {...formItemLayout}
          label="部门名称"
        >
          {getFieldDecorator('name', {
            rules: [{
              required: true, message: '请输入部门名称',
            }],
            initialValue: currentDepartment.name,
          })(
            <Input placeholder="请输入部门名称"/>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="父级部门"
        >
          {getFieldDecorator('parentIds', {
            initialValue: currentDepartment.parentIds,
          })(
            <Cascader
              fieldNames={{
                label: 'name',
                value: 'id',
              }}
              changeOnSelect
              options={this.props.departmentList}
              notFoundContent={this.props.loading ? <Spin size="small"/> : null}
              placeholder="请选择父级部门 (不填为根部门)"/>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} >
          <Button htmlType="submit" loading={this.props.loading} type="primary" size="large">{title}</Button>
          {currentDepartment.id && <Button onClick={() => {
            this.props.delDepartment(currentDepartment.id)
          }} loading={this.props.loading} className={DepartmentFormStyles.del_btn} type="danger"
                                           size="large">删除该部门</Button>}
        </Form.Item>
      </Form>
    );
  }
}


DepartmentForm.propTypes = {
  currentDepartment: PropTypes.object,
  delDepartment: PropTypes.func,
};
