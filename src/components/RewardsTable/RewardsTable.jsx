/* eslint-disable react/prop-types */
import { useState, useEffect, useContext, useMemo } from "react";
import "./styles.css";
import { DateContext } from "../../Contexts/DateContext";
import { SearchContext } from "../../Contexts/SearchContext";
import dayjs from "dayjs";
import TableSortLabel from "@mui/material/TableSortLabel";
import useDebounce from "../../hooks/useDebounce";
import LoadingSpinner from "../LoadingSpinner";

function RewardsTable({ isLoading, data }) {
  const { selectedDate } = useContext(DateContext);
  const { search } = useContext(SearchContext);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(null);
  const [customers, setCustomers] = useState([]);
  const debouncedSearchTerm = useDebounce(search, 500);

  const customersInSearch = useMemo(() => {
    if (!search) return data;

    return data.filter((customer) => {
      return customer.name
        .toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase());
    });
  }, [debouncedSearchTerm, data, search]);

  useEffect(() => {
    setCustomers(customersInSearch);
  }, [customersInSearch]);

  const handleSort = (columnId) => {
    if (orderBy === columnId && order === "asc") {
      setOrder("desc");
    } else {
      setOrder("asc");
    }
    setOrderBy(columnId);
  };

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      if (orderBy === null) return;
      if (order === "asc") {
        return a[orderBy] > b[orderBy] ? 1 : -1;
      } else {
        return a[orderBy] < b[orderBy] ? 1 : -1;
      }
    });

    setCustomers(sortedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, orderBy]);

  const getMonthNames = () => {
    const currentDate = dayjs(selectedDate);
    const previousMonth = currentDate.subtract(1, "month");
    const twoMonthsAgo = currentDate.subtract(2, "month");
    return {
      selectedMonth: currentDate.format("MMMM YYYY"),
      previousMonth: previousMonth.format("MMMM YYYY"),
      twoMonthsAgo: twoMonthsAgo.format("MMMM YYYY"),
    };
  };

  const { selectedMonth, previousMonth, twoMonthsAgo } = getMonthNames();

  const columns = [
    { id: "id", label: "ID", sortable: true },
    { id: "name", label: "Customer Name", sortable: true },
    { id: "twoMonthsAgo", label: twoMonthsAgo, sortable: false },
    { id: "previousMonth", label: previousMonth, sortable: false },
    { id: "selectedMonth", label: selectedMonth, sortable: false },
    { id: "total", label: "Total Points", sortable: false },
  ];

  const calculatePoints = (amount) => {
    if (amount > 100) {
      return 2 * (amount - 100) + 50;
    } else if (amount >= 50) {
      return amount - 50;
    }
    return 0;
  };

  const getPoints = (monthAndYear) => {
    const [monthName, year] = monthAndYear.split(" ");
    const monthIndex = new Date(`${monthName} 1, 2000`).getMonth();
    const yearAsNumber = parseInt(year);

    const filteredCustomers = customers.map((customer) => ({
      ...customer,
      transactions: customer.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.timestamp);
        return (
          transactionDate.getMonth() === monthIndex &&
          transactionDate.getFullYear() === yearAsNumber
        );
      }),
    }));

    const totalPoints = filteredCustomers.map((customer) => {
      if (customer?.transactions?.length > 0) {
        return customer.transactions.reduce((accumulator, currentItem) => {
          return accumulator + calculatePoints(currentItem.amount);
        }, 0);
      } else {
        return 0;
      }
    });

    return totalPoints.map((points) => (points === 0 ? 0 : Math.ceil(points)));
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id}>
                {column.sortable ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={() => handleSort(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <LoadingSpinner />
          ) : customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{getPoints(twoMonthsAgo)[index]}</td>
                <td>{getPoints(previousMonth)[index]}</td>
                <td>{getPoints(selectedMonth)[index]}</td>
                <td>
                  {parseInt(getPoints(selectedMonth)[index]) +
                    parseInt(getPoints(previousMonth)[index]) +
                    parseInt(getPoints(twoMonthsAgo)[index])}
                </td>
              </tr>
            ))
          ) : (
            <tr style={{ color: "red" }}>
              <td colSpan={6}>No Results Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RewardsTable;
