import React from 'react';
import {connect} from 'dva';
import {Badge, Button} from 'antd';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';

@connect(({assessments, loading}) => ({
  loading: loading.models.assessments,
  list: assessments.list,
}))
export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'assessments/fetch',
    });
  }

  handleStandardTableChange(pagination) {
    this.props.dispatch({
      type: 'assessments/fetch',
      page: pagination.current,
      size: pagination.pageSize,
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="审核记录汇总"/>
        <StandardTable
          rowKey="id"
          columns={[
            {
              title: '姓名',
              dataIndex: 'user.name',
            },
            {
              title: '性别',
              dataIndex: 'gender',
              render(gender) {
                return gender === 'WOMAN' ? '女' : '男';
              },
            },
            {
              title: '时间系数',
              dataIndex: 'timeCoefficient',
            },
            {
              title: '职级系数',
              dataIndex: 'rankCoefficient',
            },
            {
              title: '自评得分',
              dataIndex: 'totalSelfScore',
            },
            {
              title: '直接经理评分',
              dataIndex: 'totalManagerScore',
            },
            {
              title: '状态',
              dataIndex: 'status',
              render(status) {
                const statusMap = {
                  SUBMITTED: {
                    status: 'error',
                    title: '已提交',
                  },
                  DIRECT_MANAGER_EVALUATED: {
                    status: 'processing',
                    title: '直接经理已评价',
                  },
                  INDIRECT_MANAGER_RECHECK: {
                    status: 'processing',
                    title: '间接经理已审核',
                  },
                  FINISHED: {
                    status: 'success',
                    title: '已完成',
                  },
                };
                return (<Badge status={statusMap[status].status} text={statusMap[status].title}/>);
              }
            },
            {
              title: '操作',
              render() {
                return (
                  <Button type="primary">导出</Button>
                );
              }
            },
          ]}
          onChange={this.handleStandardTableChange.bind(this)}
          data={this.props.list}
          loading={this.props.loading}
          selectedRows={this.state.selectedRows}/>
      </div>
    );
  }
}
