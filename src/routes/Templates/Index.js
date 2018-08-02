import React from 'react';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import {Link} from 'react-router-dom';
import {Icon} from 'antd';

@connect(({templates, loading}) => ({
  loading: loading.models.templates,
  list: templates.list,
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
      type: 'templates/fetch',
    });
  }

  handleStandardTableChange(pagination) {
    this.props.dispatch({
      type: 'templates/fetch',
      page: pagination.current,
      size: pagination.pageSize,
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="模板管理"/>
        <StandardTable
          rowKey="id"
          columns={[
            {
              title: '模板名称',
              dataIndex: 'name',
            },
            {
              title: '季度',
              dataIndex: 'quarter.name',
            },
            {
              title: '操作',
              render(item) {
                return <Link to={`/templates/${item.id}/update`}><Icon type="edit"/> 编辑</Link>;
              }
            },
          ]}
          data={this.props.list}
          noPage
          loading={this.props.loading}
          onChange={this.handleStandardTableChange.bind(this)}
          selectedRows={this.state.selectedRows}/>
      </div>
    );
  }
}
