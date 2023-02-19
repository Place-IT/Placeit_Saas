import React, {useEffect} from 'react';
import undraw_Alert_re_j2op from "./../../assets/images/undraw_Alert_re_j2op.png"
import {logdata} from "../../CommonFunctions/Logger/Logevents";
export default function Empty_feed_component(props)
{
    useEffect(() => {
        logdata("Empty_feed_component","init",`Empty_feed_component props:${props} `)
    });

    return<>
    <section class="text-gray-500">
        <div
            className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            <div
                className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                <h1 className="text-4xl font-medium leading-none sm:text-6xl text-violet-800">
                    There is nothing to show...
                </h1>
                <div
                    className="mt-4 flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                    <a rel="noopener noreferrer" href="#"
                       className="px-8 py-3 text-lg font-semibold rounded-full bg-violet-800 text-white">
                        <i className='bx bx-arrow-back'></i>
                        Home
                    </a>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                <img src={undraw_Alert_re_j2op} alt=""
                     className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"></img>
            </div>
        </div>
</section>

    </>
}