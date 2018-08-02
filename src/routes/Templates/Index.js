import React from 'react';
import {connect} from 'dva';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';

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
          ]}
          data={this.props.list}
          noPage
          loading={this.props.loading}
          selectedRows={this.state.selectedRows}/>
      </div>
    );
  }
}
