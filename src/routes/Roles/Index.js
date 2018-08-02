import React from 'react';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import {Divider, Icon, message, Modal} from 'antd';
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

  delUser(id) {
    const self = this;
    Modal.confirm({
      title: '你确定要删除该角色？',
      content: '确定要删除？',
      onOk() {
        const hide = message.loading('删除中..', 0);
        self.props.dispatch({
          type: 'roles/delRole',
          id,
        }).then(() => {
          hide();
          self.props.dispatch({
            type: 'roles/fetch',
          });
        });
      }
    });
  }

  handleStandardTableChange(pagination) {
    this.props.dispatch({
      type: 'roles/fetch',
      page: pagination.current,
      size: pagination.pageSize,
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="角色管理" onClick={() => {
          this.props.history.push('/roles/add');
        }}/>
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
                  <Link to={`/roles/${item.id}`}><Icon type="edit"/> 编辑</Link>
                  <Divider type="vertical"/>
                  <a onClick={() => {
                    this.delUser(item.id);
                  }}><Icon type="delete"/> 删除</a>
                </React.Fragment>
              ),
            }
          ]}
          onChange={this.handleStandardTableChange.bind(this)}
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
