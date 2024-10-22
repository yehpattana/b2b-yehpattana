import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-white w-screen h-full">
      <div className="flex items-center justify-center mt-4 md:mt-8 px-4 md:px-0">
        <Image
          src="/Landing.png"
          alt="ymt img"
          width={1200}
          height={1000}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
