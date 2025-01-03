"use client";

import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Calendar,
  CreditCard,
  Star,
  CloudSun,
  Luggage,
  MapPin,
  User,
} from "lucide-react";
import NewYorkImage from "../../public/Images/NewYork.jpg";
import ParisImage from "../../public/Images/Paris.jpg";
import TokyoImage from "../../public/Images/Tokyo.jpg";
import { useRouter } from "next/navigation";
export function Landing() {
  const router = useRouter();

  const searchHandler = () => {
    console.log("Go to checkout page")
    router.push(`/checkout`);
  };


  const cities = [
    {
      city: "Paris",
      icon: <CloudSun className="h-8 w-8 text-yellow-500" />,
      image: ParisImage,
    },
    {
      city: "Tokyo",
      icon: <Luggage className="h-8 w-8 text-blue-500" />,
      image: TokyoImage,
    },
    {
      city: "New York",
      icon: <MapPin className="h-8 w-8 text-red-500" />,
      image: NewYorkImage,
    },

  ];
  return (
    <div className="flex flex-col min-h-screen bg-sky-50">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-purple-300 to-sky-300">
          <div className="w-full h-full flex items-center justify-center px-4">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Bay cùng cảm xúc, đến cùng niềm vui
                </h1>
                <p className="mx-auto max-w-[700px] text-xl md:text-2xl text-sky-100">
                  Tự tin khám phá thế giới với những chuyến bay thuận tiện, giá cả hợp lý của Sparrow Airlines
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  {/* <Input
                    className="max-w-lg flex-1 bg-white text-sky-900"
                    placeholder="Where to?"
                    type="text"
                  /> */}
                  <Button
                    type="button"
                    onClick={searchHandler}
                    className="bg-orange-500 hover:bg-orange-600 text-white max-w-lg flex-1"
                  >
                    Tìm kiếm chuyến bay
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-white flex items-center justify-center">
          <div className="w-full max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-sky-800">
              Tại sao Sparrow Airlines là lựa chọn hàng đầu của bạn?
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              <Card className="bg-purple-100 border-yellow-200 hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Search className="h-12 w-12 mb-2 text-yellow-600" />
                  <h3 className="text-xl font-bold text-yellow-800">
                    Tìm kiếm dễ dàng
                  </h3>
                  <p className="text-sm text-yellow-700 text-center">
                    Tìm kiếm chuyến bay đến mọi nơi một cách nhanh chóng và dễ dàng.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-red-100 border-green-200 hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Calendar className="h-12 w-12 mb-2 text-green-600" />
                  <h3 className="text-xl font-bold text-green-800">
                    Lịch trình linh hoạt
                  </h3>
                  <p className="text-sm text-green-700 text-center">
                    Tìm kiếm chuyến bay dựa trên lịch trình của bạn.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-100 border-purple-200 hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <CreditCard className="h-12 w-12 mb-2 text-purple-600" />
                  <h3 className="text-xl font-bold text-purple-800">
                    Thanh toán an toàn
                  </h3>
                  <p className="text-sm text-purple-700 text-center">
                    Thanh toán một cách an toàn và bảo mật với nhiều phương thức thanh toán khác nhau.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-100 border-red-200 hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Star className="h-12 w-12 mb-2 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">
                    Hỗ trợ 24/7
                  </h3>
                  <p className="text-sm text-red-700 text-center">
                    Hỗ trợ khách hàng 24/7 để giải đáp mọi thắc mắc của bạn.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-orange-50 flex items-center justify-center">
          <div className="w-full max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-orange-800">
              Những điểm đến được nhiều người lựa chọn
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cities.map(({ city, icon, image }) => (
                <div
                  key={city}
                  className="relative overflow-hidden rounded-lg shadow-lg group"
                >
                  <Image
                    alt={`${city} skyline`}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    src={image}
                    layout="responsive"
                    width={600}
                    height={400}
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/0 flex items-end p-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                        {icon}
                        <span className="ml-2">{city}</span>
                      </h3>
                      <Button className="bg-white text-sky-800 hover:bg-sky-100">
                        Khám phá chuyến bay
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="w-full py-12 md:py-24 lg:py-32 bg-sky-100 flex items-center justify-center">
          <div className="w-full max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-sky-800">
              Đánh giá từ khách hàng
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Huy Đạt",
                  text: "SparrowAirlines là lựa chọn tuyệt vời cho kỳ nghỉ dưỡng của chúng tôi",
                  avatar: "Đ",
                },
                {
                  name: "Đức",
                  text: "Chất lượng mỗi chuyến bay rất tuyệt vời, dịch vụ tốt",
                  avatar: "Đ",
                },
                {
                  name: "Dũng",
                  text: "Ghế ngồi rất thoải mái, chất lượng đồ ăn tuyệt hảo.",
                  avatar: "D",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-white hover:scale-105 hover:shadow-lg transition-transform duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center text-xl font-bold mr-4">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sky-800">{testimonial.name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sky-700">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full py-6 bg-sky-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About SparrowAirlines</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Press
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Help</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Booking Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Connect with Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-sky-200">
              © 2024 SparrowAirlines. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
