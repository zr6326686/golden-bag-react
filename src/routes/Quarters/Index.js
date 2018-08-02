import React from 'react';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';
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
  handleStandardTableChange(pagination) {
    this.props.dispatch({
      type: 'quarters/fetch',
      page: pagination.current,
      size: pagination.pageSize,
    });
  }
  render() {
    return (
      <div>
        <PageHeader title="季度管理"/>
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
            {
              title: '操作',
              render: (item) => (
                <React.Fragment>
                  <Link to={`/quarters/${item.id}`}><Icon type="edit"/> 编辑</Link>
                </React.Fragment>
              ),
            }
          ]}
          data={this.props.list}
          loading={this.props.loading}
          onChange={this.handleStandardTableChange.bind(this)}
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
