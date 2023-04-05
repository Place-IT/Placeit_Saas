import React, {Component, useEffect, useState} from "react";
import {Autocomplete} from "@mui/lab";
import {TextField} from "@mui/material";


export default function Question(props)
{

    return<>


        <div id="container">
            <div className="border-2 border-gray-300 m-4 bg-white rounded p-4">
                <div className="flex justify-center items-center flex-col ">
                    <div className="py-4 text-xl font-bold w-full md:w-1/2 bg-white">
                        Specify your Requirement
                    </div>
                    {props.create?
                        <select
                            className="text-sm font-bold rounded-lg border-2 border-purple-700 text-gray-600 w-full md:w-1/2
                        px-4 py-2 bg-white hover:border-gray-400 focus:outline-none appearance-none
                        "
                            value={props.data.type}
                            onChange={ev=>props.HandleQuestionUpdate(props.keys,"type",ev.target.value)}
                        >
                            <option value="" disabled selected hidden>Source of Data</option>
                            <option value="E"> User Extracted</option>
                            <option value={"UA"}> User Entered</option>
                        </select>

                        :
                        <input
                            disabled={!props.create}
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                            placeholder="Enter the Post Expiration date Time"
                            value={(()=>{
                                if(props.data.type === "E") {
                                    return "User Extracted"
                                }else if(props.data.type === "UA")
                                {
                                    return "User Entered"
                                }
                                return ""

                            })()}
                            // onChange={ev=>setData({...data,expire_date_time: ev.target.value})}

                        />

                    }



                    <div className="py-4 text-xl font-bold w-full md:w-1/2 bg-white">
                        Enter your Question
                    </div>
                    <div className="w-full -mt-4 md:w-1/2">
                        <label htmlFor=""
                               className="block text-sm font-medium text-gray-900 dark:text-white">Question Text</label>
                        <input type="text" id=""
                               disabled={!props.create}
                               value={props.data.Text_q}
                               className=" border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full "
                               placeholder="Your Question will be Displayed" required
                               onChange={ev=>props.HandleQuestionUpdate(props.keys,"Text_q",ev.target.value)}
                        />
                    </div>
                </div>
                {props.data.type == "E" &&<>

                    <div className="flex justify-center items-center flex-col ">
                        <div className="py-4 text-xl font-bold w-full md:w-1/2 bg-white">
                            Choose your Fields
                        </div>
                        {props.create?
                            <Autocomplete
                                multiple
                                disabled={!props.create}
                                style={{width:"50%"}}
                                id="tags-standard"
                                options={list_of_all_fields}
                                getOptionLabel={(option) => option}
                                onChange={(event, value) => {
                                    console.log(value,JSON.stringify(value))
                                    props.HandleQuestionUpdate(props.keys,"Extract_from",JSON.stringify(value))
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Select fields"
                                        placeholder="Fields"
                                    />
                                )}
                            />

                            :
                            <input
                                disabled={!props.create}
                                type="text"
                                id="first_name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full "
                                placeholder="Enter the Post Expiration date Time"
                                value={JSON.parse(props.data["Extract_from"]).join(" , ")}
                                // onChange={ev=>setData({...data,expire_date_time: ev.target.value})}

                            />

                        }





                    </div>
                </>

                }

                {props.create === true &&
                <div className="px-4 py-4 flex justify-center space-x-4 font-bold">
                    <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                            id="copy-btn"
                            onClick={ev=>props.HandledeleteQuestion(props.keys)}
                    >
                        delete
                    </button>
                </div>
                }


            </div>


        </div>

    </>

}