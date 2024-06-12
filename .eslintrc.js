module.exports = {
  extends: [
    'airbnb', // 或者 'airbnb-base' 如果你不需要 React 相关规则
    'plugin:react/recommended', // 添加 React 推荐的规则
    'prettier', // 整合 Prettier 以避免冲突
  ],
  parserOptions: {
    ecmaVersion: 2020, // 支持最新的 ECMAScript 特性
    sourceType: 'module', // 使用 ES 模块
    ecmaFeatures: {
      jsx: true, // 启用 JSX
    },
  },
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },
  plugins: ['prettier'],
  rules: {
    'no-param-reassign': 'off', // 允许参数重新赋值
    'prefer-template': 'off', // 允许字符串连接
    'arrow-body-style': 'off', // 允许箭头函数包含大括号
    'comma-dangle': 'off', // 不强制要求逗号
    eqeqeq: 'off', // 允许使用宽松相等运算符
    'no-empty': 'off', // 允许空块语句
    'import/extensions': 'off', // 允许文件扩展名
    'import/newline-after-import': 'off', // 允许没有空行
    'import/prefer-default-export': 'off', // 不强制默认导出
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ], // 允许在 .js, .jsx, .ts, .tsx 文件中使用 JSX
    'react/self-closing-comp': 'off', // 允许非自闭合标签
    'arrow-parens': 'off', // 不强制箭头函数参数使用括号
    'object-curly-newline': 'off', // 不强制大括号内部换行
    'import/order': 'off', // 不强制 import 顺序
    'jsx-a11y/anchor-is-valid': 'off', // 允许 <a> 标签使用非导航行为
    'jsx-a11y/click-events-have-key-events': 'off', // 允许非交互元素上的点击事件
    'jsx-a11y/no-static-element-interactions': 'off', // 允许静态元素使用交互事件
    'no-use-before-define': 'off', // 允许在定义之前使用变量
    'prefer-const': 'off', // 不强制使用 const
    'react/react-in-jsx-scope': 'off', // React 17+ 不需要在作用域中引用 React
    'react/jsx-boolean-value': 'off', // 允许布尔属性值显示
    'implicit-arrow-linebreak': 'off', // 允许箭头函数表达式前有换行符
    'react/jsx-curly-newline': 'off', // 不强制大括号内部换行
    'no-shadow': 'off', // 允许变量声明与外层作用域中的变量名称冲突
    'react/function-component-definition': 'off', // 不强制特定的函数组件定义风格
    'no-unused-vars': 'off', // 允许未使用的变量
    'react/jsx-props-no-spreading': 'off', // 允许 JSX 属性扩展
    'no-debugger': 'off',
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    'no-console': 'off',
  },
};
