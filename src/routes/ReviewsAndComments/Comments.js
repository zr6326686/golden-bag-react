import React from 'react';
import {connect} from 'dva';
import {Badge, Button} from 'antd';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';

@connect(({reviewsAndComments, loading}) => ({
  loading: loading.models.reviewsAndComments,
  comments: reviewsAndComments.comments,
}))
export default class Comments extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'reviewsAndComments/fetchComments',
    });
  }

  render() {
    return (
      <div>
        <PageHeader noBtn title="间接经理审核"/>
        <StandardTable
          rowKey="id"
          columns={[
            {
              title: '姓名',
              dataIndex: 'uname',
            },
            {
              label: '性别',
              render(gender) {
                return gender === 'WOMAN' ? '女' : '男';
              },
            },
            {
              title: '时间系数',
              dataIndex: 'time_coefficient',
            },
            {
              title: '自评得分',
              dataIndex: 'total_self_score',
            },
            {
              title: '状态',
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
                return (<Badge status={statusMap[status].status} text={status[status].title}/>);
              }
            },
            {
              title: '操作',
              render() {
                return (
                  <Button type="primary">评价</Button>
                );
              }
            },
          ]}
          data={this.props.comments}
          loading={this.props.loading}
          selectedRows={this.state.selectedRows}/>
      </div>
    );
  }
}
