import styles from "./CountryTable.module.css";
import Link from "next/link";

const CountryTable = ({ countries }) => {
  return (
    <div className={styles.table}>
      <div className={styles.heading}>
        <button className={styles.heading_name}>
          <div>Name</div>
        </button>
        <button className={styles.heading_population}>
          <div>Population</div>
        </button>
      </div>
      {countries.length ? (
        countries?.map((country) => (
          <Link
            key={country.alpha3Code}
            href={`/country/${country.alpha3Code}`}
          >
            <a>
              <div className={styles.row} key={country.name}>
                <div className={styles.name}>
                  <img src={country.flag} alt={country.name} />
                  <div>{country.name}</div>
                </div>
                <div className={styles.population}>{country.population}</div>
              </div>
            </a>
          </Link>
        ))
      ) : (
        <div className={styles.row_not_found}>No country found</div>
      )}
    </div>
  );
};

export default CountryTable;
