import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Table, Form, Row, Col } from 'react-bootstrap';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchType, setSearchType] = useState(false);
  const [searchParams, setSearchParams] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all")
      .then(res => {
       setCountries(res.data);
       setFilteredCountries(res.data);
       countryProperties(res.data[0])
        //console.log(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  const countryProperties = (obj) => {
    //console.log(obj)
    setSearchParams(Object.keys(obj));
  }
  const RestCountriesSearch = (e) => {
    console.log(searchType);

    let filteredData = [];
    let itemType = "capital"
    countries.forEach(item => {
      if (!searchType && (item[itemType] || '').toLowerCase().includes(e.toLocaleString("tr-TR"))) {

        filteredData.push(item);
        console.log(item[itemType])
      } else {
        console.log(searchParams);
      }
      // console.log(item);

    });
    setFilteredCountries(filteredData)
  }
  return (
    <div className="App">
      <Row>
        <Col md={3}>
          <Form>

            <Form.Label>Search For Capital</Form.Label>
            <Form.Control type="text" placeholder="Enter Capital" onChange={(e) => RestCountriesSearch(e.target.value)} />
          </Form>
        </Col>
        <Col md={3}>
          <Form>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Search All Countries"
              onChange={() => setSearchType(!searchType)}
            />


          </Form>
        </Col>
      </Row>
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

              filteredCountries.map((item, i) => {
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

export default App;