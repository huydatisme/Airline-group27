import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import logo from "../../public/Images/logo/logo.png";

interface FlightInfo {
  airplainId: string;
  price: number;
  businesSeat: number;
  economySeat: number;
  firsrClassSeat: number;

}

interface FlightBookProps {
  flightId: string;
}

export function FlightBook({ flightId }: FlightBookProps) {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [flightInfo, setFlightInfo] = useState<FlightInfo | null>(null);
  const [seatType, setSeatType] = useState(""); // Giá trị nhập cho hạng ghế
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const fetchFlightDetails = async (flightId: string) => {
      try {
        console.log("flightid:",flightId);
      
        const url = `http://localhost:8080/getflightbyflightid/${flightId}`;
        const response = await fetch(url, { method: "GET" });
        if (!response.ok) {
          throw new Error("Failed to fetch flight details.");
        }
        const data = await response.json();
        console.log(data);
        setFlightInfo({
          airplainId: data.flightnuber,
          price: data.basePrice,
          businesSeat: data.availableBusinessSeat,
          economySeat: data.availableEconomySeat,
          firsrClassSeat: data.availableFirstClassSeat,

        });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchFlightDetails(flightId);
  }, [flightId]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const url = `http://localhost:8080/makereservation`; // URL chính xác
    const body = JSON.stringify({
      flightId,
      accountId,
      seatType,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error("Failed to book ticket");
      }

      toast({
        title: "Get Set Fly",
        description: "Ticket Booked",
      });

      router.push(`/ticket`);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Image src={logo} alt="logo" width={50} height={50} />
            <h1
              className={`text-3xl font-bold ${
                isDarkMode ? "text-sky-400" : "text-sky-600"
              }`}
            >
              SparrowAirlines
            </h1>
          </div>
        </header>

        <Card
          className={`mb-6 ${
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <CardContent className="py-4">
            {flightInfo ? (
              <div className="flex items-center justify-center space-x-4">
                <span
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
               Số hiệu tàu bay: {flightInfo.airplainId}
                </span>
                <span
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                 Số ghế thường (0): {flightInfo.businesSeat}
                </span>
                <span
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                 Số ghế hạng thương gia (1): {flightInfo.economySeat}
                </span>
                <span
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                số ghế hạng First Class (2):  {flightInfo.firsrClassSeat}
                </span>
                <span
                  className={`text-lg font-semibold ${
                    isDarkMode ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                 Giá vé thường (Các hạng sau giá vé tăng 1,5 lần): {flightInfo.price}
                </span>
              </div>
            ) : (
              <p
                className={`text-center ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                Failed to load flight information.
              </p>
            )}
          </CardContent>
        </Card>

        <Card
          className={
            isDarkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }
        >
          <CardHeader>
            <CardTitle
              className={isDarkMode ? "text-gray-100" : "text-gray-900"}
            >
              Ticket Booking Form
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label
                  htmlFor="name"
                  className={isDarkMode ? "text-gray-200" : "text-gray-700"}
                >
                  Tên
                </Label>
                <Input
                  id="name"
                  placeholder="Nhập tên của bạn"
                  className={`mt-1 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <Label
                  htmlFor="phone"
                  className={isDarkMode ? "text-gray-200" : "text-gray-700"}
                >
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  placeholder="Nhập số điện thoại"
                  className={`mt-1 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <Label
                  htmlFor="seatType"
                  className={isDarkMode ? "text-gray-200" : "text-gray-700"}
                >
                  Hạng ghế
                </Label>
                <Input
                  id="seatType"
                  placeholder="Nhập hạng ghế (0, 1, 2...)"
                  value={seatType}
                  onChange={(e) => setSeatType(e.target.value)}
                  className={`mt-1 ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>

              <Button
                type="submit"
                className={`w-full ${
                  isDarkMode
                    ? "bg-sky-600 hover:bg-sky-700 text-white"
                    : "bg-sky-600 hover:bg-sky-700 text-white"
                }`}
              >
                Đặt vé
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
