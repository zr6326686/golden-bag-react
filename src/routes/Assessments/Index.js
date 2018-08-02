import React from 'react';
import {connect} from 'dva';
import {Badge, Button, Form, Select} from 'antd';
import PageHeader from '../../components/PageHeader/PageHeader';
import StandardTable from '../../components/StandardTable/index';
import IndexStyles from './Index.css';

@connect(({assessments, loading, quarters}) => ({
  loading: loading.models.assessments,
  list: assessments.list,
  quarters: quarters.list.content,
}))
@Form.create()
export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedRows: [],
      filterValues: {},
    };
  }

  // 导出指定一条记录
  static exportOne(id) {
    window.location = `/assessments/export/${id}`;
  }

  // 导出当前季度
  static exportCurrent() {
    window.location = '/assessments/batch_export/byquarters';
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'assessments/fetch',
    });
    this.props.dispatch({
      type: 'quarters/fetch',
    });
  }

  handleStandardTableChange(pagination) {
    this.props.dispatch({
      type: 'assessments/fetch',
      page: pagination.current,
      size: pagination.pageSize,
      quarterId: this.state.filterValues.quarterId,
    });
  }

  batchExport() {
    const assessmentIds = this.state.selectedRows.map(item => {
      return `assessment_ids=${item.id}&`
    });
    window.location = `/assessments/batch_export/byassessments?${assessmentIds}`;
  }

  handleSelectRows(rows) {
    this.setState({
      selectedRows: rows,
    });
  };

  handleFilter(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({filterValues: values});
        this.props.dispatch({
          type: 'assessments/fetch',
          quarterId: values.quarterId
        });
      }
    });
  }

  renderFilterForm() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form className={IndexStyles.form} onSubmit={this.handleFilter.bind(this)} layout="inline">
        <Form.Item label="季度">
          {getFieldDecorator('quarterId')(
            <Select className={IndexStyles.select} placeholder="请选择季度">
              {this.props.quarters.map(item => {
                return (<Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>);
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">查询</Button>
        </Form.Item>
      </Form>
    );
  }


  render() {
    const self = this;
    return (
      <div>
        <PageHeader title="审核记录汇总"/>
        <div className={IndexStyles.options}>
          {this.renderFilterForm()}
          {this.state.selectedRows.length > 0 &&
          <Button onClick={this.batchExport.bind(this)} className={IndexStyles.batch_export}>批量导出</Button>}
        </div>
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
              render(item) {
                return (
                  <React.Fragment>
                    <Button onClick={() => {
                      self.props.history.push(`/assessment/${item.id}`);
                    }}>查看</Button>
                    <Button style={{marginLeft: 10}} onClick={() => {
                      Index.exportOne(item.id);
                    }} type="primary">导出</Button>
                  </React.Fragment>
                );
              }
            },
          ]}
          onChange={this.handleStandardTableChange.bind(this)}
          data={this.props.list}
          loading={this.props.loading}
          onSelectRow={this.handleSelectRows.bind(this)}
          selectedRows={this.state.selectedRows}/>
      </div>
    );
  }
}
