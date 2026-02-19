import GlassSurface from "../components/GlassSurface";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 w-full h-0">
      <div className="flex justify-center px-4 py-3">
        <GlassSurface
          borderRadius={50}
          className="
            w-[90%]
            h-15 "
        >
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
              <img
                src="../../icons/Webico.png"
                alt="Teller logo"
                className="h-12 w-auto left-5 absolute"
              />
              <span className=" w-auto right-5 absolute">Teller</span>
            </div>
          </nav>
        </GlassSurface>
      </div>
    </div>
  );
};

export default Navbar;
