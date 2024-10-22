import Footer from "../../component/Footer";
import Navbar from "../../component/Navbar";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="section-wrapper w-full min-h-screen bg-white">
      <Navbar />
      {/* <Headers/> */}
      {children}
      <Footer />
    </div>
  );
}
