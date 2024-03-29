import React, {Fragment, PureComponent} from 'react';
import {Alert, Table} from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({...column, total: 0});
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    const {needTotalList: list} = this.state;
    const {onSelectRow} = this.props;
    let needTotalList = [...list];
    needTotalList = needTotalList.map(item => {
      return {
        ...item,
        total: selectedRows.reduce((sum, val) => {
          return sum + parseFloat(val[item.dataIndex], 10);
        }, 0),
      };
    });

    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({selectedRowKeys, needTotalList});
  };
  handleTableChange = (pagination, filters, sorter) => {
    const {onChange} = this.props;

    onChange({...pagination, current: pagination.current - 1}, filters, sorter);
  };
  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  constructor(props) {
    super(props);
    const {columns} = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      this.setState({
        selectedRowKeys: [],
        needTotalList,
      });
    }
  }

  render() {
    const {selectedRowKeys, needTotalList} = this.state;
    const {
      loading,
      columns,
      rowKey,
    } = this.props;
    const pagination = {
      defaultPageSize: this.props.data.size,
      total: this.props.data.totalElements,
    };
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{fontWeight: 600}}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{marginLeft: 8}} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{fontWeight: 600}}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{marginLeft: 24}}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>
        <Table
          loading={loading}
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={this.props.noPage ? this.props.data : this.props.data.content}
          columns={columns}
          pagination={!this.props.noPage && paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
