import React from 'react';
import {Button, Drawer, Form, Input, InputNumber, message, Select} from 'antd';
import UpdateTemplateStyles from './UpdateTemplate.css';
import {connect} from 'dva';
import PropTypes from 'prop-types';

@Form.create()
@connect(({templates, loading}) => ({
  loading: loading.models.templates,
  template: templates.current,
}))
export default class AddProjectItemDrawer extends React.PureComponent {
  static propTypes = {
    onClose: PropTypes.func,
    show: PropTypes.bool.isRequired,
  };
  static defaultPropTypes = {
    onClose: () => {
    },
  };


  addProject(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const hide = message.loading('创建中..', 0);
        this.props.dispatch({
          type: 'templates/addTemplateChild',
          id: values.parentId,
          templateChildType: 'project_item',
          params: values,
        }).then(() => {
          this.props.onClose();
          hide();
        });
      }
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <Drawer
        title="添加评分参考标准"
        width={400}
        placement="right"
        visible={this.props.show}
      >
        <Form className={UpdateTemplateStyles.form} onSubmit={this.addProject.bind(this)}>
          <Form.Item
            label="评分参考标准"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入评分参考标准',
              }],
            })(
              <Input placeholder="请输入评分参考标准"/>
            )}
          </Form.Item>

          <Form.Item
            label="评分参考标准分值"
          >
            {getFieldDecorator('score', {
              rules: [{
                required: true, message: '请输入评分参考标准分值',
              }],
            })(
              <InputNumber placeholder="分值"/>
            )}
          </Form.Item>

          <Form.Item
            label="父级考核项目"
          >
            {getFieldDecorator('parentId', {
              rules: [{
                required: true, message: '请选择父级考核项目',
              }],
            })(
              <Select placeholder="请选择父级考核项目">
                {
                  this.props.template.assessmentProjects.map(project => {
                    return (<Select.Option key={project.id} value={project.id}>{project.title}</Select.Option>);
                  })
                }
              </Select>
            )}
          </Form.Item>

          <div className={UpdateTemplateStyles.buttom_btn}>
            <Button
              onClick={this.props.onClose}
              style={{
                marginRight: 8,
              }}
            >
              取消
            </Button>
            <Button loading={this.props.loading} htmlType="submit" type="primary">提交</Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
