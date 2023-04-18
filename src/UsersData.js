import React, { useEffect, useState } from "react";
import { getData } from "./Api";
import Table from "react-bootstrap/Table";

export default function UsersApp() {
  const [users, setUsers] = useState([]); //this setUser function is being called in the getDate(setUsers) and this getDate(setUsers) is then being called in api.js
  const [ageSortOrder, setAgeSortOrder] = useState("asc");
  const [nameSortOrder, setNameSortOrder] = useState("asc");

  useEffect(() => {
    getData(setUsers); //here
  }, []);

  const sortUsersNames = () => {
    const sortUserNames = [...users];
    if (nameSortOrder === "asc") {
      sortUserNames.sort((a, b) => {
        return a.name.first.concat(a.name.last) >
          b.name.first.concat(b.name.last)
          ? 1
          : a.name.first.concat(a.name.last) < b.name.first.concat(b.name.last)
          ? -1
          : 0;
      });
      setUsers(sortUserNames);
      setNameSortOrder("des");
    } else {
      sortUserNames.sort((a, b) =>
        a.name.first.concat(a.name.last) < b.name.first.concat(b.name.last)
          ? 1
          : a.name.first.concat(a.name.last) > b.name.first.concat(b.name.last)
          ? -1
          : 0
      );

      setUsers(sortUserNames);
      setNameSortOrder("asc");
    }
  };

  const sortUsersAges = () => {
    const sortUserAges = [...users];
    if (ageSortOrder === "asc") {
      sortUserAges.sort((a, b) => a.dob.age - b.dob.age);
      setUsers(sortUserAges);
      setAgeSortOrder("des");
    } else {
      sortUserAges.sort((a, b) => b.dob.age - a.dob.age);
      setUsers(sortUserAges);
      setAgeSortOrder("asc");
    }
  };

  return (
    <>
      <Table className="users-data">
        <thead>
          <h1 className="main-heading">Display Users Data !</h1>
          <tr>
            <th className="table-heading">
              User Names
              <span onClick={() => sortUsersNames()}>
                <br />
                <i>↑</i>
                <br />
              </span>
            </th>
            <th className="table-heading">
              Ages
              <span onClick={() => sortUsersAges()}>
                <br />
                <i>↑</i>
                <br />
              </span>
            </th>
            <th className="table-heading">Phone #</th>
            <th className="table-heading">Email Addresses</th>
            <th className="table-heading">Locations</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id.value ? user.id.value : user.name.first}>
              {/*if value doesn't exist, or is null, then assign name.first(conditional rendering)*/}
              <td>
                {user.name.first} {user.name.last}
              </td>
              <td>{user.dob.age}</td>
              <td>{user.phone}</td>
              <td>{user.email}</td>

              <td>
                {user.location.city}, {user.location.state}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
