import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import logo from "./LOGO1.png";

import GlassSurface from "../components/GlassSurface";
import LogoutButton from "./LogOut";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return (
    <div className="sticky top-0 left-0 z-50 w-full h-0">
      <div className="flex justify-center px-4 py-3">
        <GlassSurface borderRadius={50} className="w-[90%] h-15">
          <nav className="flex items-center w-full px-6">
            <div className="flex items-center"></div>

            <div className="flex-1 text-center">
              <span className="font-semibold text-white text-3xl">Teller</span>
            </div>

            <div className="flex items-center justify-end">
              {user && (
                <GlassSurface
                  borderRadius={50}
                  className="
          px-3 py-1
          border border-white/20
          text-red-400
          hover:border-white/80
        "
                >
                  <LogoutButton />
                </GlassSurface>
              )}
            </div>
          </nav>
        </GlassSurface>
      </div>
    </div>
  );
};

export default Navbar;
