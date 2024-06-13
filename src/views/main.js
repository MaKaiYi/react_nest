import {
  Button,
  Table,
  Space,
  message,
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  Pagination,
} from 'antd';
import '../App.css';

import {
  createUser,
  getUserList,
  updateUserById,
  deleteUserById,
} from '../api/user';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
function Main() {
  const messageApi = message;
  const [form] = Form.useForm();
  const [queryForm, setQueryForm] = useState({
    name: '',
    sex: '男',
    createTime: null,
    updateTime: null,
    id: '',
  });
  const [pageInfo, setPageInfo] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  const updatePageInfo = (key, value) => {
    setPageInfo((prevPageInfo) => ({
      ...prevPageInfo,
      [key]: value,
    }));
  };
  // 分页切换
  const onPageChange = (value) => {
    updatePageInfo('page', value);
  };
  const onPageSizeChage = (page, pageS) => {
    updatePageInfo('pageSize', pageS);
  };
  // 当pageInfo.page发生变化时调用handleGetUserList
  useEffect(() => {
    handleGetUserList();
  }, [pageInfo.page, pageInfo.pageSize]);

  const handleDateChange = (date, dateString, fieldName) => {
    setQueryForm({
      ...queryForm,
      [fieldName]: dayjs(date).format('YYYY-MM-DD HH:mm:ss'), // 更新指定的日期字段
    });
  };

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'age',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_, record) => (
        <Space size="middle">
          <span>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        </Space>
      ),
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (_, record) => (
        <Space size="middle">
          <span>{dayjs(record.updateTime).format('YYYY-MM-DD HH:mm:ss')}</span>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleDeleteUser(record.id)}>Delete</a>
          <a onClick={() => handleEditUser(record)}>Edit</a>
        </Space>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const handleGetUserList = async () => {
    let params = {
      page: pageInfo.page,
      pageSize: pageInfo.pageSize,
    };
    const { data, success, message } = await getUserList(params);

    if (success && data) {
      updatePageInfo('total', data.total);
      setData(
        data.data.map((item) => {
          return {
            ...item,
            key: item.id,
          };
        })
      );
    } else {
      messageApi.error(message);
    }
  };
  useEffect(() => {
    console.log(queryForm);
  }, [queryForm]);
  const handleEditUser = async (row) => {
    setQueryForm({
      ...row,
      createTime: row.createTime
        ? dayjs(row.createTime).format('YYYY-MM-DD HH:mm:ss')
        : null,
      updateTime: row.updateTime
        ? dayjs(row.updateTime).format('YYYY-MM-DD HH:mm:ss')
        : null,
    });

    // 使用 form.setFieldsValue 同步到表单中
    form.setFieldsValue({
      ...row,
      createTime: row.createTime ? dayjs(row.createTime) : null,
      updateTime: row.updateTime ? dayjs(row.updateTime) : null,
    });
    setIsModalOpen(true);
  };
  const { confirm } = Modal;
  const handleDeleteUser = async (id) => {
    confirm({
      title: '提示',
      content: '是否要删除当前数据',
      onOk: async () => {
        const { success } = await deleteUserById(id);
        if (success) {
          handleGetUserList();
          messageApi.success('操作成功');
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      let params = {
        ...queryForm,
      };
      delete params.key;
      let { success } = params.id
        ? await updateUserById(params.id, params)
        : await createUser(params);
      if (success) {
        form.resetFields();
        handleGetUserList();
        setIsModalOpen(false);
        messageApi.success('操作成功');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const cleanToken = () => {
    localStorage.clear();
    handleGetUserList();
  };

  return (
    <div className="App">
      <Space
        style={{ display: 'flex', justifyContent: 'end', marginRight: 150 }}
      >
        {' '}
        <Button type="primary" onClick={showModal}>
          创建用户
        </Button>
        <Button onClick={cleanToken}>清楚token</Button>
      </Space>

      <div className="ly_8">
        <Table dataSource={data} columns={columns} pagination={false} />
        <div style={{ display: 'flex', justifyContent: 'end', marginTop: 30 }}>
          {' '}
          <Pagination
            current={pageInfo.page}
            onChange={onPageChange}
            onShowSizeChange={onPageSizeChage}
            total={pageInfo.total}
            pageSize={pageInfo.pageSize}
          />
        </div>
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered={true}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          variant="filled"
          form={form}
          style={{ maxWidth: 600, paddingTop: 30 }}
        >
          <Form.Item
            label="姓名"
            name="name"
            rules={[{ required: true, message: '姓名不能为空!' }]}
          >
            <Input
              name="name"
              value={queryForm.name}
              onChange={(e) =>
                setQueryForm((prevForm) => ({
                  ...prevForm,
                  name: e.target.value,
                }))
              }
            />
          </Form.Item>
          <Form.Item label="性别">
            <Radio.Group
              value={queryForm.sex}
              name="sex"
              onChange={(e) =>
                setQueryForm((prevForm) => ({
                  ...prevForm,
                  sex: e.target.value,
                }))
              }
            >
              <Radio value="男"> 男 </Radio>
              <Radio value="女"> 女 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="创建日期:"
            name="createTime"
            rules={[{ required: true, message: '日期不能为空!' }]}
          >
            <DatePicker
              value={queryForm.createTime}
              name="createTime"
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, 'createTime')
              }
            />
          </Form.Item>
          <Form.Item
            label="更新日期:"
            name="updateTime"
            rules={[{ required: true, message: '日期不能为空!' }]}
          >
            <DatePicker
              value={queryForm.updateTime}
              name="updateTime"
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, 'updateTime')
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Main;
