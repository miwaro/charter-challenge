import { useState, useEffect } from "react";

import "./App.css";
import axios from "axios";
import RewardsTable from "./components/RewardsTable/RewardsTable";
import DateSelector from "./components/DatePicker";
import { DateContext } from "./Contexts/DateContext";
import { SearchContext } from "./Contexts/SearchContext";
import dayjs from "dayjs";
import Pagination from "./components/Pagination/Pagination";
import InfoModal from "./components/InfoModal";
import SearchBar from "./components/SearchBar";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(10);

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const response = await axios.get("data.json");
      setCustomers(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err.message);
      setIsLoading(false);
    }
  };

  const handlePaginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
        <>
          <h1>Rewards Program</h1>
          <div className="container">
            <div className="info">
              <InfoModal />
            </div>
            <div className="search">
              <SearchBar />
            </div>
            <div className="date">
              <DateSelector />
            </div>
          </div>
          <RewardsTable isLoading={isLoading} data={currentCustomers} />
          <Pagination
            customersPerPage={customersPerPage}
            totalCustomers={customers.length}
            paginate={handlePaginate}
            currentPage={currentPage}
          />
        </>
      </DateContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
