import React, { useState, useRef, useEffect } from "react";
import {
    Grid,
    Container,
    Box,
    makeStyles,
    Button,
} from '@material-ui/core'
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Slider from 'react-slick';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import '../scss/main.css';
import { setgroups } from "process";
const useStyles = makeStyles((theme) => ({
    storyParent: {
        width: "100%",
        display: "flex",
        overflow: "visible",
        paddingLeft: "10px",
        paddingTop: "5px",
    },
    storyBox: {
        // width: "10%!important",
        // height: "60px",
        // border: "1px solid #EEE",
        // borderRadius: "50%",
        // cursor: "pointer",
        // margin: "auto 5px",
        // overflow: "hidden",
        // "& img": {
        //     width: "100%",
        //     height: "100%",
        // },
    },
    storyBoxindialog: {
        // width: "100px!important",
        height: "100%",
        border: "1px solid #EEE",
        borderRadius: "50%",
        cursor: "pointer",
        margin: "auto 5px",
        overflow: "hidden",
        position: "relative",
        "& img": {
            width: "100%",
            height: "80vh",
            pointerEvents: "none",
        },
        "& video": {
            width: "100%",
            height: "80vh",
            pointerEvents: "none",
        },
    },
    dialogParent: {
        "& div": {
            borderRadius: "15px",
        },
    },
    dialogContainer: {
        padding: "20px",
        border: "1px solid #eee",
        borderRadius: "15px",
        position: "relative",
        overflow: "visible",

    },
    arrowLeft: {
        position: "absolute",
        top: "50%",
        left: "-30px",
        width: "fit-content",
        height: "20px",
        zIndex: "9999",
        "& i": {
            color: "#FFF",
            cursor: "pointer",
            fontSize: "20px",
            transition: "all .1s linear",
            "&:hover": {
                transform: "scale(1.1)"
            },
        },
    },
    arrowRight: {
        position: "absolute",
        top: "50%",
        right: "-30px",
        width: "fit-content",
        height: "20px",
        zIndex: "9999",
        "& i": {
            color: "#FFF",
            cursor: "pointer",
            fontSize: "20px",
            transition: "all .1s linear",
            "&:hover": {
                transform: "scale(1.1)"
            },
        },

    },
    addStory: {
        width: "65px",
        height: "62px",
        marginTop: "5px",
        marginRight: "-10px",
        position: "relative",
        borderRadius: "50%",
        overflow: "visible",
        "& img": {
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            "@media(max-width:488px)": {
                width: "104%",
            },
            "@media(min-width:489px) and (max-width:566px)": {
                width: "104%",
            },
            "@media(min-width:567px) and (max-width:766px)": {
                width: "107%",
            },
            "@media(min-width:767px) and (max-width:899px)": {
                width: "104%",
            },
            "@media(min-width:900px) and (max-width:959px)": {
                width: "114%",
            },
            "@media(min-width:960px) and (max-width:1199px)": {
                width: "106%",
            },
            "@media(min-width:1201px)": {
                width: "100%",
            },
            "@media(min-width:1201px)": {
                width: "95%",
            },
        },

        "& input": {
            position: "absolute",
            width: "19px",
            height: "20px",
            marginTop: "10px",
            top: "-18px",
            left: "-7px",
            opacity: "0",
            zIndex: "2",
        },
        "& span": {
            position: "absolute",
            paddingTop: "1.4px",
            width: "25px",
            height: "25px",
            top: "-10px",
            left: "-10px",
            background: "#fff",
            display: "block",
            color: "#000",
            borderRadius: "50%",
            zIndex: "1",
        },
        "@media(max-width:480px)": {
            height: "64px",
            marginTop: "8px",
        },
        "@media(min-width:489px) and (max-width:566px)": {
            height: "73px",
            marginTop: "8px",
        },
        "@media(min-width:567px) and (max-width:766px)": {
            height: "77px",
        },
        "@media(min-width:767px) and (max-width:899px)": {
            height: "79px",
        },
        "@media(min-width:900px) and (max-width:959px)": {
            height: "87px",
        },
        "@media(min-width:960px) and (max-width:1199px)": {
            height: "73px",
        },
        "@media(min-width:1201px)": {
            height: "68px",
        },
    },
    carousel: {
        cursor: "grab",
        overflow: "hidden",
    },
    innerCarousel: {
        display: "flex",
        background: "red",
    },
    sliderForImageInStoryDialog: {
        display: "block",
        width: "100%",
        height: "3px",
        backgroundColor: "red",
        position: "absolute",
        left: "5px",
        top: "0",
    }
}))


