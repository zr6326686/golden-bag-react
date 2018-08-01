import React from 'react';
import {Col, Modal, Row, Spin, Tree} from 'antd';
import PageHeader from '../../components/PageHeader/PageHeader';
import {connect} from 'dva';
import DepartmentForm from './DepartmentForm';
import IndexStyles from './Index.css';

@connect(({departments, loading}) => ({
  loading: loading.models.departments,
  departmentList: departments.list,
}))
export default class Index extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentDepartment: null,
      selectedKeys: [],
      expandedKeys: [],
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'departments/fetch',
    }).then(res => {
      this.props.departmentList.forEach(item => {
        this.state.expandedKeys.push(String(item.id));
      });
      this.forceUpdate();
    });
  }

  delDepartment(id) {
    const self = this;
    Modal.confirm({
      title: '你确定要删除该部门?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        self.props.dispatch({
          type: 'departments/delDepartment',
          id,
        });
      },
    });
  }

  renderDepartmentsTree(department) {
    return department.map(item => {
      return (
        <Tree.TreeNode
          title={item.name}
          key={item.id}
          department={item}
        >
          {
            item.children && this.renderDepartmentsTree(item.children)
          }
        </Tree.TreeNode>
      );
    })
  }

  onTreeSelect(selectedKeys, e) {
    this.setState({
      selectedKeys,
      currentDepartment: e.selectedNodes[0] ? e.selectedNodes[0].props.department : null,
    });
  }

  onTreeExpand(expandedKeys) {
    this.setState({expandedKeys: [...new Set(expandedKeys)]});
  }

  render() {
    return (
      <div>
        <PageHeader title="部门管理" onAdd={() => this.setState({selectedKeys: [], currentDepartment: null})}/>
        <Row>
          <Col span={6}>
            <Spin spinning={this.props.loading}>
              <Tree expandedKeys={this.state.expandedKeys}
                    selectedKeys={this.state.selectedKeys}
                    onExpand={this.onTreeExpand.bind(this)}
                    onSelect={this.onTreeSelect.bind(this)}
                    className={IndexStyles.department_tree}
                    showLine>
                {this.renderDepartmentsTree(this.props.departmentList)}
              </Tree>
            </Spin>
          </Col>
          <Col span={18}>
            <DepartmentForm delDepartment={this.delDepartment.bind(this)}
                            currentDepartment={this.state.currentDepartment}/>
          </Col>
        </Row>
      </div>);
  }
}
