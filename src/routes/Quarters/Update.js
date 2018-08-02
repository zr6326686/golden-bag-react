import React from 'react';
import QuarterForm from './QuarterForm';
import PageHeader from '../../components/PageHeader/PageHeader';
import {message} from 'antd';
import {connect} from 'dva';

@connect(({quarters}) => ({
  currentQuarter: quarters.current,
}))
export default class Update extends React.PureComponent {

  componentDidMount() {
    this.props.dispatch({
      type: 'quarters/fetchCurrent',
      id: this.props.match.params.id,
    });
  }

  onSubmit(values) {
    const hide = message.loading('更新季度中...', 0);

    this.props.dispatch({
      type: 'quarters/updateQuarter',
      id: this.props.match.params.id,
      quarter: values,
    }).then(() => {
      hide();
      this.props.history.push('/quarters');
    });
  }

  render() {
    return (
      <div>
        <PageHeader title="编辑季度" isBack onClick={() => {
          this.props.history.push('/quarters');
        }}/>
        <QuarterForm
          currentQuarter={this.props.currentQuarter}
          onSubmit={this.onSubmit.bind(this)}
          title="编辑"
        />
      </div>
    );
  }
}