export default function Story() {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [arr, setArr] = useState([
        // let arr = [
        { src: './images/slider-2.jpg' },
        { src: './images/WhatsApp Image 2022-07-28 at 01.14.56.jpeg' },
    ]);
    const [i, setI] = useState(0);
    const settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        autoplay: true,
        autoplaySpeed: 4000,
        initialSlide: i,
        pauseOnHover: true,
        respovensi: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: "0",
                    autoplay: true,
                    autoplaySpeed: 5000,
                    pauseOnHover: true,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: "0",
                    autoplay: true,
                    autoplaySpeed: 5000,
                    pauseOnHover: true,
                },
            },
            {
                breakpoint: 450,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: false,
                    centerPadding: "0",
                    autoplay: true,
                    autoplaySpeed: 5000,
                    pauseOnHover: true,
                },
            },
        ],
    };

    const itemsInStory = (item, index) => {
        return (
            <SwiperSlide key={index} className={classes.storyBox}>
                {item.src.includes(".mp4") ?
                    <video
                        onClick={() => { opendialog(); setI(index) }} key={index} >
                        <source
                            // src={data?.mediaUrl ? data?.mediaUrl : ""}
                            src={item.src}
                            type="video/mp4"
                        />
                    </video> :
                    <img src={item.src} onClick={() => { opendialog(); setI(index) }} key={index} />
                }

            </SwiperSlide>

        )
    }
    const itemsInDialog = (item, index) => {
        return (
            <div key={index} className="storyBoxindialog" >
                {/* <div className="sliderForImageInStoryDialog">s</div> */}
                {item.src.includes(".mp4") ?
                    <video onClick={() => setI(index)} key={index} controls autoPlay>
                        <source
                            src={item.src}
                            type="video/mp4"
                        />
                    </video> :
                    <img src={item.src} onClick={() => setI(index)} key={index} />}
            </div>
        )
    }


    const opendialog = () => {
        if (open == false) setOpen(true);


        setTimeout(function () {
            const qq = document.querySelectorAll(".sliderForImageInStoryDialog");
            const dialogContainer = document.querySelector(".dialogContainer");
            // .dialogContainer .slick-slider .slick-list .slick-track .slick-slide.slick-active.slick-current .storyBoxindialog .sliderForImageInStoryDialog
            // console.log(dialogContainer.childNodes)
        }, 2)
    }


    const addItemToArr = (e) => {
        const newList = arr.concat({ src: "./images/" + e.target.files[0].name });
        setArr(newList);
    }
    return (
        <Box className={classes.storyParent}>
            <div className={classes.addStory}>
                <img src={"./images/slider-1.jpg"} />
                <span>+</span>
                <input type="file" id="avatar" name="avatar" text="asd"
                    accept="image/*"
                    onChange={(e) => addItemToArr(e)} />
            </div>
            <div className="storyContainer">
                <>
                    <Swiper
                        slidesPerView={8}
                        spaceBetween={10}
                        freeMode={true}
                        modules={[FreeMode]}
                        breakpoints={{
                            468: {
                                slidesPerView: 6
                            },
                            568: {
                                slidesPerView: 6
                            },
                            768: {
                                slidesPerView: 8
                            },
                            900: {
                                slidesPerView: 9
                            },
                            960: {
                                slidesPerView: 6
                            },
                            1200: {
                                slidesPerView: 8
                            }
                        }}
                        className="mySwiper"
                    >

                        {arr.map((item, index) => {
                            return itemsInStory(item, index)
                        })}
                    </Swiper>
                </>
            </div>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                style={{ borderRadius: "15px" }}
                className={classes.dialogParent}>
                <DialogContent
                    className="dialogContainer"
                // onClick={(e) => hoverOnImg()}
                // onKeyUp={(e) => leaveFromImg()}
                // onMouseOver={(e) => hoverOnImg()}
                // onMouseOut={(e) => leaveFromImg()}
                // onMouseEnter={(e) => hoverOnImg()}
                // onMouseLeave={(e) => leaveFromImg()}
                >
                    <Slider {...settings} className="width100 noArrow">
                        {arr.map((item, index) => {
                            return itemsInDialog(item, index)
                        })}
                    </Slider>
                </DialogContent>
            </Dialog>
        </Box>
    )
}


