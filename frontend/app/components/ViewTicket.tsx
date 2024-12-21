"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, Search, ArrowRight, Calendar, Users, ArrowLeft } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image";
import logo from "../../public/Images/logo/logo.png";

interface Ticket {
  ticketId: string;
  flightId: string;
  dateBooked: string;
  seatType: number;
  status: string;
}

export function ViewTicket() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>([])
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const accountId = localStorage.getItem("accountId");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
   
    const fetchTickets = async () => {
      try {
        const url = `http://localhost:8080/getallticket/${accountId}`;

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ticket details.");
        }

        const data: Ticket[] = await response.json();
        setTickets(data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    setFilteredTickets(
      tickets.filter(ticket => 
        ticket.ticketId.toLowerCase().includes(searchKey.toLowerCase()) ||
        ticket.flightId.toLowerCase().includes(searchKey.toLowerCase())
      )
    )
  }, [searchKey, tickets]);

  const handleCancelReservation = async () => {
    // const convertStringToTimestamp = (dateString) => {
    //   // Cách 1: Sử dụng Date.parse()
    //   const timestamp = Date.parse(dateString); // Trả về milliseconds từ epoch
    
    //   // Cách 2: Sử dụng new Date()
    //   const date = new Date(dateString); // Tạo đối tượng Date
    //   const timestampFromDate = date.getTime(); 
    
    //   return timestamp; 
    // };

    // if (!selectedTicket) return;
    // const payload = {
    //   departureTime: new Date(selectedTicket.dateBooked).getTime(),
    //   flightId: selectedTicket.flightId,
    //   seatType: selectedTicket.seatType,
    // };
  
    // try {
    //   const response = await fetch("http://localhost:8080/deletereservation", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify(
    //       payload
    //     ),
    //   });
  
    //   if (!response.ok) {
    //     throw new Error("Failed to cancel reservation");
    //   }
  
    //   alert("Reservation canceled successfully!");
    //   setSelectedTicket(null); // Quay lại danh sách vé
    //   const updatedTickets = tickets.filter(
    //     (ticket) => ticket.ticketId !== selectedTicket.ticketId
    //   );
    //   setTickets(updatedTickets); // Cập nhật danh sách vé
    // } catch (error) {
    //   console.error("Error canceling reservation:", error);
    //   alert("Failed to cancel reservation.");
    // }
    const updatedTickets = tickets.filter((ticket) => ticket.ticketId !== selectedTicket.ticketId);
    setTickets(updatedTickets); // Cập nhật lại danh sách vé
    setSelectedTicket(null); // Quay lại danh sách vé
    alert("Vé đã được hủy thành công!");
  };
  
  // Hàm format SeatType
function formatSeatType(seatType: number): string {
  switch (seatType) {
    case 0:
      return "Hạng phổ thông";
    case 1:
      return "Hạng thương gia";
    case 2:
      return "Hạng FirstClass";
    default:
      return "Không xác định";
  }
}

// Hàm format Date
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy HH:mm:ss"); // Định dạng ngày giờ theo yêu cầu
  } catch {
    return "Không hợp lệ";
  }
}
// Hàm format Status
function formatStatus(status: number): string {
  switch (status) {
    case 0:
      return "Đã đặt";
    case 1:
      return "Đã huỷ";
    default:
      return "Không xác định";
  }
}
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket)
  }

  const handleBack = () => {
    setSelectedTicket(null)
  }

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Image src={logo} alt="logo" width={50} height={50} />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>SparrowAirlines</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            <Moon className="h-4 w-4" />
          </div>
        </header>

        <AnimatePresence mode="wait">
          {!selectedTicket ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`mb-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <CardHeader>
                  <CardTitle className={isDarkMode ? 'text-gray-100' : 'text-gray-900'}>Booked Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search by ticket ID or flight ID"
                      value={searchKey}
                      onChange={(e) => setSearchKey(e.target.value)}
                      className={`flex-grow ${isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
                    />
                    <Button className={isDarkMode ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-600 hover:bg-sky-700'}>
                      <Search className="h-4 w-4" />
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card 
                    key={ticket.ticketId}
                    className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} cursor-pointer hover:shadow-lg transition-shadow duration-300`}
                    onClick={() => handleTicketSelect(ticket)}
                  >
                    <CardContent className="flex justify-between items-center p-4">
                      <div>
                        <p className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}> Thông tin chuyến bay: Ha Noi - Ho Chi Minh City</p>
                        <p className={`text-sm ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}>Ticket ID: {ticket.ticketId}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Hạng ghế: {formatSeatType(ticket.seatType)}</p>
                        <p className={`text-sm ${isDarkMode ? 'text-sky-400' : 'text-sky-600'}`}> Ngày đặt: {(ticket.dateBooked)} </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              
              <Button
                
                className={`mb-4 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-100' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
            onClick={handleBack}
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tickets
              </Button>
              <Card className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-6`}>
                <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Ticket Details</h2>
                <p>Ticket ID: {selectedTicket.ticketId}</p>
                <p> Thông tin chuyến bay: Ha Noi - Ho Chi Minh City</p>
                <p>Ngày đặt: {(selectedTicket.dateBooked)}</p>
                <p>Hạng ghế: {formatSeatType(selectedTicket.seatType)}</p>
              </Card>
              <Button
        onClick={handleCancelReservation}
        className={`w-full ${isDarkMode ? 'bg-red-600 hover:bg-red-700 text-gray-100' : 'bg-red-500 hover:bg-red-600 text-gray-100'}`}
      >
        Hủy vé
      </Button>
            </motion.div>
            
          )}
          
        </AnimatePresence>
        
        <div className="mt-4">
     
    </div>
      </div>
    </div>
  )
}
