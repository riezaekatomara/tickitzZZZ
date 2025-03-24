import React, { createContext, useContext, useState, useCallback } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    firstName: "Rieza",
    lastName: "Eka Tomara",
    email: "riezaekatomara@gmail.com",
    phone: "81271414441",
    countryCode: "+62",
    loyaltyPoints: 320,
    maxPoints: 500,
    masterPoints: 180,
    orders: [
      {
        id: 1,
        movie: "Spider-Man: Homecoming",
        date: "Tuesday, 07 July 2020",
        time: "04:30pm",
        cinema: "/svg/cine.svg",
        status: "active",
        paid: false,
        paymentDue: "June 23, 2023",
        ticketInfo: {
          number: "12321328913829724",
          totalPayment: 30,
          category: "PG-13",
          time: "2:00pm",
          seats: "C4, C5, C6",
          count: 3,
        },
      },
      {
        id: 2,
        movie: "Avengers: End Game",
        date: "Monday, 14 June 2020",
        time: "02:00pm",
        cinema: "ebv.id",
        status: "used",
        paid: true,
        ticketInfo: {
          category: "PG-13",
          time: "2:00pm",
          seats: "C4, C5, C6",
          count: 3,
        },
      },
      {
        id: 3,
        movie: "Avengers: End Game",
        date: "Monday, 14 June 2020",
        time: "02:00pm",
        cinema: "ebv.id",
        status: "used",
        paid: true,
      },
    ],
  });

  const updateUserData = useCallback((newData) => {
    setUserData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
