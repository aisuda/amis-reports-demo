/**
 * @file 登录页面: 主要用于登录爱速搭，确保能正常获取应用数据（比如应用实体数据）
 */
import * as React from 'react';
import ReactDOM from 'react-dom';
import {render as AmisRender, Button} from 'amis';
import {RendererProps} from 'amis-core';
import cx from 'classnames';
import {fetcher, fetcherCsrfToken, getCsrfToken} from './common/utils';
import './locale/index'; // 导入国际化语料
// import styles
import 'amis-ui/lib/themes/default.css';
import 'amis-ui/lib/themes/cxd.css';
import './scss/login.scss';

const LoginForm = AmisRender(
  {
    type: 'form',
    api: {
      url: '/login',
      method: 'post',
      adaptor: async (payload: any) => {
        if (payload.msg) {
          alert(payload.msg);
        } else {
          // await fetcherCsrfTokenAsync(); // 重新获取csrfToken
          window.location.href = `/saas.html?token=${getCsrfToken()}`;
        }
      }
    },
    wrapWithPanel: false,
    body: [
      {
        name: 'redirect',
        type: 'hidden',
        value: '/index.html'
      },
      {
        name: 'email',
        type: 'input-email',
        label: '',
        testid: 'login-email',
        placeholder: '请输入邮箱地址',
        className: 'Email-control',
        required: true
      },
      {
        name: 'token',
        type: 'input-text',
        label: '',
        testid: 'login-token',
        className: 'Token-control',
        placeholder: '请输入验证码',
        required: true,
        addOn: {
          type: 'button',
          component: VerifyEmail
        }
      },
      {
        type: 'submit',
        label: '登录',
        block: true,
        level: 'primary',
        size: 'lg',
        className: 'Submit-control'
      }
    ]
  },
  {},
  {
    fetcher
  }
);

export function VerifyEmail({env, store, disabled, keyName}: RendererProps) {
  const [fetching, setFetching] = React.useState(false);
  const [count, setCount] = React.useState(0);

  async function handleClick() {
    const email = store?.data?.email || store?.data?.value;
    if (!email) {
      alert('请先输入邮箱。');
      return;
    }

    setFetching(true);
    const response = await fetcher({
      url: '/verifyEmail',
      method: 'post',
      data: {
        email
      }
    });
    setFetching(false);
    const resultData = response.data || {};

    if (resultData.status !== 0) {
      alert(resultData.msg || '接口调用失败');
      return;
    }
    alert(resultData.msg);
    setCount(60);
  }

  React.useEffect(() => {
    const timer = count ? setTimeout(() => setCount(count - 1), 1000) : 0;
    return () => clearTimeout(timer as number);
  }, [count]);

  return (
    <Button onClick={handleClick} disabled={disabled || !!count || fetching} level="info">
      {count > 0 ? <span>已发送({count}s)</span> : '获取验证码'}
    </Button>
  );
}

function Login(props: any) {
  fetcherCsrfToken(); // 获取 csrfToken

  return (
    <div className="Login-container">
      <div className={cx('Login-container-content', 'email')}>{LoginForm}</div>
    </div>
  );
}

ReactDOM.render(<Login />, document.getElementById('root'));
