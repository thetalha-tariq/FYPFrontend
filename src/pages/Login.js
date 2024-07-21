import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from '../Store/Slice/UserSlice'
import img from "../Images/img 4.jpg"
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(authenticateUser(formData))
        .then(() => {
          if (localStorage.getItem('token') && localStorage.getItem('role') === 'customer' && localStorage.getItem('isAuthenticated'))
            // console.log("heyy")
            navigate('/product')

        })

    } catch (error) {
      toast.error("Something went wrong", { duration: 1000 }); // Set duration to 1000 milliseconds (1 second)
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission
  //   console.log(formData);
  // };
  const { user } = useSelector((state) => state.user)
  console.log("user is >>>>>>>>>>>>>>>", user)
  return (
    // <div className="flex flex-col items-center bg-yellow-300 h-screen">
    //   <h1 className="text-2xl py-4 font-bold">Login Form</h1>
    //   <form className="w-1/2 mx-auto" onSubmit={onSubmit}>
    //     <div className="relative z-0 w-full mb-5 group">
    //       <input
    //         type="email"
    //         name="email"
    //         id="floating_email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder=" "
    //         required
    //       />
    //       <label
    //         htmlFor="floating_email"
    //         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
    //       >
    //         Email address
    //       </label>
    //     </div>
    //     <div className="relative z-0 w-full mb-5 group">
    //       <input
    //         type="password"
    //         name="password"
    //         id="floating_password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    //         placeholder=" "
    //         required
    //       />
    //       <label
    //         htmlFor="floating_password"
    //         className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    //       >
    //         Password
    //       </label>
    //     </div>
    //     <button type="submit" className="bg-white hover:font-bold text-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    //   </form>
    //   <Link to="/register" className="text-blue-700 border-b-2  border-blue-700"> Click Here to Register</Link>
    // </div>
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="bg-white w-full mt-16 md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6" onSubmit={onSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="floating_email"
                value={formData.email}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
              >
                Email address
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                value={formData.password}
                onChange={handleChange}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full block bg-yellow-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-6">
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-300 w-full" />


          <p className="mt-8">Need an account? <a href="/register" className="text-blue-500 hover:text-blue-700 font-semibold">Create an account</a></p>
        </div>
      </div>
    </section>

  );
}

export default Login;
