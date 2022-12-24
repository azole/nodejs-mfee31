import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Stock = () => {
  const [error, setError] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [counter, setCounter] = useState(0);

  console.log('outside');

  useEffect(() => {
    console.log('沒有第二個參數');
  });

  useEffect(() => {
    console.log('第二個參數是空陣列');
    // 在 component 初始化的時候跑一次
    // 通常會把去跟後端要資料的動作放在這裡
    async function getStocks() {
      let response = await axios.get('http://localhost:3001/api/stocks');
      setStocks(response.data);
    }
    getStocks();
  }, []);

  useEffect(() => {
    console.log('第二個參數是counter');
  }, [counter]);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

      <button
        onClick={() => {
          setCounter(counter + 1);
        }}
      >
        add {counter}
      </button>

      {stocks.map((stock, index) => {
        return (
          <div key={stock.id} className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
            <Link to={`/stock/${stock.id}`}>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{stock.id}</h2>
              <p className="text-gray-700">{stock.name}</p>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Stock;
