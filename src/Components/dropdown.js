import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import InfoBox from "./InfoBox";
import './component.css';
import Table from './table'
import Graph from './Graph2'
import { sortData } from './utility';

export default function Dropdown() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
  }
  console.log("Info>>> ", countryInfo)
  return (
    <div className="app">
      <div className="header">
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="stats">
        <InfoBox title="Corona Cases Today" cases={countryInfo.todayCases} total={countryInfo.cases} /><br />
        <InfoBox title="Recovered Today" cases={countryInfo.todayRecovered} total={countryInfo.recovered} /><br />
        <InfoBox title="Deaths Today" cases={countryInfo.todayDeaths} total={countryInfo.deaths} /><br />
      </div>
      <div className="table">
        <Table countries={tableData} />
      </div>
      <div className="Graph2">
        <Graph countries={tableData} />
      </div>
    </div>

  );
}