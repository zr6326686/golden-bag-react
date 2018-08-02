import React from 'react';
import {connect} from 'dva';
import {Icon} from 'antd';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import {Link} from 'react-router-dom';
import moment from 'moment';

@connect(({users, loading}) => ({
  loading: loading.models.users,
  list: users.list,
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
      type: 'users/fetch',
    });
  }
  handleStandardTableChange(pagination) {
    this.props.dispatch({
      type: 'users/fetch',
      page: pagination.current,
      size: pagination.pageSize,
    });
  }
  render() {
    return (
      <div>
        <PageHeader title="用户管理" onClick={() => {
          this.props.history.push('/users/add')
        }}/>
        <StandardTable
          rowKey="id"
          columns={[
            {
              title: '姓名',
              dataIndex: 'name',
            },
            {
              title: '性别',
              dataIndex: 'gender',
              render(gender) {
                return gender === 'WOMAN' ? '女' : '男';
              }
            },
            {
              title: '手机',
              dataIndex: 'phone',
            },
            {
              title: '入职时间',
              dataIndex: 'entryDate',
              render(entryDate) {
                return entryDate ? moment(entryDate).format('YYYY-MM-DD') : '';
              }
            },
            {
              title: '部门',
              dataIndex: 'department.name',
            },
            {
              title: '直接经理',
              dataIndex: 'directManager.name',
            },
            {
              title: '间接经理',
              dataIndex: 'indirectManager.name',
            },
            {
              title: '操作',
              render: (item) => (
                <React.Fragment>
                  <Link to={`/users/${item.id}`}><Icon type="edit"/> 编辑</Link>
                  {/*<Divider type="vertical"/>*/}
                  {/*<a href=""><Icon type="delete"/> 删除</a>*/}
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

}
