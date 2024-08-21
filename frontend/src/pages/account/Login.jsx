import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    fetchData();
    return navigate('/');
  }

  const fetchData = async () => {
    const userCred = {
      email, password
    }

    const header = {'Content-Type': 'application/json'};
    const url = `http://localhost:5000/api/v1/auth/login`;
    const res = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(userCred),
    });

    console.log(res);

    if (res.ok === false) {
      throw new Error('Network response was not ok');
    }

    const authToken = await res.json();
    document.cookie = `AUTH_API=${authToken.token}`;
    document.cookie = `USR_FNAME=${authToken.firstName}`;
    document.cookie = `USR_LNAME=${authToken.lastName}`;
    document.cookie = `USR_EMAIL=${authToken.email}`; 
  }

  return (
    <section className="bg-base py-8 antialiased dark:bg-base-900 md:py-12">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto my-20 py-5">
            <div className="relative z-0 w-full mb-5 group">
                <input type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setEmail(e.target.value)} required />
                <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setPassword(e.target.value)} required />
                <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
                <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me!</label>
            </div>
            <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none hfocus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-blue-800">Login</button>
        </form>
    </section>
  )
}
