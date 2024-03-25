import "./App.css";
import { Button, Table, Space } from "antd";

import {
  createUser,
  getUserList,
  updateUserById,
  deleteUserById,
} from "./api/user";
import { useState, useEffect } from "react";

function App() {
  const handleCreateUser = async () => {
    await createUser({
      name: "mouse",
      sex: "男",
    });
    handleGetUserList();
  };
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "age",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDeleteUser(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const handleGetUserList = async () => {
    console.log("1");
    const { data } = await getUserList();
    setData(
      data.map((item) => {
        return {
          ...item,
          key: item.id,
        };
      })
    );
  };
  useEffect(() => {
    // 组件加载时执行 handleGetUserList 方法
    handleGetUserList();
  }, []);
  const handleUpdateUser = async () => {
    await updateUserById(1, {
      sex: "人妖",
    });
    handleGetUserList();
  };
  const handleDeleteUser = async (id) => {
    await deleteUserById(id);
    handleGetUserList();
  };

  return (
    <div className="App">
      <Button type="default" onClick={handleCreateUser}>
        创建用户
      </Button>
      <Button type="primary" onClick={handleGetUserList}>
        获取用户列表
      </Button>
      <Button type="link" onClick={handleUpdateUser}>
        更新用户
      </Button>
      <Button danger onClick={handleDeleteUser}>
        删除用户
      </Button>
      <div className="ly_8">
        <Table dataSource={data} columns={columns} />
      </div>
    </div>
  );
}

export default App;
