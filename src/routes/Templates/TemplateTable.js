import React from 'react';
import InputCell from './InputCell';
import TemplateTableStyles from './TemplateTable.css';
import PropTypes from 'prop-types';

export default class TemplateTable extends React.Component {
  static propTypes = {
    basicInfo: PropTypes.object,
    isSelf: PropTypes.bool,
    isDirect: PropTypes.bool,
    isIndirect: PropTypes.bool,
    isEditTemplate: PropTypes.bool,
    onUpdateProject: PropTypes.func,
    onUpdateProjectItem: PropTypes.func,
    onUpdateInput: PropTypes.func,
    currentTemplate: PropTypes.object,
    onReviewScore: PropTypes.func, // 直接经理打分
    onReviewRemark: PropTypes.func, // 直接经理备注
    onReviewEvaluate: PropTypes.func, // 直接经理备注
    onSelfScore: PropTypes.func, //自评分
    onSelfSummary: PropTypes.func, //自评总结
    onAuditOpinion: PropTypes.func, // 间接经理审核意见
    quarter: PropTypes.object,
    assessmentInputContents: PropTypes.array,
    assessmentProjectScores: PropTypes.array,
  };
  static defaultProps = {
    basicInfo: {},
    currentTemplate: {},
  };

  findProjectScoreById(projectId) {
    return this.props.assessmentProjectScores.find(item => item.assessmentProject.id === projectId) || {};
  }

  findInputContentById(inputId) {
    return this.props.assessmentInputContents.find(item => item.assessmentInput.id === inputId) || {};
  }

  render() {
    const projectTrs = this.props.currentTemplate.assessmentProjects.map((project) => {
      project = project || {items: []};
      const trs = project.items.slice(1, project.items.length).map((item) => {  // eslint-disable-line
        return (
          <tr key={item.id}>
            {/* 除了第一行的 projet_item title score */}
            <td colSpan="5">
              <InputCell
                disabled={!this.props.isEditTemplate}
                type="textarea"
                onBlur={(v) => {
                  if (v !== item.title) {
                    this.props.onUpdateProjectItem(item.id, {title: v});
                  }
                }}
                value={item.title}
              />
            </td>
            <td>
              <InputCell
                disabled={!this.props.isEditTemplate}
                value={item.score}
                onBlur={(v) => {
                  if (v !== String(item.score)) {
                    this.props.onUpdateProjectItem(item.id, {score: v})
                  }
                }}
              />
            </td>
          </tr>
        );
      });
      if (project.items.length > 0) {
        trs.unshift(<tr key={project.id}>
          {/* title */}
          <td rowSpan={project.items.length}>
            <InputCell
              disabled={!this.props.isEditTemplate}
              onBlur={(v) => {
                if (v !== project.title) {
                  this.props.onUpdateProject(project.id, v)
                }
              }}
              value={project.title}/>
          </td>
          {/* project 第一行title */}
          <td colSpan="5">
            <InputCell
              disabled={!this.props.isEditTemplate}
              type="textarea"
              onBlur={(v) => {
                if (v !== project.items[0].title) {
                  this.props.UpdateProjectItem(project.items[0].id, {title: v})
                }
              }}
              value={project.items[0].title}/>
          </td>
          {/* project 第一行score */}
          <td>
            <InputCell
              disabled={!this.props.isEditTemplate}
              onBlur={(v) => {
                if (v !== String(project.items[0].score)) {
                  this.props.onUpdateProjectItem(project.items[0].id, {score: v})
                }
              }}
              value={project.items[0].score}/>
          </td>
          {/* 第一行自评得分 */}
          <td rowSpan={project.items.length}>
            <InputCell
              onBlur={v => this.props.onSelfScore(project.id, v)}
              disabled={this.props.isEditTemplate || !this.props.isSelf}
              value={this.findProjectScoreById(project.id).selfScore}
            />
          </td>
          {/* 第一行直接经理评分 */}
          <td rowSpan={project.items.length}>
            <InputCell
              disabled={this.props.isEditTemplate || !this.props.isDirect}
              onBlur={v => this.props.onReviewScore(project.id, v)}
              value={this.findProjectScoreById(project.id).managerScore}
            />
          </td>
          {/* 第一行备注 */}
          <td rowSpan={project.items.length}>
            <InputCell
              disabled={this.props.isEditTemplate || !this.props.isDirect}
              onBlur={v => this.props.onReviewRemark(project.id, v)}
              type="textarea" value={this.findProjectScoreById(project.id).remarks}
            />
          </td>
        </tr>);
      }
      return trs;
    });
    const inputTrs = this.props.currentTemplate.assessmentInputs.map((inputItem) => {
      const titleTds = [<tr key={inputItem.id + 'title'}>
        {/* 总结title */}
        <td colSpan="10"><InputCell
          disabled={!this.props.isEditTemplate}
          value={inputItem.title}
          onBlur={(v) => {
            if (v !== inputItem.title) {
              this.props.onUpdateInput(inputItem.id, v)
            }
          }}
        />
        </td>
      </tr>];
      titleTds.push(<tr key={inputItem.id + 'input'} colSpan="10">
        <td className={TemplateTableStyles.input_td} colSpan="10">
          {/* 总结content */}
          <InputCell
            onBlur={v => this.props.onSelfSummary(inputItem.id, v)}
            disabled={this.props.isEditTemplate || !this.props.isSelf}
            type="textarea"
            value={this.findInputContentById(inputItem.id).content}
          />
        </td>
      </tr>);
      return titleTds;
    });
    return (
      <div className={TemplateTableStyles.template}>
        <table cellPadding="0" className={TemplateTableStyles.table}>
          <tbody>
          <tr>
            <td colSpan="10"><InputCell disabled value="上海容大数字技术有限公司"/></td>
          </tr>
          <tr>
            <td colSpan="10"><InputCell disabled value={this.props.currentTemplate.name}/></td>
          </tr>
          <tr>
            <td colSpan="10"><InputCell disabled value="注：本表适用于不带团队的员工填写"/></td>
          </tr>
          <tr>
            <td><InputCell disabled value="姓名"/></td>
            <td>
              <InputCell disabled value={this.props.basicInfo.name}/>
            </td>
            <td><InputCell disabled value="部门"/></td>
            <td>
              <InputCell
                disabled
                value={this.props.basicInfo.department && this.props.basicInfo.department.name}/>
            </td>
            <td><InputCell disabled value="项目组"/></td>
            <td><InputCell disabled/></td>
            <td><InputCell disabled value="岗位"/></td>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <td><InputCell disabled value="直接经理"/></td>
            <td>
              <InputCell
                disabled
                value={this.props.basicInfo.directManager && this.props.basicInfo.directManager.name}/>
            </td>
            <td><InputCell disabled value="间接经理"/></td>
            <td colSpan="2">
              <InputCell
                disabled
                value={this.props.basicInfo.indirectManager && this.props.basicInfo.indirectManager.name}/>
            </td>
            <td><InputCell disabled value="考核时间"/></td>
            <td colSpan="4"><InputCell disabled value={this.props.quarter && this.props.quarter.name}/></td>
          </tr>
          <tr>
            <td><InputCell disabled value="考核项目"/></td>
            <td colSpan="5"><InputCell disabled value="评分参考标准"/></td>
            <td><InputCell disabled value="分值"/></td>
            <td><InputCell disabled value="自评得分"/></td>
            <td><InputCell disabled value="直接经理评分"/></td>
            <td><InputCell disabled value="备注"/></td>
          </tr>
          {projectTrs}
          <tr>
            <td colSpan="6">合记</td>
            <td>
              <InputCell/>
            </td>
            <td>
              <InputCell/>
            </td>
            <td>
              <InputCell/>
            </td>
            <td>
              <InputCell/>
            </td>
          </tr>
          <tr>
            <td colSpan="10"><InputCell disabled value="工作总结、改进和工作目标计划"/></td>
          </tr>
          {inputTrs}
          <tr>
            <td colSpan="10"><InputCell disabled value="直接经理评价和改进建议："/></td>
          </tr>
          <tr className="editable" colSpan="10">
            <td className="input_td" colSpan="10">
              <InputCell
                onBlur={v => this.props.onReviewEvaluate(v)}
                disabled={this.props.isEditTemplate || !this.props.isDirect}
                type="textarea"
              />
            </td>
          </tr>
          <tr>
            <td colSpan="4"><InputCell disabled value="间接经理审核意见"/></td>
            <td colSpan="6">
              <InputCell
                onBlur={v => this.props.onAuditOpinion(v)}
                disabled={this.props.isEditTemplate || !this.props.isIndirect}
              />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
