import React, { useState } from 'react';
import { List, Button, Typography, Modal, Input, Rate } from 'antd';
import 'antd/dist/reset.css';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';

function OrderList() {
  const [data, setData] = useState([
    {
      id: 1,
      title: '百香果汁',
      style: '创意菜',
      price: '￥18.9',
      image: image1,
      evaluated: false,
      evaluationText: '',
      score: 0,
    },
    {
      id: 2,
      title: '薯条',
      style: '油炸食品',
      price: '￥8.9',
      image: image2,
      evaluated: false,
      evaluationText: '',
      score: 0,
    },

  ]);

  const [visible, setVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [currentEvaluation, setCurrentEvaluation] = useState('');

  const handleEvaluate = item => {
    setCurrentItem(item);
    setCurrentScore(item.score);
    setCurrentEvaluation(item.evaluationText);
    setVisible(true);
  };

  const handleOk = () => {
    setData(data.map(item =>
      item.id === currentItem.id ? { ...item, evaluated: true, score: currentScore, evaluationText: currentEvaluation } : item
    ));
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = value => {
    setCurrentScore(value);
  };

  const handleEvaluationChange = e => {
    setCurrentEvaluation(e.target.value);
  };

  return (
    <div>
      <List
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.image} alt={item.title} style={{ width: '100px', height: '100px', marginRight: '20px' }} />
                <div>
                  <div>
                    <Typography.Text strong style={{ fontSize: '20px' }}>{item.title}</Typography.Text>
                  </div>
                  <div>
                    <Typography.Text type="secondary">{item.style}</Typography.Text>
                  </div>
                  <div>
                    <Typography.Text type="secondary">{item.price}</Typography.Text>
                  </div>
                </div>
              </div>
              {item.evaluated ? (
                <Button type="default" onClick={() => handleEvaluate(item)}>
                  已评价
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'red', color: 'white', border: 'none' }} onClick={() => handleEvaluate(item)}>
                  评价
                </Button>
              )}
            </div>
          </List.Item>
        )}
      />

      <Modal
        title="评价"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>评分:</p>
        <Rate onChange={handleChange} value={currentScore} disabled={currentItem?.evaluated} />
        <p>评价:</p>
        <Input.TextArea onChange={handleEvaluationChange} value={currentEvaluation} readOnly={currentItem?.evaluated} />
      </Modal>
    </div>
  );
}

export default OrderList;
