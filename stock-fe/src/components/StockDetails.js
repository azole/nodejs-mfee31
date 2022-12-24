import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockDetails = () => {
  const [error, setError] = useState(null);
  const { stockId } = useParams();

  const [data, setData] = useState([]);
  // 用 []，component 第一次初始化的時候會跑到
  useEffect(() => {
    async function getData() {
      let response = await axios.get(`http://localhost:3001/api/stocks/${stockId}`);
      setData(response.data);
    }

    getData();
  }, []);

  return (
    <div>
      {error && <div>{error}</div>}
      <ul>
        <li
          style={{
            display: 'inline-block',
            margin: '2px',
            // backgroundColor: page === i ? '#00d1b2' : '',
            // borderColor: page === i ? '#00d1b2' : '#dbdbdb',
            // color: page === i ? '#fff' : '#363636',
            borderWidth: '1px',
            width: '28px',
            height: '28px',
            borderRadius: '3px',
            textAlign: 'center',
          }}
        >
          1
        </li>
      </ul>
      目前在第 1 頁
      {data.map((item) => {
        return (
          <div className="bg-white bg-gray-50 p-6 rounded-lg shadow m-6" key={item.date}>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">日期：{item.date}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交金額：{item.amount}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交股數： {item.volume}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">開盤價：{item.open_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">收盤價：{item.close_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">漲跌價差：{item.delta_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最高價：{item.high_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">最低價：{item.low_price}</h2>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">成交筆數：{item.transactions}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default StockDetails;
