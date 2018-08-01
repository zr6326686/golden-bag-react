import React from 'react';
import PropTypes from 'prop-types';
import InputCellStyles from './InputCell.css';

export default class InputCell extends React.PureComponent {
  static defaultProps = {
    type: 'input',
    disabled: false,
    onBlur: () => {
    }
  };
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.oneOf(['input', 'textarea']),
    disabled: PropTypes.bool,
    onBlur: PropTypes.func,
  };


  constructor(props) {
    super(props);
    this.state = {
      readOnly: true,
    };
  }

  onBlur(e) {
    this.setState({readOnly: true});
    this.props.onBlur(e.target.value);
  }

  onDoubleClick(e) {
    const len = e.target.value.length;
    e.target.setSelectionRange(len, len);
    this.setState({readOnly: false})
  }

  render() {
    return (
      <React.Fragment>
        {this.props.type === 'input' ?
          <input
            defaultValue={this.props.value}
            className={InputCellStyles.input}
            onDoubleClick={this.onDoubleClick.bind(this)}
            readOnly={this.state.readOnly}
            disabled={this.props.disabled}
            onBlur={this.onBlur.bind(this)}/> :
          <textarea
            defaultValue={this.props.value}
            className={InputCellStyles.input}
            onDoubleClick={this.onDoubleClick.bind(this)}
            readOnly={this.state.readOnly}
            disabled={this.props.disabled}
            onBlur={this.onBlur.bind(this)}/>
        }
      </React.Fragment>
    );
  }
}

