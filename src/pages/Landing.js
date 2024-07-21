import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserPlus, faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from 'react-router-dom';

function Landing() {
    return (
        <div>
            <div className="brand text-center">
                <span className="brand-text m-auto">PetMediConnect</span>
            </div>


            <div className='flex flex-col mt-20 items-center gap-3'>

                <div className='flex flex-row gap-3'>
                    <Link to="/register" className="text-yellow-500 border-b-2  border-yellow-500">  <div className='flex flex-col border-2 rounded-lg p-16 hover:opacity-50 hover:cursor-pointer'>
                        <button>
                            <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                        <span>Sign Up</span>
                    </div></Link>


                    <Link to="/login" className="text-yellow-500 border-b-2  border-yellow-500">  <div className='flex flex-col border-2 rounded-lg p-16 hover:cursor-pointer hover:opacity-50'>
                        <button>
                            <FontAwesomeIcon icon={faUser} />
                        </button>
                        <span className='text-center justify-center'>Sign In</span>
                    </div></Link>


                </div>
                <div className='flex flex-row'>
                    <Link to="/doctorLogin" className="text-yellow-500 border-b-2  border-yellow-500">  <div className='flex flex-col border-2 rounded-lg p-16 hover:cursor-pointer hover:opacity-50'>
                        <button >
                            <FontAwesomeIcon className='text-2xl' icon={faUserDoctor} />
                        </button>
                        <span className='text-center justify-center text-yellow-500'>Login as doctor</span>
                    </div>
                    </Link>


                </div>

            </div>
        </div>
    );
}

export default Landing;