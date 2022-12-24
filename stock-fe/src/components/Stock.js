import { Link } from 'react-router-dom';
import { useState } from 'react';

const Stock = () => {
  const [error, setError] = useState(null);

  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

      <div className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
        <Link to={'/stock/1234'}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">股票代碼</h2>
          <p className="text-gray-700">股票名稱</p>
        </Link>
      </div>
    </div>
  );
};

export default Stock;
