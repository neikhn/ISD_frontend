import React, { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CountdownTimer from "./CountDownTimer/CountdownTimer.tsx";
import "./HomeSlider.css";

const HomeSlider = (props) => {
  const slideRef = props.slideRef;

  const [loadingProgress, setLoadingProgress] = useState(0);

  const handleClickNext = () => {
    let items = slideRef.current.querySelectorAll(".item");

    slideRef.current.appendChild(items[0]);
  };

  const handleClickPrev = () => {
    let items = slideRef.current.querySelectorAll(".item");
    slideRef.current.prepend(items[items.length - 1]);
  };

  const deadline = new Date('2024-06-17T09:00:00');

  const data = [
    {
      id: 1,
      imgUrl: "https://i.pinimg.com/236x/37/e3/05/37e30566cfd8422db484bffea876b964.jpg",
      desc: "Some beautiful lifestyle cannot be discovered without getting loss.",
      name: "30% SALE",
    },
    {
      id: 2,
      imgUrl:
        "https://i.pinimg.com/564x/44/33/e0/4433e000a798d29539438e188b66af95.jpg",
      desc: "Some beautiful lifestyle cannot be discovered without getting loss.",
      name: "30% SALE",
    },
    {
      id: 3,
      imgUrl:
        "https://i.pinimg.com/236x/53/fe/ef/53feef6b99636078803eb0f68f46f23a.jpg",
      desc: "Some beautiful lifestyle cannot be discovered without getting loss.",
      name: "30% SALE",
    },
    {
      id: 5,
      imgUrl: "https://i.pinimg.com/236x/52/e3/bd/52e3bd736adb6a9cfadbfdc292ee7073.jpg",
      desc: "Some beautiful lifestyle cannot be discovered without getting loss.",
      name: "30% SALE",
    },
    {
      id: 6,
      imgUrl:
        "https://i.pinimg.com/236x/21/c4/f7/21c4f76d0644d94a48df4abe25829914.jpg",
      desc: "Some beautiful lifestyle cannot be discovered without getting loss.",
      name: "30% SALE",
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-center lg:justify-evenly items-center lg:w-[80%] mx-auto mb-36 gap-8">
      <div className="basis-2/4 flex flex-col justify-center items-center gap-16">
        <div className="basis-1/2 w-full h-full text-center text-pinky-600">
          <h1 className="text-3xl font-bold text-[#D94B4B]">Khuyến mãi</h1>
          <p className="font-semibold">
            Chương trình khuyến mãi được áp dụng cả ở cửa hàng và trên website
            trực tuyến
          </p>
          <div className="flex justify-center items-center text-center">
            <div className="buyButton flex justify-center mt-5 items-center rounded  w-[120px] h-[40px] bg-pinky-600 text-white shadow-md">
              Mua ngay
            </div>
          </div>
        </div>
        <div className="basis-1/2 flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-[#D94B4B] text-xl">Số lượng có hạn</h1>
        {<CountdownTimer deadline={deadline} />}
        </div>
      </div>
      <div className="basis-2/4 container">
        <div className="loadbar" style={{ width: `${loadingProgress}%` }}></div>
        <div id="slide" ref={slideRef}>
          {data.map((item) => (
            <div
              key={item.id}
              className="item"
              style={{ backgroundImage: `url(${item.imgUrl})` }}
            >
              <div className="content">
                <div className="name">{item.name}</div>
                <div className="des">{item.desc}</div>
                <button>See more</button>
              </div>
            </div>
          ))}
        </div>
        <div className="buttons">
          <button id="prev" onClick={handleClickPrev}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          <button id="next" onClick={handleClickNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeSlider;
