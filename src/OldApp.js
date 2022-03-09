import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Table, Form } from 'react-bootstrap';

function OldApp() {
  const [countries, setCountries] = useState([]);
  const [searchCapital, setSearchCapital] = useState("");
  const [searchAll, setSearchAll] = useState("");
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
      .then(res => { setCountries(res.data); console.log(res.data) })
      .catch(err => {
        console.log(err);
      })
  }, []);
  
  return (
    <div className="OldApp">
      <div><Form>

        <Form.Label>Search For Capital</Form.Label>
        <Form.Control type="text" placeholder="Enter Capital" onChange={(e) => setSearchCapital(e.target.value)} />
        <br />
        <Form.Control type="text" placeholder="Enter Search Words" onChange={(e) => setSearchAll(e.target.value)} />
        <br />


      </Form>
      </div>
      <br />
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>countries</th>
              <th>name</th>
              <th>capital</th>
              <th>region</th>
              <th>flag</th>
            </tr>
          </thead>
          <tbody>
            {
              !searchCapital && !searchAll &&
              countries.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.capital}</td>
                    <td>{item.region}</td>
                    <td><img src={item.flag} alt={item.name} style={{ width: "100px" }} /></td>

                  </tr>
                );

              })
            }
            {
              searchCapital && countries.filter((count) => {
                if (searchCapital === "") {
                  return count
                } else if ((count.capital || '').toLowerCase().includes(searchCapital.toLowerCase())) {
                  return count
                }
              }).map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.capital}</td>
                    <td>{item.region}</td>
                    <td><img src={item.flag} alt={item.name} style={{ width: "100px" }} /></td>

                  </tr>
                );

              })
            }
            {
              searchAll && countries.filter((count) => {
                if (searchAll === "") {
                  return count
                } else if ((count.name || "").toLowerCase().includes(searchAll.toLowerCase())
                  || (count.capital || "").toLowerCase().includes(searchAll.toLowerCase())
                  || (count.region || "").toLowerCase().includes(searchAll.toLowerCase())) {
                  return count
                }
              }).map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.capital}</td>
                    <td>{item.region}</td>
                    <td><img src={item.flag} alt={item.name} style={{ width: "100px" }} /></td>

                  </tr>
                );

              })
            }

          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default OldApp;