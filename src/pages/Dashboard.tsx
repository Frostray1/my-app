import React, { useEffect, useState } from 'react';
import { Table, Tag, Space, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Dashboard.css';

const { confirm } = Modal;

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingClient, setEditingClient] = useState<DataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newClient, setNewClient] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataType[]>('http://localhost:5000/api/getClients', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (record: DataType) => {
    setEditingClient({
      ...record,
      tags: Array.isArray(record.tags) ? record.tags : (record.tags as unknown as string).split(', '),
    });
    setIsModalOpen(true);
  };

  const handleDelete = (record: DataType) => {
    confirm({
      title: 'Удаление клиента!',
      icon: <ExclamationCircleOutlined />,
      content: `Имя: ${record.name}`,
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/deleteClient/${record.key}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setData(data.filter(client => client.key !== record.key));
        } catch (error) {
          console.error('Error deleting client:', error);
        }
      },
    });
  };

  const handleAdd = () => {
    setNewClient({ key: '', name: '', age: 0, address: '', tags: [] });
    setIsAddModalOpen(true);
  };

  const handleAddOk = async () => {
    if (newClient) {
      try {
        await axios.post('http://localhost:5000/api/addClient', { ...newClient, tags: newClient.tags.join(', ') }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData([...data, { ...newClient, key: (data.length + 1).toString() }]);
        setIsAddModalOpen(false);
        setNewClient(null);
      } catch (error) {
        console.error('Error adding client:', error);
      }
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    setNewClient(null);
  };

  const handleOk = async () => {
    if (editingClient) {
      try {
        await axios.put(`http://localhost:5000/api/updateClient/${editingClient.key}`, editingClient, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setData(data.map(client => (client.key === editingClient.key ? editingClient : client)));
        setIsModalOpen(false);
        setEditingClient(null);
      } catch (error) {
        console.error('Error updating client:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingClient) {
      if (name === 'tags') {
        setEditingClient({ ...editingClient, tags: value.split(', ') });
      } else {
        setEditingClient({ ...editingClient, [name]: value });
      }
    } else if (newClient) {
      if (name === 'tags') {
        setNewClient({ ...newClient, tags: value.split(', ') });
      } else {
        setNewClient({ ...newClient, [name]: value });
      }
    }
  };

  const columns = [
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Возраст',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Адрес',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Теги',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: DataType) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <h1>Клиенты</h1>
      <div className="clients-add-btn">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} >
          Добавить клиента
        </Button>
      </div>

      <Table columns={columns} dataSource={data} loading={loading} />
      <Modal
        title="Изменить клиента"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Имя">
            <Input name="name" value={editingClient?.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Возраст">
            <Input name="age" value={editingClient?.age} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Адрес">
            <Input name="address" value={editingClient?.address} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Теги">
            <Input name="tags" value={editingClient?.tags.join(', ')} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Добавить клиента"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Имя">
            <Input name="name" value={newClient?.name} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Возраст">
            <Input name="age" value={newClient?.age} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Адрес">
            <Input name="address" value={newClient?.address} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Теги">
            <Input name="tags" value={newClient?.tags.join(', ')} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Dashboard;
