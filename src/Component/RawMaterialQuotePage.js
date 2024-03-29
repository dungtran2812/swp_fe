import React, { useContext, useEffect, useState } from 'react';
import { Button, InputNumber, Select, Table, Popconfirm, Typography, Input, message } from 'antd';
import axios from 'axios';
import Title from 'antd/es/typography/Title';
import { QuoteContext } from '../Context/QuoteContext';

const RawMaterialQuotePage = (props) => {
  const { quoteId, setQuoteId } = useContext(QuoteContext);
  const [rawMaterial, setRawMaterial] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/rawMaterial/getAllRawMaterial?page=0&size=23&sort=id', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        if (response.status === 200) {
          setRawMaterial(response.data.data.content);
        } else {
          throw new Error('Network response was not ok');
        }
      } catch (error) {
        console.error('There was a problem with the request:', error);
      }
    };
    fetchData();
  }, [props]);

  const handleDelete = (key) => {
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count.toString(),
      id: '',
      RawMaterial: '',
      M2: '',
      pricePerM2: '',
      TotalCost: '',

    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = dataSource.map((item) => {
      if (item.key === row.key) {
        const totalCost = (row.M2 || 0) * (row.pricePerM2 || 0);
        return { ...item, ...row, TotalCost: totalCost };
      }
      return item;
    });
    setDataSource(newData);
  };

  const handleRawMaterialChange = (value, key) => {

    const newData = dataSource.map((item) => {
      if (item.key === key) {
        const selectedRawMaterial = rawMaterial.find(f => f.name === value);

        const totalCost = (item.M2 || 0) * (selectedRawMaterial?.pricePerM2 || 0);
        return {
          ...item,
          id: selectedRawMaterial.id,
          RawMaterial: value,
          pricePerM2: selectedRawMaterial?.pricePerM2 || '',
          TotalCost: totalCost
        };
      }
      return item;
    });
    setDataSource(newData);

  };
  const handleSubmit = () => {

    try {
      dataSource.map(async (rawMaterial) => {
        if (rawMaterial.id) {

          const response = await axios.post('https://furniture-quote.azurewebsites.net/quoteDetail/rawMaterial/createQuoteDetail',
            {
              quoteId: quoteId,
              area: rawMaterial.M2,
              rawMaterialId: rawMaterial.id
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
              }
            });
          console.log(response)
          if (response.status === 200) {
            message.success('Lưu Vật Liệu Thô Thành Công')
          } else {
            message.error('Lưu Vật Liệu Thô Thất Bại')
          }
        } else {
          message.error('Chưa Chọn Vật Liệu Thô !')
        }
      })
    } catch (error) {
      console.error('Lưu Nội Thất Phòng Thất Bại', error);
    }




  }

  const columns = [
    {
      title: 'Vật Liệu Thô',
      dataIndex: 'RawMaterial',
      width: '10%',
      render: (_, record) => (
        <Select

          showSearch
          placeholder="Select a RawMaterial"
          optionFilterProp="children"
          //key là tên ko phải id
          onChange={(value) => handleRawMaterialChange(value, record.key)}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          options={rawMaterial.map(option => ({ value: option.name, label: option.name }))}
          style={{ width: "100%" }}
        />
      ),
    },
    {
      title: 'pricePerM2', dataIndex: 'pricePerM2', width: '5%'
      , render: (text) => (
        <span>{parseInt(text).toLocaleString('vi-VN')} VND</span>
      ),
    },
    {
      title: 'M2',
      dataIndex: 'M2',
      width: '5%',
      render: (_, record) => (
        <InputNumber
          min={1}
          defaultValue={record.M2}
          onChange={(value) => handleSave({ ...record, M2: value })}
        />
      ),
    },


    {
      title: 'Tổng Tiền',
      dataIndex: 'TotalCost',
      width: '10%',
      render: (text) => (

        <span>{parseInt(text).toLocaleString('vi-VN')} VND</span>
      ),
    },
    {
      title: 'Chức Năng',
      dataIndex: 'operation',
      render: (_, record) => (
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            Delete
          </Popconfirm>
        ) : null
      ),
    },
  ];

  useEffect(() => {

    setDataSource([]);
    setCount(0);

  }, [props]);
  return (
    <div className='table-container'>
      <div className='quotetable-title'>
        <Title level={2}>Bảng Tạm Tính Giá Phần Vật Liệu Thô</Title>
        <Button
          onClick={handleAdd}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Thêm Sản Phẩm
        </Button>
      </div>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        rowKey="key"
      />
      <Button
        onClick={handleSubmit}
        type="primary"
       
      >
        Lưu Vật Liệu Thô
      </Button>

    </div>

  );
};

export default RawMaterialQuotePage;
