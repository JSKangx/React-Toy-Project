import { useState } from "react";

export default function Carousel() {
  const imagesPath = [
    "/images/1.webp",
    "/images/2.webp",
    "/images/3.webp",
    "/images/4.webp",
    "/images/5.webp",
    "/images/6.webp",
  ];

  const [index, setIndex] = useState(0);
  let imagePath = imagesPath[index];

  const onChangeImg = (direction) => {
    if (direction === "left") {
      setIndex((prevIndex) =>
        prevIndex === 0 ? imagesPath.length - 1 : prevIndex - 1
      );
    } else {
      setIndex((prevIndex) =>
        prevIndex === imagesPath.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${imagePath})`,
        }}
        className="bg-slate-200 w-[600px] h-[720px] shadow-lg relative bg-cover group"
      >
        <button
          className={`w-[90px] h-[90px] absolute top-1/2 left-0 z-10 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
          onClick={() => {
            onChangeImg("left");
          }}
        >
          <img
            src="/images/carret_left.svg"
            alt="왼쪽 화살표"
            className="w-full h-full"
          />
        </button>
        <button
          className="w-[90px] h-[90px] absolute top-1/2 right-0 z-10 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          onClick={() => {
            onChangeImg("right");
          }}
        >
          <img
            src="/images/carret_right.svg"
            alt="오른쪽 화살표"
            className="w-full h-full"
          />
        </button>
        <p className="absolute bottom-3 right-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{`(${
          index + 1
        }/${imagesPath.length})`}</p>
      </div>
    </>
  );
}
