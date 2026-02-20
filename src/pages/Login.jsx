import { auth, googleProvide } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import LiquidEther from "../components/LiquidEther";
import GlassSurface from "../components/GlassSurface";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (signupErr) {
          console.error("Signup failed:", signupErr.code);
        }
      } else if (err.code === "auth/wrong-password") {
        alert("Wrong password. Please try again.");
      } else if (err.code === "auth/email-already-in-use") {
        alert("Account already exists. Please log in.");
      } else {
        console.error("Auth error:", err.code);
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvide);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0">
        <LiquidEther
          colors={["#ffffff", "#168500", "#177389"]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#5227FF"
          color1="#FF9FFC"
          color2="#B19EEF"
        />
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 h-full w-full">
        <div>
        </div>
        <div className="flex items-center justify-center px-4">
          <GlassSurface
            borderRadius={32}
            width={400}
            height={450}
            className="
            w-full
            max-w-md
            p-6
            sm:p-8
            backdrop-blur-xl
           border border-white/20
    hover:border-white/80
          "
          >
            <form className="flex flex-col gap-5">
              <h1 className="mb-8 text-white/80 text-4xl font-bold ">
                Sign In
              </h1>
              <GlassSurface
                borderRadius={16}
                width={300}
                height={40}
                className="p-3 bg-white/10 backdrop-blur-md border border-white/20
    hover:border-white/80"
              >
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-white/70"
                />
              </GlassSurface>
              <GlassSurface
                borderRadius={16}
                width={300}
                height={40}
                className="p-3 bg-white/10 backdrop-blur-md  border border-white/20
    hover:border-white/80"
              >
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-white placeholder-white/70"
                />
              </GlassSurface>

              <button className="rounded-3xl" type="button" onClick={signIn}>
                <GlassSurface
                  borderRadius={16}
                  width={300}
                  height={40}
                  className="w-full
                   text-white
                    placeholder-white/70
    border border-white/20
    hover:border-white/80
    "
                >
                  Sign In
                </GlassSurface>
              </button>
              <GlassSurface
                borderRadius={16}
                width={300}
                height={40}
                className="w-full bg-transparent outline-none text-white placeholder-white/70 border border-white/20
    hover:border-white/80"
              >
                <button
                  type="button"
                  onClick={signInWithGoogle}
                  className="inline-flex items-center gap-2"
                >
                  <span>Sign in with Google</span>
                  <FcGoogle size={20} />
                </button>
              </GlassSurface>
            </form>
          </GlassSurface>
        </div>
      </div>
    </div>
  );
};
