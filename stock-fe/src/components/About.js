import { useEffect } from 'react';
import axios from 'axios';

const About = () => {
  useEffect(() => {
    async function getMember() {
      let response = await axios.get('http://localhost:3001/api/members', {
        withCredentials: true,
      });
      console.log(response.data);
    }
    getMember();
  }, []);

  return (
    <div className="m-7">
      <h2 className="m-7 text-2xl text-gray-600">這裡是魚股市</h2>
      <h3>Hi, 賴小賴</h3>
      <img />
    </div>
  );
};

export default About;
