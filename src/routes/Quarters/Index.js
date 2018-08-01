import React from 'react';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import moment from 'moment';

@connect(({quarters, loading}) => ({
  loading: loading.models.quarters,
  list: quarters.list,
}))
export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  render() {
    return (
      <div>
        <PageHeader noBtn title="季度管理"/>
        <StandardTable
          rowKey="id"
          columns={[
            {
              title: '季度名称',
              dataIndex: 'name',
            },
            {
              title: '单价',
              dataIndex: 'price',
            },
            {
              title: '季度开始日期',
              dataIndex: 'startDate',
              render(startDate) {
                return startDate ? moment(startDate).format('YYYY-MM-DD') : '';
              }
            },
            {
              title: '开始考核日期',
              dataIndex: 'startAssessmentDate',
              render(startAssessmentDate) {
                return startAssessmentDate ? moment(startAssessmentDate).format('YYYY-MM-DD') : '';
              }
            },
          ]}
          data={this.props.list}
          loading={this.props.loading}
          selectedRows={this.state.selectedRows}/>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'quarters/fetch',
    });
  }
}
