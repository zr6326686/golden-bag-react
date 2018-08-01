import React from 'react';
import {Button, Col, Drawer, Form, Icon, Input, InputNumber, message, Row} from 'antd';
import UpdateTemplateStyles from './UpdateTemplate.css';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import clone from 'clone';

@Form.create()
@connect(({loading}) => ({
  loading: loading.models.templates,
}))
export default class AddProjectDrawer extends React.PureComponent {
  static propTypes = {
    templateId: PropTypes.number.isRequired,
    onClose: PropTypes.func,
    show: PropTypes.bool.isRequired,
  };
  static defaultPropTypes = {
    onClose: () => {
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      projectItemFields: [0, 1]
    };
  }

  addProject(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const hide = message.loading('创建中..', 0);
        this.props.dispatch({
          type: 'templates/addTemplateChild',
          id: this.props.templateId,
          templateChildType: 'project',
          params: values,
        }).then(() => {
          hide();
        });
      }
    });
  }

  addField() {
    let projectItemFields = clone(this.state.projectItemFields);
    projectItemFields = [
      ...projectItemFields,
      projectItemFields[projectItemFields.length - 1] + 1,
    ];
    this.setState({projectItemFields});
  }

  removeField(key) {
    const index = this.state.projectItemFields.findIndex(item => key === item);
    if (index >= 0) {
      this.state.projectItemFields.splice(index, 1);
    }
    this.forceUpdate();
  }

  render() {
    const {getFieldDecorator} = this.props.form;

    const projectItemFields = this.state.projectItemFields.map(item => {
      return (
        <Row key={item}>
          <Col span={10}>
            <Form.Item label="考核标准">
              {getFieldDecorator(`items[${item}].title`, {
                rules: [{
                  required: true, message: '请输入考核项目名称',
                }],
              })(
                <Input placeholder="请输入考核项目名称"/>
              )}
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item label="分值">
              {getFieldDecorator(`items[${item}].score`, {
                rules: [{
                  required: true, message: '请输入分值',
                }],
              })(
                <InputNumber placeholder="分值"/>
              )}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Button onClick={() => {
              this.removeField(item)
            }} className={UpdateTemplateStyles.remove_btn}
                    type="dashed">移除</Button>
          </Col>
        </Row>
      );
    });

    return (
      <Drawer
        title="添加考核项目"
        width={500}
        placement="right"
        visible={this.props.show}
      >
        <Form className={UpdateTemplateStyles.form} onSubmit={this.addProject.bind(this)}>
          <Form.Item
            label="考核项目名称"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入考核项目名称',
              }],
            })(
              <Input placeholder="请输入考核项目名称"/>
            )}
          </Form.Item>
          {projectItemFields}
          <Button type="dashed" className={UpdateTemplateStyles.add_project_item_btn}
                  onClick={this.addField.bind(this)}>
            <Icon type="plus"/> 添加考核项目标准
          </Button>
          <div className={UpdateTemplateStyles.buttom_btn}>
            <Button
              onClick={this.props.onClose}
              style={{
                marginRight: 8,
              }}
            >
              取消
            </Button>
            <Button htmlType="submit" loading={this.props.loading} type="primary">提交</Button>
          </div>
        </Form>
      </Drawer>
    );
  }
}
