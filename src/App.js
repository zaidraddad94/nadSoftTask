import logo from "./logo.svg";
import "./App.css";
import queries from "./api";
import { useEffect, useState } from "react";
import BasicCard from "./components/card";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import EnhancedTable from "./components/table";
import TextField from "@mui/material/TextField";

function App() {
  let [cases, setCases] = useState(0);
  let [deaths, setDeaths] = useState(0);
  let [recovered, setRecovered] = useState(0);
  let [countries, setCountries] = useState([]);
  let [Allcountries, setAllCountries] = useState([]);

  let [searchTerm, setSearchTerm] = useState("");

  let getData = async () => {
    let data = (await queries.summary({})) ?? {};
    console.log("asdsads", data.data);

    if (data?.status == 200) {
      setCases(data.data.Global.TotalConfirmed);
      setDeaths(data.data.Global.TotalDeaths);
      setRecovered(data.data.Global.TotalRecovered);

      let dataForCountries =
        data?.data?.Countries?.map((ele) => {
          return {
            countries: ele.Country,
            cases: ele.NewConfirmed,
            deaths: ele.NewDeaths,
            recovered: ele.NewRecovered,
          };
        }) ?? [];

      setAllCountries(dataForCountries);
      setCountries(dataForCountries);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(searchTerm);
    setCountries(
      Allcountries.filter((Country) => {
        return Country.countries.includes(searchTerm.trim());
      })
    );
  }, [searchTerm]);
  return (
    <div className="App">
      <Container>
        <Grid
          style={{ marginTop: 50 }}
          container
          justifyContent="center"
          spacing={1}
        >
          <BasicCard title={"cases"} number={cases} />
          <BasicCard title={"deaths"} number={deaths} />
          <BasicCard title={"recovered"} number={recovered} />
          </Grid>

          <TextField
            style={{ marginTop: 50, marginBottom:20 }}
            value={searchTerm}
            onChange={(term) => {
              setSearchTerm(term.target.value);
            }}
            id="outlined-basic"
            label="country search"
            variant="outlined"
          />

          <view style={{ marginTop: 20, width: null }}>
            <EnhancedTable rows={countries} />
          </view>
        
      </Container>
    </div>
  );
}

export default App;
