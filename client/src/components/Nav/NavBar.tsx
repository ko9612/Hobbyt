import MobileNav from "./MobileNav";
import PcNav from "./PcNav";

export default function Navbar() {
  return (
    <>
      <MobileNav />
      <div className="hidden lg:block">
        <PcNav />
      </div>
    </>
  );
}
