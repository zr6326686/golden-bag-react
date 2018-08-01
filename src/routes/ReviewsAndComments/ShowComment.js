import React from 'react';
import TemplateTable from '../Templates/TemplateTable';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import {Button, message, Modal} from 'antd';
import ReviewsAndComments from './ReviewsAndComments.css';

@connect(({templates, loading}) => ({
  loading: loading.models.reviewsAndComments,
  currentTemplate: templates.current,
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
      type: 'templates/fetchCurrent',
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
        <PageHeader title="直接经理审核" noBtn/>
        <TemplateTable
          isIndirect
          currentTemplate={this.props.currentTemplate}
          onAuditOpinion={this.onAuditOpinion.bind(this)}
        />
        <Button loading={this.props.loadiong} className={ReviewsAndComments.submit_btn} size="large" type="primary"
                onClick={this.submit.bind(this)}>提交审核结果</Button>
      </div>
    );
  }
}
