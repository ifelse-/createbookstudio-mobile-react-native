import React from 'react';
import LogoComponent from '../../components/LogoComponent';
import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { RiBook3Fill } from "react-icons/ri";
import { FaDollarSign } from "react-icons/fa";
import { MdSettingsInputComponent } from "react-icons/md";
import { HiMiniDocumentText } from "react-icons/hi2";
import { FaTrash } from "react-icons/fa6";
import { Sidebar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = () => {

    const style = {
        "root": {
            "base": "h-full",
            "collapsed": {
                "on": "w-16",
                "off": "w-64"
            },
            "inner": "h-full no-scrollbar overflow-y-auto overflow-x-hidden dark:text-white rounded-none border-gray-200 dark:border-white md:border-r bg-white py-4 px-3 dark:bg-black"
        }
    }

    const navigate = useNavigate();
    function redirectDashBoard() {
        navigate("/");
    }
    function redirectUsers() {
        navigate("/users");
    }
    function redirectCourses() {
        navigate("/courses");
    }
    function redirectPaid() {
        navigate("/paid");
    }
    function redirectContacts() {
        navigate("/contacts");
    }
    function redirectAdmins() {
        navigate("/admins");
    }
    function redirectTerms() {
        navigate("/editterms");
    }
    function redirectRefund() {
        navigate("/editrefund");
    }
    function redirectPrivacy() {
        navigate("/editprivacy");
    }
    function redirectBilling() {
        navigate("/editbilling");
    }
    function redirectCancel() {
        navigate("/editcancellation");
    }
    function redirectDelete() {
        navigate("/deletion");
    }


    return (
        <Sidebar
            theme={style}
            aria-label="Default sidebar example">
            <LogoComponent  />
            <Sidebar.Items className='mt-8'>
                <div className='flex flex-row items-center' onClick={redirectDashBoard}>
                    <MdSpaceDashboard size={18} />
                    <p className='font-bold text-base ml-2 '>DashBoard</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectUsers}>
                    <FaUsers size={18} />
                    <p className='font-bold text-base ml-2'>Users</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectCourses}>
                    <RiBook3Fill size={18} />
                    <p className='font-bold text-base ml-2'>Stories</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectPaid}>
                    <FaDollarSign size={18} />
                    <p className='font-bold text-base ml-2'>Paid Users</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectAdmins}>
                    <MdSettingsInputComponent size={18} />
                    <p className='font-bold text-base ml-2'>Admins</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectTerms}>
                    <HiMiniDocumentText  size={18} />
                    <p className='font-bold text-base ml-2'>Terms</p>
                </div>
                <div className='flex flex-row items-center mt-6'  onClick={redirectPrivacy}>
                    <HiMiniDocumentText  size={18} />
                    <p className='font-bold text-base ml-2'>Privacy</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectCancel}>
                    <HiMiniDocumentText  size={18} />
                    <p className='font-bold text-base ml-2'>Cancellation</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectDelete}>
                    <FaTrash  size={18} />
                    <p className='font-bold text-base ml-2'>Deletion</p>
                </div>
                <div className='flex flex-row items-center mt-6'  onClick={redirectRefund}>
                    <HiMiniDocumentText  size={18} />
                    <p className='font-bold text-base ml-2'>Refund</p>
                </div>
                <div className='flex flex-row items-center mt-6' onClick={redirectBilling}>
                    <HiMiniDocumentText  size={18} />
                    <p className='font-bold text-base ml-2'>Subscription & Billing</p>
                </div>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default AdminSidebar;
