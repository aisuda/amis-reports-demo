import * as React from 'react';
import ReactDOM from 'react-dom';
// import {createRoot} from 'react-dom/client'; // react 18
import {Editor, ShortcutKey} from 'amis-editor';
import {__uri} from 'amis-core';
import {Icon} from './icons/index';
import {fetcher, getPageQuery, updateCsrfToken, getUserInfoAsync} from './common/utils';

// 导入报表组件渲染器列表
import 'amis-reports/lib/renderers';
import 'amis-reports/lib/renderers.css'; // 报表组件样式
// 导入报表组件插件列表
import reportPlugins, {
  chartArrayData,
  chartDefaultDimensions,
  chartDefaultMeasures,
  updateReportConfig
} from 'amis-reports/lib/plugins';

// import styles
import 'amis-ui/lib/themes/default.css';
import 'amis-ui/lib/themes/cxd.css';
import './fontawesome-free/all.min.css';
import './fontawesome-free/v4-shims.css';
import './scss/style.scss'; // demo样式文件
import 'amis-editor-core/lib/style.css';

// 默认页面schema
const schema = {
  type: 'page',
  title: '报表页',
  body: [
    {
      type: 'chart-column',
      chartTitle: '柱状图',
      columnChartType: 'default',
      dataSourceType: 'staticJson',
      staticJson: chartArrayData,
      dimensions: chartDefaultDimensions,
      measures: chartDefaultMeasures
    }
  ],
  regions: ['body']
};
// 通过plugin注入
const plugins = [...reportPlugins];

class SchemaEditorDemo extends React.Component {
  state = {
    preview: !!localStorage.getItem('editting_preview'),
    isMobile: !!localStorage.getItem('editting_preview_mobile'),
    schema: localStorage.getItem('editting_schema') ? JSON.parse(localStorage.getItem('editting_schema')) : schema,
    user: {}
  };

  constructor(props) {
    super(props);
    const pageQuery = getPageQuery();
    if (pageQuery.token) {
      updateCsrfToken(pageQuery.token);

      // 获取用户身份
      fetcher({
        url: '/api/user/info',
        method: 'get'
      }).then(result => {
        if (result.data?.status === 0 && result.data?.data) {
          this.setState({
            user: result.data.data
          });
        }
      });
    }

    // 初始化报表系统配置
    updateReportConfig({
      // webServerRootPath: 'https://aisuda.bce.baidu.com/', // 网站后端服务根路径
      reportMode: 'saas',
      useDataModelSource: true, // 开启实体数据源，默认关闭
      useDataSetSource: true, // 开启数据集数据源，默认关闭
      companyKey: 'c4b93', // 组织Key
      appKey: 'b1db2411bdd3-dev', // 应用Key
      pageKey: 'L3dmy82dBm' // 页面ID
    });
  }

  handleChange = value => {
    localStorage.setItem('editting_schema', JSON.stringify(value));

    this.setState({
      schema: value
    });
  };

  onSave = () => {
    const curSchema = this.state.schema;
    localStorage.setItem('editting_schema', JSON.stringify(curSchema));
  };

  handlePreviewChange = preview => {
    localStorage.setItem('editting_preview', preview ? 'true' : '');

    this.setState({
      preview: !!preview
    });
  };

  togglePreview = () => {
    this.handlePreviewChange(!this.state.preview);
  };

  handleMobileChange = isMobile => {
    localStorage.setItem('editting_preview_mobile', isMobile ? 'true' : '');

    this.setState({
      isMobile: !!isMobile
    });
  };

  clearCache = () => {
    localStorage.removeItem('editting_schema');
    this.setState({
      schema: schema
    });
  };

  render() {
    const {preview, isMobile, schema, user} = this.state;
    return (
      <div className="Editor-Demo">
        <div className="Editor-header">
          <div className="Editor-title">页面设计器（amis-saas模式）</div>
          <div className="Editor-view-mode-group-container">
            <div className="Editor-view-mode-group">
              <div
                className={`Editor-view-mode-btn ${!isMobile ? 'is-active' : ''}`}
                onClick={() => {
                  this.handleMobileChange(false);
                }}
              >
                <Icon icon="pc-preview" title="PC模式" />
              </div>
              <div
                className={`Editor-view-mode-btn ${isMobile ? 'is-active' : ''}`}
                onClick={() => {
                  this.handleMobileChange(true);
                }}
              >
                <Icon icon="h5-preview" title="移动模式" />
              </div>
            </div>
          </div>

          <div className="Editor-header-actions">
            <ShortcutKey />
            {user?.name && <span className="margin-left-space">{user.name}</span>}
            {!user?.name && (
              <div
                className="header-action-btn margin-left-space login"
                onClick={() => {
                  window.location.href = '/login.html';
                }}
              >
                登录
              </div>
            )}
            <div
              className={`header-action-btn ${preview ? 'primary' : ''}`}
              onClick={() => {
                this.togglePreview();
              }}
            >
              {preview ? '编辑' : '预览'}
            </div>
          </div>
        </div>
        <div className="Editor-inner">
          <Editor
            preview={preview}
            isMobile={isMobile}
            value={schema}
            onChange={this.handleChange}
            onPreview={this.handlePreviewChange}
            onSave={this.onSave}
            className="is-fixed"
            theme="cxd"
            showCustomRenderersPanel={true}
            plugins={plugins}
            // iframeUrl={'/examples/editor.html'}
            $schemaUrl={`${location.protocol}//${location.host}/schema.json`}
            amisEnv={{
              fetcher
            }}
          />
        </div>
      </div>
    );
  }
}

// react < 18
ReactDOM.render(<SchemaEditorDemo />, document.getElementById('root'));
