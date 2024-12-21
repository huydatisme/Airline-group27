"use client";

import Link from "next/link";
import { useEffect } from "react";
import { PlaneTakeoff, User } from "lucide-react"; // Sử dụng Lucide để hiển thị icon
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms";
import Image from "next/image";
import logo from "../../public/Images/logo/logo.png";

export default function Header() {
  const router = useRouter();
  const [username, setUsername] = useRecoilState(userAtom); // Trạng thái người dùng (email hoặc tên)
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [setUsername]);

  // Hàm xử lý đăng nhập/đăng xuất
  const handleAuthAction = () => {
    if (username) {
      // Nếu đã đăng nhập, thực hiện đăng xuất
      setUsername(null); // Đăng xuất người dùng
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
      router.push("/"); // Chuyển hướng về trang chủ
    } else {
      // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
      router.push("/auth");
    }
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-red-500 text-white">
      {/* Logo và Tên */}
      <Link className="flex items-center justify-center gap-2" href="/">
        <Image src={logo} alt="logo" width={50} height={50} />
        <span className="text-xl font-bold">Sparrow Airlines</span>
      </Link>

      {/* Các liên kết điều hướng */}
      <nav className="ml-auto flex items-center gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/ticket"
        >
          Chuyến đi
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/admin"
        >
          Quản lý
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="#"
        >
           Liên hệ
        </Link>

        {/* Nút đăng nhập/đăng xuất */}
        <button
          type="button"
          className="bg-white text-sky-500 hover:bg-sky-100 px-4 py-2 flex items-center text-sm rounded-md shadow"
          onClick={handleAuthAction}
        >
          <User className="h-4 w-4 mr-2" />
          {username ? `Xin chào, ${username}` : "Login"}
        </button>
      </nav>
    </header>
  );
}
