import { Link, NavLink } from 'react-router-dom';
import Logo from '../img/fish.png';

const Navbar = () => {
  return (
    <nav className="bg-indigo-100 px-10 py-3 flex justify-between items-center sticky shadow">
      <Link to={'/'}>
        <div className="flex items-center cursor-pointer">
          <img src={Logo} width="50" alt="Logo" className="mr-2" />
          <span className="text-2xl text-gray-700 text-opacity-70">魚股市</span>
        </div>
      </Link>

      <div className="flex items-center ">
        <NavLink
          to="/"
          className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90"
          activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}
        >
          股票
        </NavLink>
        <NavLink
          to="/about"
          className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90"
          activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}
        >
          關於
        </NavLink>
        {/* 登入後顯示的 */}
        Hi, 賴小賴
        <img style={{ width: '80px' }} />
        <Link
          to="/about"
          className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90"
        >
          登出
        </Link>
        {/* 登入前顯示的 */}
        <NavLink
          to="/login"
          className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90"
          activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}
        >
          登入
        </NavLink>
        <NavLink
          to="/register"
          className="text-xl text-gray-700 text-opacity-70 mx-3 md:mx-6 hover:text-opacity-90"
          activestyle={{ fontWeight: 'bold', color: '#3B82F6' }}
        >
          註冊
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
