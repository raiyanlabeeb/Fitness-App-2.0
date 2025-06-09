import React, { useEffect, useState } from "react";

const TestMessage = () => {
  const [users, setUsers] = useState([]); // users is an array

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((result) => setUsers(result))
      .catch((err) => console.log(err));
  }, []);

  if (users.length === 0) {
    return <p>Loading...</p>;
  }

  // need to commit
  return (
    <>
      {users.map((user) => (
        <p key={user.id}>
          {"Name: " + user.name} {"Email: " + user.email} 
        </p>
      ))}
    </>
  );
};

export default TestMessage;
