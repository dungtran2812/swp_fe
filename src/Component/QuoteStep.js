import React, { useState, useEffect } from 'react';
import { Button, Steps, message, Dropdown, Menu } from 'antd';
import ProductQuotePage from './ProductQuotePage';
import RawMaterialQuotePage from './RawMaterialQuotePage';
import BookingForm from './BookingForm';
import RoomAreaForm from './RoomAreaForm';
import axios from 'axios';

const QuoteStep = () => {
  const [validProject, setValidProject] = useState(null)
  const [roomId, setRoomId] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [projectId, setProjectId] = useState(null);
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState([
    {
      title: 'Nhập Thông Tin Dự Án',
      content: <BookingForm setProjectId={setProjectId} />,
    },
  ]);
  const [dropdownMenu, setDropdownMenu] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('https://furniture-quote.azurewebsites.net/room/getAllRoom', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          }
        });
        
        if (response.status === 200) { 
          const rooms = response.data.data;
          const menuItems = rooms.map(room => (
            <Menu.Item key={room.id} onClick={() => handleRoomSelection(room.id, room.name)}>
              {room.name}
            </Menu.Item>
          ));
          const menu = <Menu>{menuItems}</Menu>;
          setDropdownMenu(menu);
        } else {
          throw new Error('Failed to fetch rooms');
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (projectId !== null && roomId !== null && roomName !== null) {
      addStep(roomId, roomName);
    }
  }, [projectId, roomId, roomName]);
  
  const handleRoomSelection = (id, name) => {
    setRoomId(id);
    setRoomName(name);
    
  };
  
  const addStep = (roomId, roomName) => {
    const newStep = {
      title: roomName,
      content: (
        <>
          <RoomAreaForm projectId={projectId} roomId={roomId} />
          <ProductQuotePage resetData />
          <RawMaterialQuotePage resetData />
        </>
      ),
    };
    setSteps([...steps, newStep]); // Append the new step
  };

  const resetSteps = () => {
    setSteps([
      {
        title: 'Nhập Thông Tin Dự Án',
        content: <BookingForm setProjectId={setProjectId} />,
      },
    ]);
    setCurrent(0); // Reset current step index
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    marginTop: 16,
  };

  return (
    <>
      <Steps current={current} items={steps.map(step => ({ key: step.title, title: step.title }))} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Previous
          </Button>
        )}
        {dropdownMenu && (
          <Dropdown overlay={dropdownMenu}>
            <Button>Thêm Phòng</Button>
          </Dropdown>
          
        )}
        
        <Button onClick={resetSteps}>Tạo Lại</Button>
      </div>
    </>
  );
};

export default QuoteStep;