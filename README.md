### Demo示例
[点击在线预览](https://aisuda.github.io/amis-reports-demo/demo/1.5.8/index.html)

## 历史版本预览地址
1. [1.5.8(2024.08.09)](https://aisuda.github.io/amis-reports-demo/demo/1.5.8/index.html)
2. [1.5.7(2024.08.02)](https://aisuda.github.io/amis-reports-demo/demo/1.5.7/index.html)

### 本地调试

#### 1、安装依赖  
```
npm install
```

#### 2、启动页面设计器
```
npm run dev
```
启动成功后，默认自动打开页面设计器（http://localhost:1024/index.html ）。  
【备注】  
此时页面设计器中的报表组件仅支持「静态JSON」、「API拉取」和「上下文」3种数据源。

#### 3、访问页面设计器[amis-saas模式]对接线上爱速搭应用  
访问 saasEditor 页面：http://localhost:1024/saas.html 。（需先通过右上角「登录」功能按钮进行登录操作）

本地saasEditor默认对接线上爱速搭应用（http://gzbh-sandbox103-store-2620.gzbh:8091/company/c4b93/app/b1db2411bdd3-dev ），需确保有此应用访问权限。

如果需要对接爱速搭其他应用数据，可在amis-reports/editor/SaasEditor.jsx中更新updateReportConfig配置参数：
```
updateReportConfig({
  useDataModelSource: true, // 开启实体数据源，默认关闭
  companyKey: 'wibetter', // 组织Key
  appKey: 'eb2a0a7cf7b9-dev', // 应用Key
  pageKey: 'MdZGYQkkw5' // 页面ID
});
```
配置完成再重新启动后，报表组件即可正常使用实体数据源，默认从 company/wibetter/app/eb2a0a7cf7b9-dev 应用中获取实体数据（使用实体数据源时）。

#### 4、访问页面设计器[JSSDK模式]调试数据模型SDK【开发中】  
访问 ModelDataEditor 页面：http://localhost:1024/modelEditor.html 。（无需登录操作）

【备注1】  
需要启动[JSONQL](https://jsonql.now.baidu.com/dev/server)服务，本地默认对接jsonql测试服务（http://gzbh-aipage-006.gzbh.baidu.com:8764 ）；  

【备注2】  
如需本地创建或编辑数据模型，请使用[amis-model-design](https://www.npmjs.com/package/amis-model-design)。

【备注3】  
数据模型SDK当前仅支持「实体数据源」，暂时不支持「数据集」数据源。

【备注4】
如需在本地启动JSONQL服务，可点击查看启动方法[JSONQL jar包启动说明](./jar/README.md)。