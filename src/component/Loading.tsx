"use client"
import React, { useEffect } from "react";
import anime from "animejs";

export default function LoadingLogo() {
  useEffect(() => {
    anime({
      targets: ".circle-1",
      translateY: -24,
      translateX: 52,
      direction: "alternate",
      loop: true,
      elasticity: 400,
      easing: "easeInOutElastic",
      duration: 1600,
      delay: 800,
    });

    anime({
      targets: ".circle-2",
      translateY: 24,
      direction: "alternate",
      loop: true,
      elasticity: 400,
      easing: "easeInOutElastic",
      duration: 1600,
      delay: 800,
    });

    anime({
      targets: ".circle-3",
      translateY: -24,
      direction: "alternate",
      loop: true,
      elasticity: 400,
      easing: "easeInOutElastic",
      duration: 1600,
      delay: 800,
    });

    anime({
      targets: ".circle-4",
      translateY: 24,
      translateX: -52,
      direction: "alternate",
      loop: true,
      elasticity: 400,
      easing: "easeInOutElastic",
      duration: 1600,
      delay: 800,
    });
  }, []);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex space-x-2">
        <div className="circle circle-1 border-4 border-[#FC1460] w-8 h-8 rounded-full"></div>
        <div className="circle circle-2 border-4 border-[#5A87FF] w-8 h-8 rounded-full"></div>
        <div className="circle circle-3 border-4 border-[#18FD91] w-8 h-8 rounded-full"></div>
        <div className="circle circle-4 border-4 border-[#FBF38C] w-8 h-8 rounded-full"></div>
      </div>
    </div>
  );
}
