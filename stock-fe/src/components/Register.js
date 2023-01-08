import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [member, setMember] = useState({
    email: 'ashleylai58@gmail.com',
    name: 'ashley',
    password: 'test1234',
    confirmPassword: 'test1234',
    photo: '',
  });

  // email input 的 change
  // e.target ==> email input
  // name input 的 change
  // e.target ==> name input
  function handleChange(e) {
    // console.log(e);
    let newMember = { ...member };
    newMember[e.target.name] = e.target.value;
    setMember(newMember);

    // setMember({ ...member, [e.target.name]: e.target.value });
  }

  function handleUpload(e) {
    // file input 的值並不是存在 value 欄位裡
    setMember({ ...member, photo: e.target.files[0] });
  }

  async function handleSubmit(e) {
    console.log('handleSubmit');
    // 關閉表單的預設行為
    e.preventDefault();
    // 作法1: 沒有檔案的表單
    // ajax
    // let response = await axios.post('http://localhost:3001/api/auth/register', member);
    // 作法2: 有檔案的表單
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData
    let formData = new FormData();
    formData.append('email', member.email);
    formData.append('name', member.name);
    formData.append('password', member.password);
    formData.append('confirmPassword', member.confirmPassword);
    formData.append('photo', member.photo);
    let response = await axios.post('http://localhost:3001/api/auth/register', formData);
    console.log(response.data);
  }

  return (
    <form className="bg-purple-100 h-screen md:h-full md:my-20 md:mx-16 lg:mx-28 xl:mx-40 py-16 md:py-8 px-24 text-gray-800 md:shadow md:rounded flex flex-col md:justify-center">
      <h2 className="flex justify-center text-3xl mb-6 border-b-2 pb-2 border-gray-300">註冊帳戶</h2>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          Email
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="email"
          name="email"
          value={member.email}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="name" className="flex mb-2 w-32">
          姓名
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="text"
          id="name"
          name="name"
          value={member.name}
          onChange={handleChange}
        />
      </div>
      <div className="mb-4 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-16">
          密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="password"
          name="password"
          value={member.password}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="password" className="flex mb-2 w-32">
          確認密碼
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={member.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <div className="mb-8 text-2xl">
        <label htmlFor="photo" className="flex mb-2 w-32">
          圖片
        </label>
        <input
          className="w-full border-2 border-purple-200 rounded-md h-10 focus:outline-none focus:border-purple-400 px-2"
          type="file"
          id="photo"
          name="photo"
          onChange={handleUpload}
        />
      </div>
      <button className="text-xl bg-indigo-300 px-4 py-2.5 rounded hover:bg-indigo-400 transition duration-200 ease-in" onClick={handleSubmit}>
        註冊
      </button>
    </form>
  );
};

export default Register;
