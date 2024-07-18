import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Orders.css';

const { confirm } = Modal;

interface OrderType {
  key: string;
  orderNumber: string;
  client: string;
  total: number;
  status: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingOrder, setEditingOrder] = useState<OrderType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newOrder, setNewOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<OrderType[]>('http://localhost:5000/api/getOrders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (record: OrderType) => {
    setEditingOrder(record);
    setIsModalOpen(true);
  };

  const handleDelete = (record: OrderType) => {
    confirm({
      title: 'Удалить заказ?',
      icon: <ExclamationCircleOutlined />,
      content: `Номер заказа: ${record.orderNumber}`,
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:5000/api/deleteOrder/${record.key}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          setOrders(orders.filter(order => order.key !== record.key));
        } catch (error) {
          console.error('Error deleting order:', error);
        }
      },
    });
  };

  const handleAdd = () => {
    setNewOrder({ key: '', orderNumber: '', client: '', total: 0, status: '' });
    setIsAddModalOpen(true);
  };

  const handleAddOk = async () => {
    if (newOrder) {
      try {
        await axios.post('http://localhost:5000/api/addOrder', newOrder, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders([...orders, { ...newOrder, key: (orders.length + 1).toString() }]);
        setIsAddModalOpen(false);
        setNewOrder(null);
      } catch (error) {
        console.error('Error adding order:', error);
      }
    }
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    setNewOrder(null);
  };

  const handleOk = async () => {
    if (editingOrder) {
      try {
        await axios.put(`http://localhost:5000/api/updateOrder/${editingOrder.key}`, editingOrder, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(orders.map(order => (order.key === editingOrder.key ? editingOrder : order)));
        setIsModalOpen(false);
        setEditingOrder(null);
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingOrder) {
      setEditingOrder({ ...editingOrder, [e.target.name]: e.target.value });
    } else if (newOrder) {
      setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    }
  };

  const columns = [
    {
      title: 'Номер заказа',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Клиент',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Сумма',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '',
      key: 'action',
      render: (text: any, record: OrderType) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
        </Space>
      ),
    },
  ];

  return (
    <div className="orders-container">
      <h1>Заказы</h1>
      <div className="orders-add-btn">
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} >
            Добавить заказ
        </Button>
      </div>
      <Table columns={columns} dataSource={orders} loading={loading} />
      <Modal
        title="Редактирование заказа"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Номер заказа">
            <Input name="orderNumber" value={editingOrder?.orderNumber} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Клиент">
            <Input name="client" value={editingOrder?.client} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Сумма">
            <Input name="total" value={editingOrder?.total} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Статус">
            <Input name="status" value={editingOrder?.status} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Создание заказа"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Номер заказа">
            <Input name="orderNumber" value={newOrder?.orderNumber} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Клиент">
            <Input name="client" value={newOrder?.client} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Сумма">
            <Input name="total" value={newOrder?.total} onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Статус">
            <Input name="status" value={newOrder?.status} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
