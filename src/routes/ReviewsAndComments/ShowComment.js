import React from 'react';
import TemplateTable from '../Templates/TemplateTable';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import {Button, message, Modal} from 'antd';
import ReviewsAndCommentsStyles from './ReviewsAndComments.css';

@connect(({reviewsAndComments, loading}) => ({
  loading: loading.models.reviewsAndComments,
  currentAssessment: reviewsAndComments.currentAssessment,
}))
export default class ShowReview extends React.PureComponent {

  constructor(props) {
    super(props);
    this.commentData = {
      indirectManagerAuditComments: '',
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'reviewsAndComments/fetchCurrentAssessment',
      id: this.props.match.params.id,
    });
  }


  onAuditOpinion(v) {
    this.commentData.indirectManagerAuditComments = v;
  }

  submit() {
    const self = this;
    Modal.confirm({
      title: '你确定要提交审核？',
      content: '检查',
      onOk() {
        const hide = message.loading('提交中..', 0);
        self.props.dispatch({
          type: 'reviewsAndComments/comment',
          id: self.props.match.params.id,
          commentData: self.commentData,
        }).then(() => {
          hide();
        });
      }
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="直接经理审核"/>
        <TemplateTable
          isIndirect
          onAuditOpinion={this.onAuditOpinion.bind(this)}

          quarter={this.props.currentAssessment.quarter}
          basicInfo={this.props.currentAssessment.user}
          currentTemplate={this.props.currentAssessment.assessmentTemplate}
          assessmentInputContents={this.props.currentAssessment.assessmentInputContents}
          assessmentProjectScores={this.props.currentAssessment.assessmentProjectScores}
          directManagerEvaluation={this.props.currentAssessment.directManagerEvaluation}
          indirectManagerAuditComments={this.props.currentAssessment.indirectManagerAuditComments}
          totalSelfScore={this.props.currentAssessment.totalSelfScore}
          totalManagerScore={this.props.currentAssessment.totalManagerScore}
        />
        <Button loading={this.props.loadiong} className={ReviewsAndCommentsStyles.submit_btn} size="large" type="primary"
                onClick={this.submit.bind(this)}>提交审核结果</Button>
      </div>
    );
  }
}
