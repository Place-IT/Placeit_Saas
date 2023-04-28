import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import {useRef} from "react";
import PptxGenJS from "pptxgenjs";
import domToImage from 'dom-to-image';

import logo from "../../assets/images/crop_logo.png";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Poster_dialog(props) {

    const handleClose = () => {
        setOpen(false);
    };

    const divRef = useRef(null);
    // const pptx =  new PptxGenJS();
    // console.log(pptx)

    const convertDivToPpt = () => {

        domToImage.toPng(divRef.current)
            .then(function (dataUrl) {
                const pptx =  new PptxGenJS();
                const slide = pptx.addSlide();
                slide.addImage({ data: dataUrl });
                pptx.writeFile({ fileName: 'Browser-PowerPoint-Demo.pptx' })
                    .then(fileName => {
                        console.log(`created file: ${fileName}`);
                    });
            })
            .catch(function (error) {
                console.error('Error converting element to image:', error);
            });
    };

    const chunks = list_of_student.reduce((acc, el, index) => {
       let chunkIndex=0
        if(Company === undefined)
       {
           chunkIndex = Math.floor(index / 14);
       }
       else {
           chunkIndex = Math.floor(index / 7);
       }

        if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(el);

        return acc;
    }, []);
    // console.log(list_of_student)

    return (

            <Dialog
                fullScreen
                open={true}
                onClose={props.handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={props.handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Banner Creation
                        </Typography>
                        <Button autoFocus color="inherit" onClick={convertDivToPpt}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>

                <div className=" mx-auto border-4 border-black h-screen "  ref={divRef}>
                    <div className="flex flex-row m-4 ">
                        <img className="w-1/4" src={logo} alt="" />
                            <div className="w-full m-2 ">
                                <p className=" m-2 font-bold text-4xl text-red-500 uppercase">Bharati Vidyapeeth College
                                    of Engineering,Navi mumbai</p>
                                <p className=" flex items-center justify-center font-bold text-2xl text-red-500 uppercase">campus
                                    Placement - Information Technology Department, Year {props.year}</p>
                            </div>
                    </div>
                    {Company === undefined ?<>

                        <div className="flex flex-row m-2">
                            <div className="w-full m-2 ">
                                <p className=" flex items-center justify-center font-semibold text-2xl text-red-500">Congratulations
                                    to all getting placed!</p>
                            </div>
                        </div>
                        {
                            chunks.map((chunk,index)=>{
                                return<>
                                    <div className="flex flex-row justify-center space-x-2 m-2 ">
                                        {chunk.map((ev, index) => (<>
                                                <div className="">
                                                    {ev.image !== null?<>
                                                        <img className="border-2 border-black h-24" src={ev.image} alt="" />
                                                    </>:<>
                                                        <img className="border-2 border-black h-24" src={"/static/img/default-avatar.png"} alt="" />
                                                    </>
                                                    }
                                                    <p className="flex mx-auto justify-center">{ev.name}</p>
                                                    <p className="flex mx-auto justify-center">{ev.company.join(" ")}</p>
                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </>

                            })
                        }

                    </>:<>

                        <div className="flex flex-row m-2">
                            <div className="w-full ">
                                <p className=" flex items-center justify-center font-semibold text-2xl text-red-500">Congratulations
                                    to all getting placed in {Company.name}!</p>
                            </div>
                        </div>


                        {
                            chunks.map((chunk,index)=>{
                                return<>
                                    <div className="flex flex-row justify-center space-x-2 m-4 px-8 ">
                                        {chunk.map((ev, index) => (<>
                                                <div className="">
                                                    {ev.image !== null?<>
                                                        <img className="border-2 border-black h-24" src={ev.image} alt="" />
                                                    </>:<>
                                                        <img className="border-2 border-black h-24" src={"/static/img/default-avatar.png"} alt="" />
                                                    </>
                                                    }
                                                    <p className="flex mx-auto justify-center">{ev.name}</p>

                                                </div>
                                            </>
                                        ))}
                                    </div>
                                </>

                            })
                        }

                    </>}




                </div>
            </Dialog>
    );
}