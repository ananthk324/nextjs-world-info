import Axios from "axios";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput";
import CountryTable from "../components/CountryTable";

export default function Home({ countries }) {
  return (
    <Layout>
      <div className={styles.count}>Loaded {countries.length} countries</div>
      <SearchInput placeholder="Search by country" />
      <CountryTable countries={countries} />
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
