"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plane, Cloud, Sun, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { userAtom } from "../atoms";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import logo from "../../public/Images/logo/logo.png";

const TabContent = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full overflow-hidden relative h-full rounded-2xl p-8 text-white bg-gradient-to-br from-sky-400 to-indigo-900">
    {children}
    <div className="absolute top-4 right-4 text-white/20">
      <Plane className="h-32 w-32 rotate-45" />
    </div>
    <Cloud className="absolute bottom-4 left-4 h-16 w-16 text-white/20" />
    <Sun className="absolute top-8 left-8 h-12 w-12 text-yellow-300/30" />
  </div>
);

export function Auth() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const setUserName = useSetRecoilState(userAtom);

  const [signupForm, setSignupForm] = useState({
    accountName: "",
    email: "",
    password: "",
    // role: "ROLE_USER",
  });

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupForm({
      ...signupForm,
      [e.target.id]: e.target.value,
    });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.id]: e.target.value,
    });
  };

// Hàm tái sử dụng để gửi request
const fetchWithAuth = async (
  url: string,
  method: string,
  body: object | null = null
) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("JWT token is missing. Please log in again.");
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(url, {
    method,
    credentials: "include",
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  return response;
};

const signupHandler = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Ngăn chặn refresh trang
  setIsLoading(true); // Hiển thị trạng thái loading

  try {
    console.log("Signup Form Data:", signupForm);

    // Gửi yêu cầu đăng ký đến backend
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      credentials: "include", // Gửi cookie với request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupForm), // Chuyển dữ liệu form sang JSON
    });

    const data = await response.json(); // Lấy phản hồi từ backend
    console.log("Signup Response Data:", data);

    if (response.ok) {
      // Đăng ký thành công
      const { userDetails, jwtToken } = data;
      const { accountId, accountName } = userDetails.account;

      console.log("Token received:", jwtToken);
      console.log("User Details:", userDetails);

      // Lưu thông tin vào localStorage
      localStorage.setItem("username", accountName);
      localStorage.setItem("accountId", accountId);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("role", userDetails.account.accountRole);

      // Cập nhật trạng thái người dùng
      setUserName(accountName);

      // Điều hướng đến trang sau khi đăng ký
      router.push("/checkout");

      // Hiển thị thông báo thành công
      toast({
        title: "Đăng ký thành công!",
        description: `Chào mừng bạn đến với SparrowAirlines, ${accountName}!`,
      });
    } else {
      // Xử lý lỗi từ phản hồi backend
      toast({
        title: "Đăng ký thất bại",
        variant: "destructive", // Hiển thị thông báo lỗi (màu đỏ)
        description: data.error || "Có lỗi xảy ra. Vui lòng thử lại.",
      });
      throw new Error(data.error || "Đăng ký thất bại. Vui lòng thử lại.");
    }
  } catch (error: any) {
    console.error("Error during signup:", error);

    // Hiển thị thông báo lỗi khi đăng ký thất bại
    toast({
      title: "Đăng ký thất bại",
      description: error.message || "Có lỗi xảy ra trong quá trình đăng ký.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false); // Tắt trạng thái loading
  }
};


const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault(); // Ngăn chặn refresh trang
  setIsLoading(true); // Hiển thị trạng thái loading

  try {
    console.log("Login Form Data:", loginForm);

    // Gửi yêu cầu đăng nhập đến backend
    const response = await fetch("http://localhost:8080/auth/authentication", {
      method: "POST",
      credentials: "include", // Gửi cookie với request
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginForm), // Chuyển dữ liệu form sang JSON
    });

    const data = await response.json(); // Lấy phản hồi từ backend
    console.log("Login Response Data:", data.userDetails.account.accountRole);

    if (response.ok) {
      // Đăng nhập thành công
      const { userDetails, jwtToken } = data;
      const { accountId, accountName } = userDetails.account;

      console.log("Token received:", jwtToken);
      console.log("User Details:", userDetails);

      // Lưu thông tin vào localStorage
      localStorage.setItem("username", accountName);
      localStorage.setItem("accountId", accountId);
      localStorage.setItem("token", jwtToken);
      localStorage.setItem("role", userDetails.account.accountRole);

      // Cập nhật trạng thái người dùng
      setUserName(accountName);

      // Điều hướng dựa trên vai trò người dùng
      const role = userDetails.account.accountRole;
      console.log("User Role:", role);
      if (role === "ADMIN") {
        console.log("Admin");
        router.push("/admin");
        
      } else if (role === "ROLE_USER") {
        router.push("/checkout");
      } else {
        throw new Error("Vai trò người dùng không hợp lệ.");
      }

      // Hiển thị thông báo thành công
      toast({
        title: "Đăng nhập thành công!",
        description: `Chào mừng bạn quay lại, ${accountName}!`,
      });
    } else {
      // Xử lý lỗi từ phản hồi backend
      toast({
        title: "Đăng nhập thất bại",
        variant: "destructive", // Hiển thị thông báo lỗi (màu đỏ)
        description: data.error || "Sai email hoặc mật khẩu.",
      });
      throw new Error(data.error || "Sai email hoặc mật khẩu.");
    }
  } catch (error: any) {
    console.error("Error during login:", error);

    // Hiển thị thông báo lỗi khi đăng nhập thất bại
    toast({
      title: "Đã xảy ra lỗi",
      variant: "destructive",
      description: "Không thể kết nối tới máy chủ. Vui lòng thử lại sau.",
    });
  } finally {
    setIsLoading(false); // Tắt trạng thái loading
  }
};


  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    // Simulate Google authentication
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGoogleLoading(false);
  };

  const tabs = [
    {
      title: "Sign Up",
      value: "signup",
      content: (
        <TabContent>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Bay cùng SparrowAirline</h2>
          <form onSubmit={signupHandler} className="space-y-4">
            <div>
              <Label htmlFor="accountName" className="text-white">Tên</Label>
              <Input
                id="accountName"
                type="text"
                value={signupForm.accountName}
                onChange={handleSignupChange}
                placeholder="sky explorer"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                placeholder="skyexplorer@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                required
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm text-white">
                Đồng ý với {" "}
                <a href="#" className="underline">
                  Điều khoản và quy định
                </a>
              </Label>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-indigo-900 hover:bg-indigo-100"
            >
              {isLoading ? "Preparing for Takeoff..." : "Đăng ký"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-indigo-900 px-2 text-white">Hoặc tiếp tục với</span>
              </div>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={isGoogleLoading}
              className="mt-4 w-full bg-white text-indigo-900 hover:bg-indigo-100"
            >
              {isGoogleLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <svg className="mr-2 h-4 w-4" aria-hidden="true" viewBox="0 0 488 512">
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504..."
                  ></path>
                </svg>
              )}
              {isGoogleLoading ? "Connecting..." : "Tiếp tục với tài khoản Google"}
            </Button>
          </div>
        </TabContent>
      ),
    },
    {
      title: "Login",
      value: "login",
      content: (
        <TabContent>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Chào mừng quý khách đã quay trở lại</h2>
          <form onSubmit={loginHandler} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-white">Email</Label>
              <Input
                id="username"
                type="email"
                value={loginForm.username}
                onChange={handleLoginChange}
                placeholder="hello@example.com"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-white">Mật khẩu</Label>
              <Input
                id="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                required
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label
 htmlFor="remember" className="text-sm text-white">
                  Ghi nhớ tôi
                </Label>
              </div>
              <a href="#" className="text-sm text-white underline">
                 Quên mật khẩu?
              </a>
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-indigo-900 hover:bg-indigo-100"
            >
              {isLoading ? "Boarding..." : "Đăng nhập"}
            </Button>
          </form>
        </TabContent>
      ),
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-indigo-100 to-sky-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-900 flex items-center justify-center">
          <Image src= {logo} alt="logo" width={50} height={50} />
            SparrowAirlines
          </h1>
          <p className="text-indigo-700">Your passport to the skies</p>
        </div>
        <Tabs defaultValue="signup" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="text-lg">
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {tab.content}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
