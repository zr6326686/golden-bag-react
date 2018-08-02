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
    this.reviews = {
      directManagerEvaluation: '',
      assessmentProjectScores: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'reviewsAndComments/fetchCurrentAssessment',
      id: this.props.match.params.id,
    });
  }

  onReviewScore(projectId, v) {
    const index =
      this.reviews.assessmentProjectScores
        .findIndex(item => item.assessmentProject.id === projectId);
    if (index >= 0) {
      this.reviews.assessmentProjectScores[index].managerScore = v;
    } else {
      this.reviews.assessmentProjectScores.push({
        assessmentProject: {
          id: projectId,
        },
        managerScore: v,
      });
    }
  }

  onReviewRemark(projectId, v) {
    const index =
      this.reviews.assessmentProjectScores
        .findIndex(item => item.assessmentProject.id === projectId);
    if (index >= 0) {
      this.reviews.assessmentProjectScores[index].remarks = v;
    } else {
      this.reviews.assessmentProjectScores.push({
        assessmentProject: {
          id: projectId,
        },
        managerScore: v,
      });
    }
  }

  onReviewEvaluate(v) {
    this.reviews.directManagerEvaluation = v;
  }

  submit() {
    const self = this;
    Modal.confirm({
      title: '你确定要提交评分？',
      content: '检查',
      onOk() {
        const hide = message.loading('提交中..', 0);
        self.props.dispatch({
          type: 'reviewsAndComments/review',
          id: self.props.match.params.id,
          reviewData: self.reviews,
        }).then(() => {
          hide();
        });
      }
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="直接经理评分"/>
        <TemplateTable
          isDirect
          quarter={this.props.currentAssessment.quarter}
          basicInfo={this.props.currentAssessment.user}
          currentTemplate={this.props.currentAssessment.assessmentTemplate}
          onReviewScore={this.onReviewScore.bind(this)}
          onReviewRemark={this.onReviewRemark.bind(this)}
          onReviewEvaluate={this.onReviewEvaluate.bind(this)}
          totalSelfScore={this.props.currentAssessment.totalSelfScore}
          directManagerEvaluation={this.props.currentAssessment.directManagerEvaluation}
          assessmentInputContents={this.props.currentAssessment.assessmentInputContents}
          assessmentProjectScores={this.props.currentAssessment.assessmentProjectScores}
        />
        <Button loading={this.props.loading} className={ReviewsAndCommentsStyles.submit_btn} size="large" type="primary"
                onClick={this.submit.bind(this)}>提交评分结果</Button>
      </div>
    );
  }
}
