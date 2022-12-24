import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-gray-600 m-7">
      <h2 className="text-2xl font-bold mb-3">很抱歉</h2>
      <p className="text-xl font-bold mb-3">本頁不存在</p>
      <Link to="/" className="bg-purple-200 px-3 py-1.5 rounded hover:bg-purple-300">
        回首頁
      </Link>
    </div>
  );
};

export default NotFound;
