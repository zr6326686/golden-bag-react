import React from 'react';
import TemplateTable from './TemplateTable';
import PageHeader from '../../components/PageHeader/PageHeader';
import {connect} from 'dva';
import {Button, Form, message} from 'antd';
import UpdateTemplateStyles from './UpdateTemplate.css';
import AddProjectDrawer from './AddProjectDrawer';
import AddProjectItemDrawer from './AddProjectItemDrawer';
import AddInputDrawer from './AddInputDrawer';

@connect(({templates, loading}) => ({
  loading: loading.models.templates,
  currentTemplate: templates.current,
}))
@Form.create()
export default class UpdateTemplate extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      showAddProjectDrawer: false,
      showAddProjectItemDrawer: false,
      showAddInputDrawer: false,
    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'templates/fetchCurrent',
      id: this.props.match.params.id,
    });
  }

  onUpdateProject(id, title) {
    this.props.dispatch({
      type: 'templates/updateTemplate',
      id,
      templateChildType: 'project',
      params: {title},
    }).then(() => {
      message.success('修改成功');
    });
  }

  onUpdateProjectItem(id, params) {
    this.props.dispatch({
      type: 'templates/updateTemplate',
      id,
      templateChildType: 'project_item',
      params,
    }).then(() => {
      message.success('修改成功');
    });
  }

  onUpdateInput(id, title) {
    this.props.dispatch({
      type: 'templates/updateTemplate',
      id,
      templateChildType: 'template_input',
      params: {title},
    }).then(() => {
      message.success('修改成功');
    });
  }

  render() {
    return (
      <div className={UpdateTemplateStyles.wrapper}>
        <PageHeader title="编辑模板"/>
        <div className={UpdateTemplateStyles.add_buttons}>
          <Button icon="plus" type="primary" onClick={() => {
            this.setState({showAddProjectDrawer: true});
          }}>
            考核项目
          </Button>
          <Button icon="plus" type="primary" onClick={() => {
            this.setState({showAddProjectItemDrawer: true});
          }}>
            评分标准
          </Button>
          <Button icon="plus" type="primary" onClick={() => {
            this.setState({showAddInputDrawer: true});
          }}>
            总结
          </Button>
        </div>
        <TemplateTable
          currentTemplate={this.props.currentTemplate}
          onUpdateProject={this.onUpdateProject.bind(this)}
          onUpdateProjectItem={this.onUpdateProjectItem.bind(this)}
          onUpdateInput={this.onUpdateInput.bind(this)}
          isEditTemplate/>
        <AddProjectDrawer
          show={this.state.showAddProjectDrawer}
          onClose={() => {
            this.setState({showAddProjectDrawer: false})
          }}
          templateId={Number(this.props.match.params.id)}
        />
        <AddProjectItemDrawer
          show={this.state.showAddProjectItemDrawer}
          onClose={() => {
            this.setState({showAddProjectItemDrawer: false})
          }}
        />
        <AddInputDrawer
          templateId={Number(this.props.match.params.id)}
          show={this.state.showAddInputDrawer}
          onClose={() => {
            this.setState({showAddInputDrawer: false})
          }}
        />
      </div>
    );
  }
}
