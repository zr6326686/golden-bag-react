import React from 'react';
import {Button, Drawer, Form, Input, message} from 'antd';
import UpdateTemplateStyles from './UpdateTemplate.css';
import {connect} from 'dva';
import PropTypes from 'prop-types';

@Form.create()
@connect(({templates, loading}) => ({
  loading: loading.models.templates,
  template: templates.current,
}))
export default class AddInputDrawer extends React.PureComponent {
  static propTypes = {
    templateId: PropTypes.number.isRequired,
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
          id: this.props.templateId,
          templateChildType: 'template_input',
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
        title="添加总结"
        width={400}
        placement="right"
        visible={this.props.show}
      >
        <Form className={UpdateTemplateStyles.form} onSubmit={this.addProject.bind(this)}>
          <Form.Item
            label="总结标题"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入总结标题',
              }],
            })(
              <Input placeholder="请输入总结标题"/>
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
