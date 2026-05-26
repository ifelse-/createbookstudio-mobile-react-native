import { Card } from 'flowbite-react';
import React from 'react';
import { FaUsers } from "react-icons/fa";
import { RiBook3Fill } from "react-icons/ri";
import { RiRepeat2Fill } from "react-icons/ri";
import { FaMoneyBillWaveAlt } from "react-icons/fa";

const DashboardCards = ({ datas }) => {

    const style = {
        "root": {
            "base": "w-1/5 max-lg:w-1/4 max-sm:w-2/4 flex rounded-md bg-black shadow-none dark:bg-white m-4",
            "children": "flex max-md:h-24 h-40 flex-col justify-center gap-3 p-5",
            "horizontal": {
                "off": "flex-col",
                "on": "flex-col md:max-w-xl md:flex-row"
            },
            "href": "hover:bg-white dark:hover:bg-black"
        },
        "img": {
            "base": "",
            "horizontal": {
                "off": "rounded-none",
                "on": "h-96 w-full rounded-none object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            }

        }
    }

    return (
        <div className='flex flex-col'>
            <div className='my-4 flex flex-wrap items-center justify-center'>
                <Card key={1} theme={style}>
                    <h5 className='text-base max-lg:text-sm font-normal tracking-tight  text-white dark:text-black'>
                        Users
                    </h5>
                    <div className='flex flex-row items-center'>
                        <FaUsers className='text-3xl max-lg:text-2xl max-sm:text-xl text-white dark:text-black' />
                        <p className='font-black max-lg:text-xl text-2xl pl-3 text-white dark:text-black'>{datas.users}</p>
                    </div>
                </Card>
                <Card key={2} theme={style}>
                    <h5 className='text-base max-lg:text-sm font-normal tracking-tight text-white dark:text-black'>
                        Stories
                    </h5>
                    <div className='flex flex-row items-center'>
                        <RiBook3Fill className='text-3xl max-lg:text-2xl max-sm:text-xl text-white dark:text-black' />
                        <p className='font-black max-lg:text-xl text-2xl pl-3 text-white dark:text-black'>{datas.courses}</p>
                    </div>
                </Card>
                <Card key={3} theme={style}>
                    <h5 className='text-base max-lg:text-sm font-normal tracking-tight text-white dark:text-black'>
                        Recurring Revenue
                    </h5>
                    <div className='flex flex-row items-center'>
                        <RiRepeat2Fill className='text-3xl max-lg:text-2xl max-sm:text-xl text-white dark:text-black' />
                        <p className='font-black max-lg:text-xl text-2xl pl-3 text-white dark:text-black'>${datas.sum}</p>
                    </div>
                </Card>
                <Card key={4} theme={style}>
                    <h5 className='text-base max-lg:text-sm font-normal tracking-tight text-white dark:text-black'>
                        Total Revenue
                    </h5>
                    <div className='flex flex-row items-center'>
                        <FaMoneyBillWaveAlt className='text-3xl max-lg:text-2xl max-sm:text-xl text-white dark:text-black' />
                        <p className='font-black max-lg:text-xl text-2xl pl-3 text-white dark:text-black'>${datas.total}</p>
                    </div>
                </Card>
            </div>
        </div>

    );
};

export default DashboardCards;
