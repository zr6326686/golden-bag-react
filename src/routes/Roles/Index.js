import React from 'react';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import {Divider, Icon} from 'antd';
import {Link} from 'react-router-dom';

@connect(({roles, loading}) => ({
  loading: loading.models.roles,
  list: roles.list,
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
        <PageHeader noBtn title="角色管理"/>
        <StandardTable
          rowKey="id"
          columns={[
            {
              title: '角色名称',
              dataIndex: 'name',
            },
            {
              title: '描述',
              dataIndex: 'description',
            },
            {
              title: '操作',
              render: (item) => (
                <React.Fragment>
                  <Link to={`/users/${item.id}`}><Icon type="edit"/> 编辑</Link>
                  <Divider type="vertical"/>
                  <a href=""><Icon type="delete"/> 删除</a>
                </React.Fragment>
              ),
            }
          ]}
          data={this.props.list}
          loading={this.props.loading}
          selectedRows={this.state.selectedRows}/>
      </div>
    );
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'roles/fetch',
    });
  }
}
