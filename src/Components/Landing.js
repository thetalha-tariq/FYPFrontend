import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from 'react-router-dom';

function Landing() {
    return (
        <div className='flex flex-col min-h-screen justify-center items-center gap-3'>
            <div className='flex flex-row gap-3'>
                <Link to="/register" className="text-blue-700 border-b-2  border-blue-700">  <div className='flex flex-col border-2 rounded-lg p-16 hover:opacity-50 hover:cursor-pointer'>
                    <button>
                        <FontAwesomeIcon icon={faUserPlus} />
                    </button>
                    <span>Sign Up</span>
                </div></Link>


                <Link to="/login" className="text-blue-700 border-b-2  border-blue-700">  <div className='flex flex-col border-2 rounded-lg p-16 hover:cursor-pointer hover:opacity-50'>
                    <button>
                        <FontAwesomeIcon icon={faUser} />
                    </button>
                    <span className='text-center justify-center'>Sign In</span>
                </div></Link>


            </div>
            <div className='flex flex-row'>
                <Link to="/DocLog" className="text-blue-700 border-b-2  border-blue-700">  <div className='flex flex-col border-2 rounded-lg p-16 hover:cursor-pointer hover:opacity-50'>
                    <button >
                        <FontAwesomeIcon className='text-2xl' icon={faUserDoctor} />
                    </button>
                    <span className='text-center justify-center'>Login as doctor</span>
                </div>
                </Link>


            </div>

        </div>
    );
}

export default Landing;
