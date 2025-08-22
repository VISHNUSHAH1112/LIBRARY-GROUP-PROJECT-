import { useEffect, useState } from "react";


export default function Fines() {
  const [fines, setFines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/fines")
      .then((res) => res.json())
      .then((data) => setFines(data));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Fines Records</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Member Name</th>
            <th>Book Name</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Fine Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {fines.map((fine) => (
            <tr key={fine.id}>
              <td>{fine.id}</td>
              <td>{fine.memberName}</td>
              <td>{fine.bookName}</td>
              <td>{fine.dueDate}</td>
              <td>{fine.returnDate}</td>
              <td>{fine.fineAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
