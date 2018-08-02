import React from 'react';
import TemplateTable from '../Templates/TemplateTable';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';

@connect(({reviewsAndComments, loading}) => ({
  loading: loading.models.reviewsAndComments,
  currentAssessment: reviewsAndComments.currentAssessment,
}))
export default class Show extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'reviewsAndComments/fetchCurrentAssessment',
      id: this.props.match.params.id,
    });
  }


  render() {
    return (
      <div>
        <PageHeader title="考核表" isBack onClick={() => {
          this.props.history.push('/summary');
        }}/>
        <TemplateTable
          indirectManagerAuditComments={this.props.currentAssessment.indirectManagerAuditComments}
          quarter={this.props.currentAssessment.quarter}
          basicInfo={this.props.currentAssessment.user}
          currentTemplate={this.props.currentAssessment.assessmentTemplate}
          totalSelfScore={this.props.currentAssessment.totalSelfScore}
          directManagerEvaluation={this.props.currentAssessment.directManagerEvaluation}
          assessmentInputContents={this.props.currentAssessment.assessmentInputContents}
          assessmentProjectScores={this.props.currentAssessment.assessmentProjectScores}
        />
      </div>
    );
  }
}
