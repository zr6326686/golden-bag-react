import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'dva';
import {Badge, Button} from 'antd';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import PageError from '../../components/Exception/PageError';

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

  handleStandardTableChange(pagination) {
    this.props.dispatch({
      type: 'reviewsAndComments/fetchComments',
      page: pagination.current,
      size: pagination.pageSize,
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="间接经理审核"/>
        {
          this.props.comments ?

            <StandardTable
              rowKey="id"
              columns={[
                {
                  title: '姓名',
                  dataIndex: 'uname',
                },
                {
                  title: '性别',
                  dataIndex: 'gender',
                  render(gender) {
                    return gender === 'WOMAN' ? '女' : '男';
                  },
                },
                {
                  title: '季度',
                  dataIndex: 'quarter.name',
                },
                {
                  title: '自评得分',
                  dataIndex: 'total_self_score',
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
                  render(item) {
                    return (
                      <Link to={`/comments/${item.id}`}>
                        <Button type="primary">评价</Button>
                      </Link>
                    );
                  }
                },
              ]}

              data={this.props.comments}
              loading={this.props.loading}
              onChange={this.handleStandardTableChange.bind(this)}
              selectedRows={this.state.selectedRows}/>
            : <PageError/>
        }
      </div>
    );
  }
}
