import React, { useState } from 'react';

const DoctorDetail = () => {




    return (
        <div>
            <form >
                <div className='flex flex-col gap-3 content-center'>
                    <input placeholder='Select Day' />
                    <div className='flex flex-row gap-2 flex-wrap'>
                        <input placeholder='Start Time' />
                        <input placeholder='End time' />
                    </div>
                    <button>Add</button>
                </div>


            </form>
        </div>
    );
};

export default DoctorDetail;