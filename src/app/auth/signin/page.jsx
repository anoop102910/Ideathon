"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import LoadingButton from "@/components/shared/loadbtn";
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const session = useSession();

  if (session.status === "loading") return <div>Loading...</div>;

  if (session.status === "authenticated") {
    router?.push("/");
  }

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async event => {
    setLoading(true);
    event.preventDefault();
    try {
      const res = await signIn("credentials", { ...formData, redirect: false });
      if (!res.ok) throw new Error(res.error);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  if (session.status === "unauthenticated")
    return (
      <div className="flex justify-between items-center mt-6 w-full ">
        <div className="w-full  mx-auto max-w-sm p-4 bg-slate-900 border border-slate-800 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-slate-200">Sign in to our platform</h5>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-slate-200">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-slate-500 border border-slate-300 text-slate-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-slate-200">
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-slate-500 border border-slate-300 text-slate-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    name="rememberMe"
                    className="w-4 h-4 border border-slate-300 rounded bg-slate-500 focus:ring-3 focus:ring-blue-300"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                </div>
                <label htmlFor="remember" className="ms-2 text-sm font-medium text-slate-200">
                  Remember me
                </label>
              </div>
              <a href="#" className="ms-auto text-sm text-blue-700 hover:underline">
                Lost Password?
              </a>
            </div>
            <LoadingButton type={"submit"} loading={loading} onClick={handleSubmit}>
              Login to your Account
            </LoadingButton>
            <div className="text-sm font-medium text-slate-200">
              Not registered?{" "}
              <Link href="/auth/signup" className="text-blue-700 hover:underline">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}

export default LoginForm;
