"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast"
import { format } from "date-fns";
import locationToIdMap from "@/components/ui/locationToIdMap";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plane,
  Sun,
  Moon,
  ArrowLeft,
  CalendarIcon,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import logo from "../../public/Images/logo/logo.png";
interface Flight {
  id: string;
  airline: string;
  source: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  cost: number;
}

interface Place{
  placeName:string;
  id:string;
}

export function Checkout() {
  const { toast } = useToast();
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [date, setDate] = useState<Date>();
  const [sourceResults, setSourceResults] = useState<Place[]>([]);
  const [destResults, setDestResults] = useState<Place[]>([]);
  const [toId,setToId]=useState("")
  const [fromId,setFromId]=useState("")

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDarkMode(true);
    }
  }, []);

  const popularJourneys = [
    { source: "Ha Noi", destination: "Ho Chi Minh City" },
    { source: "Ha Noi", destination: "Da Nang" },
    { source: "Ho Chi Minh City", destination: "Phu Quoc" },
    { source: "Ha Noi", destination: "Bangkok" },
    { source: "Ho Chi Minh City", destination: "Seoul" },
    { source: "Ho Chi Minh City", destination: "New york" },
  ];


  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token"); // Lấy JWT token từ localStorage
    const url = `http://localhost:8080/getflight`;
   

  //  const departureId=locationToIdMap[fromId]
  //  const destinationId=locationToIdMap[toId]
  
    // Tạo payload gửi đến Backend
    const flightRequest = {
      departureid: fromId,
      destinationid: toId,
    };
 
    const options = {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Thêm JWT vào header Authorization
      },
      body: JSON.stringify(flightRequest),
    };
  
    try {
      
      console.log("Request URL:", url);
      console.log("Request Body:", flightRequest);
  
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error("Failed to fetch flights.");
      }
  
      const data = await response.json();
      console.log("Flight data:", data);
  
      const parsedFlights: Flight[] = data.map((flight: any) => ({
        id: flight.flightid,
        airline: flight.airlinename,
        availablebusinessseat:flight.availablebusinessseat,
        availableeconomyseat:flight.availableeconomyseat,
        availablefirstclassseat:flight.availablefirstclassseat,
        flightnumber:flight.flightnumber,
        source: `${flight.departurelocation} (${flight.departureairportname})`,
        destination: `${flight.destinationlocation} (${flight.destinationairportname})`,
        departure: flight.departureTime,
        arrival: flight.expectedarrival,
        duration: `${flight.duration} minutes`,
        cost: flight.price,
      }));
      const firstFlight = parsedFlights[0];
    setSource(firstFlight ? firstFlight.source : "N/A");
    setDestination(firstFlight ? firstFlight.destination : "N/A");
      
      console.log("Parsed Flights:", parsedFlights);

      setFlights(parsedFlights);
    } catch (error) {
      toast({
        title: "Uh-oh! 🚧",
        description: "Something's broken in the background. We’re on it!",
      });
      console.error("Error:", error);
    } finally {
      setIsSearched(true);
    }
  };

  const handlePopularJourney = (src: string, dest: string) => {
    setSource(src);
    setDestination(dest);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleBack = () => {
    setIsSearched(false);
    setFlights([]);
  };

  const handleSrcDest = async (place: string, isSrc: boolean) => {
    try {
      const response = await fetch("/airport.txt");
      const text = await response.text();
      const airports = text.split("\n").map((line) => line.trim());
  
      // Lọc kết quả dựa trên nội dung người dùng nhập
      const suggestions = airports.filter((airport) =>
        airport.toLowerCase().includes(place.toLowerCase())
      );
  
      if (isSrc) {
        setSource(place);
        setSourceResults(suggestions.map((name, index) => ({ placeName: name, id: index })));
      } else {
        setDestination(place);
        setDestResults(suggestions.map((name, index) => ({ placeName: name, id: index })));
      }
    } catch (error) {
      console.error("Error reading airport file: ", error);
    }
  };
  
  
  const router = useRouter();

  const [isBooking, setIsBooking] = useState(false);

  const handleBookNow = async (flight: Flight) => {
    setIsBooking(true);
   
    router.push(`/book/${flight.id}`);
    
    setIsBooking(false);
  };

  return (
    <div
      className={`min-h-screen p-4 sm:p-6 lg:p-8 text-xl ${
        isDarkMode ? "bg-zinc-900 text-zinc-100" : "bg-zinc-100 text-zinc-900"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8 flex justify-between items-center">
          <div>
            <div className="flex items-center">
            <Link className="flex items-center justify-center gap-2" href="/">
            <Image src={logo} alt="logo" width={50} height={50} />
              <h1
                className={`text-5xl font-bold mb-2 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                SparrowAirlines
              </h1>
            </Link>
            </div>
            <p
              className={
                isDarkMode ? "text-zinc-400 text-lg" : "text-zinc-600 text-lg"
              }
            >
               Tìm kiếm chuyến bay thích hợp cho bạn
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-5 w-5" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-5 w-5" />
          </div>
        </header>

        {!isSearched ? (
          <>
            <Card
              className={isDarkMode ? "bg-gray-800 text-white" : "bg-white"}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Tìm kiếm chuyến bay
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Điểm xuất phát"
                      value={source}
                      onChange={(e) => handleSrcDest(e.target.value, true)}
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    />
                    {sourceResults.length > 0 && (
                      <Card
                        className={`absolute z-10 w-full mt-1 ${
                          isDarkMode ? "bg-gray-700 text-white" : ""
                        }`}
                      >
                        <CardContent className="p-0">
                          {sourceResults.map((result, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className={`w-full justify-start ${
                                isDarkMode ? "hover:bg-gray-600" : ""
                              }`}
                              
                              onClick={() => {
                                setSource(result.placeName); // Cập nhật tên địa điểm
                                setFromId(locationToIdMap[result.placeName] || ""); // Lấy ID từ bảng quy đổi
                                setSourceResults([]);
                              }}
                            >
                              {result.placeName}
                            
                        
                            </Button>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Điểm đến"
                      value={destination}
                      onChange={(e) => handleSrcDest(e.target.value, false)}
                      className={isDarkMode ? "bg-gray-700 text-white" : ""}
                    />
                    {destResults.length > 0 && (
                      <Card
                        className={`absolute z-10 w-full mt-1 ${
                          isDarkMode ? "bg-gray-700 text-white" : ""
                        }`}
                      >
                        <CardContent className="p-0">
                          {destResults.map((result, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              className={`w-full justify-start ${
                                isDarkMode ? "hover:bg-gray-600" : ""
                              }`}
                              onClick={() => {
                                setDestination(result.placeName); // Cập nhật tên địa điểm
      setToId(locationToIdMap[result.placeName] || ""); // Lấy ID từ bảng quy đổi
      setDestResults([]);
                              }}
                            >
                              {result.placeName}
                            </Button>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full sm:w-[180px] justify-start text-left font-normal ${
                          !date && "text-muted-foreground"
                        } ${
                          isDarkMode
                            ? "bg-gray-700 text-white hover:bg-gray-600"
                            : ""
                        }`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Ngày khởi hành</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className={`w-auto p-0 ${
                        isDarkMode ? "bg-gray-700 text-white" : ""
                      }`}
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={isDarkMode ? "bg-gray-700 text-white" : ""}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <Button
                  className={`w-full ${
                    isDarkMode ? "bg-blue-600 hover:bg-blue-700" : ""
                  }`}
                  onClick={handleSearch}
                >
                   Tìm kiếm
                </Button>
              </CardContent>
            </Card>

            <section>
              <h2
                className={`text-3xl font-semibold mb-4 ${
                  isDarkMode ? "text-zinc-200" : "text-zinc-800"
                }`}
              >
                Chuyến bay phổ biến
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularJourneys.map((journey, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`h-32 py-4 px-6 flex items-center justify-between transition-transform duration-300 transform text-lg ${
                      isDarkMode
                        ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-200"
                        : "bg-white border-zinc-300 hover:bg-zinc-100 text-zinc-800"
                    } hover:scale-105`}
                    onClick={() =>
                      handlePopularJourney(journey.source, journey.destination)
                    }
                  >
                    <span className="flex items-center">
                      <span className="font-medium">{journey.source}</span>
                      <Plane
                        className={`w-5 h-5 mx-2 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <span className="font-medium">{journey.destination}</span>
                    </span>
                    <span
                      className={`text-lg ${
                        isDarkMode ? "text-zinc-400" : "text-zinc-500"
                      }`}
                    >
                       Lựa chọn
                    </span>
                  </Button>
                ))}
              </div>
            </section>
          </>
        ) : (
          <Card
            className={`mb-8 text-lg ${
              isDarkMode
                ? "bg-zinc-800 border-zinc-700"
                : "bg-white border-zinc-200"
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle
                className={isDarkMode ? "text-zinc-100" : "text-zinc-900"}
              >
               Kết quả tìm kiếm: {source} to {destination}
              </CardTitle>
              <Button
                variant="outline"
                onClick={handleBack}
                className={isDarkMode ? "text-zinc-600" : "text-zinc-800"}
              >
                <ArrowLeft className="w-5 h-5 mr-2 " />
                 Quay lại tìm kiếm
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flights.map((flight) => (
                  <Card
                    key={flight.id}
                    className={`h-32 transition-transform duration-300 transform hover:scale-105 ${
                      isDarkMode
                        ? "bg-zinc-700 border-zinc-600"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4">
                      <div>
                        <h3
                          className={`font-bold text-xl ${
                            isDarkMode ? "text-zinc-100" : "text-zinc-900"
                          }`}
                        >
                          {flight.airline}-{flight.flightnumber}
                          
                        </h3>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-zinc-400" : "text-zinc-600"
                          }`}
                        >
                          {flight.departure} - {flight.arrival}
                          <br/>
                         Số ghế hạng thương gia :{flight.availablebusinessseat}
                          <br/>
                          Số ghế thường:{flight.availableeconomyseat}
                          <br/>
                           Số ghế hạng first class:{flight.availablefirstclassseat}
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <p
                          className={`font-medium text-lg ${
                            isDarkMode ? "text-zinc-200" : "text-zinc-800"
                          }`}
                        >
                          ${flight.cost}
                        </p>
                        <Button
                          onClick={() => handleBookNow(flight)}
                          disabled={isBooking}
                          className={`${
                            isDarkMode
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                        >
                          {isBooking ? (
                            <span> Đang đặt...</span>
                          ) : (
                            <span>Đặt ngay bây giờ</span>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}