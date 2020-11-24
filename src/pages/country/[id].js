import Axios from "axios";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import styles from "./Country.module.css";

const getCountry = async (id) => {
  const countryDetails = await Axios.get(
    `https://restcountries.eu/rest/v2/alpha/${id}`
  );

  return countryDetails.data;
};

const Country = ({ country }) => {
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    const getBorderingCountries = async () => {
      const borders = await Promise.all(
        country.borders.map((border) => getCountry(border))
      );

      setBorderCountries(borders);
    };

    getBorderingCountries();
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img src={country.flag} alt={country.name}></img>

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {country.population}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>

              <div className={styles.overview_area}>
                <div className={styles.overview_value}>
                  {country.area} sq km
                </div>
                <div className={styles.overview_label}>Area</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Languages</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Gini</div>
              <div className={styles.details_panel_value}>{country.gini}</div>
            </div>
            {borderCountries.length > 0 ? (
              <div className={styles.details_panel_borders}>
                <div className={styles.details_panel_borders_label}>
                  Neighbouring Countries
                </div>

                <div className={styles.details_panel_borders_container}>
                  {borderCountries.map(({ flag, name }) => (
                    <div className={styles.details_panel_borders_country}>
                      <img src={flag} alt={name}></img>

                      <div className={styles.details_panel_borders_name}>
                        {name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Country;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountry(params.id);

  return {
    props: {
      country,
    },
  };
};
