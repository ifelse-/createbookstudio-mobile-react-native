import React, { useEffect } from 'react';
import { Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { serverURL } from '../../constants';
import axios from 'axios';
import { toast } from 'react-toastify';

const AdminHead = () => {

    const navigate = useNavigate();
    function redirectHome() {
        navigate("/signin");
    }

    useEffect(() => {
        if (!sessionStorage.getItem('auth')) {
            redirectHome();
        }
    }, []);

    const showToast = async (msg) => {
        toast(msg, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
      }

    function logout(){
        sessionStorage.clear();
        showToast('Logout Successful');
        redirectHome();
    }

    return (
        <Navbar fluid className='py-5 dark:bg-black bg-white border-black dark:text-white dark:border-white'>
            <p className='font-black text-xl'>Admin Panel</p>
            <Navbar.Collapse>
                <Navbar.Link className='border-b-0 text-black  font-medium dark:text-white  hover:bg-white dark:hover:bg-black hover:text-black md:hover:text-black dark:hover:text-white dark:md:hover:text-white' style={{ paddingLeft: '0px', paddingRight: '0px' }} onClick={logout} >Logout</Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdminHead;