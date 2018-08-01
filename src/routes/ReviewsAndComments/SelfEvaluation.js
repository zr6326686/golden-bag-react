import React from 'react';
import {connect} from 'dva';
import {Button, message, Modal} from 'antd';
import PageHeader from '../../components/PageHeader/PageHeader';
import ReviewsAndComments from './ReviewsAndComments.css';
import TemplateTable from '../Templates/TemplateTable';

@connect(({templates, users}) => ({
  myTemplate: templates.myTemplate,
  me: users.me,
}))
export default class SelfEvaluation extends React.PureComponent {

  constructor(props) {
    super(props);
    this.selfEvaluationData = {
      assessmentProjectScores: [],
      assessmentInputContents: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'templates/fetchMyTemplate',
    });
  }

  onSelfScore(id, v) {
    const projectObj = {
      assessmentProject: {id},
      selfScore: v,
    };
    const index =
      this.selfEvaluationData.assessmentProjectScores
        .findIndex(item => item.assessmentProject.id === id);
    if (index >= 0) {
      this.selfEvaluationData.assessmentProjectScores[index] = projectObj;
    } else {
      this.selfEvaluationData.assessmentProjectScores.push(projectObj);
    }
  }

  onSelfSummary(id, v) {
    const inputObj = {
      assessmentInput: {id},
      content: v,
    };
    const index =
      this.selfEvaluationData.assessmentInputContents
        .findIndex(item => item.assessmentInput.id === id);
    if (index >= 0) {
      this.selfEvaluationData.assessmentInputContents[index] = inputObj;
    } else {
      this.selfEvaluationData.assessmentInputContents.push(inputObj);
    }
  }

  submit() {
    const self = this;
    Modal.confirm({
      title: '你确定要提交自评？',
      content: '检查',
      onOk() {
        const hide = message.loading('提交中..', 0);
        self.props.dispatch({
          type: 'reviewsAndComments/selfEvaluation',
          id: self.props.match.params.id,
          selfEvaluationData: self.selfEvaluationData,
        }).then(() => {
          hide();
        });
      }
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="自评" noBtn/>
        <TemplateTable
          isSelf
          basicInfo={this.props.me}
          currentTemplate={this.props.myTemplate}
          onSelfScore={this.onSelfScore.bind(this)}
          onSelfSummary={this.onSelfSummary.bind(this)}
        />
        <Button
          className={ReviewsAndComments.submit_btn}
          size="large"
          type="primary"
          onClick={this.submit.bind(this)}>提交自评</Button>
      </div>
    );
  }
}
