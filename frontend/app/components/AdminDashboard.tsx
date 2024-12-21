"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);
interface Flight {
  flightId: string;
  departureTime: string;
  arrivalTime: string;
  source: string;
  destination: string;
}

export default function AdminDashboard() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [ticketStats, setTicketStats] = useState<{ [key: string]: number }>({});

  const [newFlight, setNewFlight] = useState<Partial<Flight>>({
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    flightId: "",
  });

  // Flag to bypass API calls
  const bypassApi = true;

  const fetchFlights = async () => {
    if (bypassApi) {
      // Giả lập dữ liệu mặc định khi bỏ qua API
      const mockFlights: Flight[] = [
        { flightId: "590c001031694253ace6acf94e406bc8", departureTime: "2024-12-22T10:00:00", arrivalTime: "2024-12-22T12:00:00", source: "Hanoi", destination: "Ho Chi Minh" },
        { flightId: "680c001031213253ace6acf94e406dq5", departureTime: "2024-12-23T15:00:00", arrivalTime: "2024-12-23T17:00:00", source: "Danang", destination: "Hanoi" },
        { flightId: "210c001031694253ace6acf94e406af1", departureTime: "2024-12-24T08:00:00", arrivalTime: "2024-12-24T10:00:00", source: "Ho Chi Minh", destination: "Danang" },
      ];
      setFlights(mockFlights);
      console.log("Bypassing API: Loaded mock flights");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/getallflights", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch flights.");
      const data: Flight[] = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    }
  };

  const fetchTicketStats = () => {
    if (bypassApi) {
      const mockTicketStats = {
        "Hanoi-Ho Chi Minh": 120,
        "Danang-Hanoi": 80,
        "Ho Chi Minh-Danang": 95,
      };
      setTicketStats(mockTicketStats);
    }
  };

  useEffect(() => {
    fetchFlights();
    fetchTicketStats();
  }, []);

  const handleUpdateFlightTime = async (
    flightId: string,
    departureTime: string,
    arrivalTime: string
  ) => {
    if (bypassApi) {
      console.log("Bypassing API: Updated flight time", {
        flightId,
        departureTime,
        arrivalTime,
      });
      alert("Flight time updated successfully!");
      return;
    }

    try {
      const payload = { flightId, departureTime, arrivalTime };
      const response = await fetch("http://localhost:8080/changeflighttime", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update flight time.");
      alert("Flight time updated successfully!");
      fetchFlights();
    } catch (error) {
      console.error("Error updating flight time:", error);
      alert("Failed to update flight time.");
    }
  };

  const handleCreateFlight = async () => {
    if (bypassApi) {
      console.log("Bypassing API: Created flight", newFlight);
      alert("Flight created successfully!");
      setNewFlight({
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
      });
      return;
    }

    try {
      const payload = newFlight;
      const response = await fetch("http://localhost:8080/createflight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to create flight.");
      alert("Flight created successfully!");
      setNewFlight({
        source: "",
        destination: "",
        departureTime: "",
        arrivalTime: "",
      });
      fetchFlights();
    } catch (error) {
      console.error("Error creating flight:", error);
      alert("Failed to create flight.");
    }
  };

  // Biểu đồ
  const barChartData = {
    labels: ["Hanoi-Ho Chi Minh", "Danang-Hanoi", "Ho Chi Minh-Danang"],
    datasets: [
      {
        label: "Number of Flights",
        data: flights.reduce((acc, flight) => {
          const route = `${flight.source}-${flight.destination}`;
          acc[route] = (acc[route] || 0) + 1;
          return acc;
        }, {} as { [key: string]: number }),
        backgroundColor: ["#4CAF50", "#FFC107", "#2196F3"],
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(ticketStats),
    datasets: [
      {
        data: Object.values(ticketStats),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* Flight Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border">
            <thead>
              <tr>
                <th>Flight ID</th>
                <th>Source</th>
                <th>Destination</th>
                <th>Departure Time</th>
                <th>Arrival Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.map((flight) => (
                <tr key={flight.flightId}>
                  <td>{flight.flightId}</td>
                  <td>{flight.source}</td>
                  <td>{flight.destination}</td>
                  <td>
                    <Input
                      defaultValue={flight.departureTime}
                      onBlur={(e) =>
                        handleUpdateFlightTime(
                          flight.flightId,
                          e.target.value,
                          flight.arrivalTime
                        )
                      }
                    />
                  </td>
                  <td>
                    <Input
                      defaultValue={flight.arrivalTime}
                      onBlur={(e) =>
                        handleUpdateFlightTime(
                          flight.flightId,
                          flight.departureTime,
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() =>
                        handleUpdateFlightTime(
                          flight.flightId,
                          flight.departureTime,
                          flight.arrivalTime
                        )
                      }
                    >
                       Cập nhật
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Create New Flight */}
      <Card>
        <CardHeader>
          <CardTitle>Tạo chuyến bay</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Input
              placeholder="Source"
              value={newFlight.source}
              onChange={(e) =>
                setNewFlight({ ...newFlight, source: e.target.value })
              }
            />
            <Input
              placeholder="Destination"
              value={newFlight.destination}
              onChange={(e) =>
                setNewFlight({ ...newFlight, destination: e.target.value })
              }
            />
            <Input
              placeholder="Departure Time (YYYY-MM-DDTHH:mm:ss)"
              value={newFlight.departureTime}
              onChange={(e) =>
                setNewFlight({ ...newFlight, departureTime: e.target.value })
              }
            />
            <Input
              placeholder="Arrival Time (YYYY-MM-DDTHH:mm:ss)"
              value={newFlight.arrivalTime}
              onChange={(e) =>
                setNewFlight({ ...newFlight, arrivalTime: e.target.value })
              }
            />
            <Button onClick={handleCreateFlight}>Create Flight</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Flight Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Biểu đồ cột: Số chuyến bay */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Number of Flights per Route</h2>
            <Bar data={barChartData} />
          </div>

          {/* Biểu đồ tròn: Số vé */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Tickets Sold per Route</h2>
            <Pie data={pieChartData} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
