import Axios from "axios";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput";
import CountryTable from "../components/CountryTable";
import { useState } from "react";

export default function Home({ countries }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSearchTerm = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value.trim());
  };

  return (
    <Layout>
      <div className={styles.count}>Loaded {countries.length} countries</div>
      <SearchInput placeholder="Search by country" onChange={getSearchTerm} />
      <CountryTable countries={filteredCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const countries = await Axios.get("https://restcountries.eu/rest/v2/all");
  return {
    props: {
      countries: countries.data ?? [],
    },
  };
};
