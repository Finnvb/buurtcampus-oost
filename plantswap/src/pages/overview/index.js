import { GraphQLClient, gql } from "graphql-request";
import Layout from "components/layout";
import classes from "../../styles/overviewpage.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
function OverviewPage({ stekjes }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(stekjes);

  let filters = ["Makkelijk", "Uitdagend"];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = stekjes.filter(
          (item) => item.categories[0].naam === selectedCategory
        );
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...stekjes]);
    }
  };

  return (
    <>
      <Layout title="Plantswap overview">
        <h1 className={classes.header}>Alle stekjes</h1>

        <div>
          <div className={classes.buttonsContainer}>
            {filters.map((category, idx) => (
              <button
                onClick={() => handleFilterButtonClick(category)}
                className={`${classes.categoryBtn} ${
                  selectedFilters?.includes(category) ? `${classes.active}` : ""
                }`}
                key={`filters-${idx}`}
              >
                {category}
              </button>
            ))}
            <input
              className={classes.searchBar}
              type="text"
              placeholder="Search.."
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            ></input>
          </div>

          <div className="items-container">
            <ul className={classes.plantContainer}>
              {filteredItems
                .filter((item) => {
                  if (searchTerm == "") {
                    return item;
                  } else if (
                    item.naam.toLowerCase().includes(searchTerm.toLowerCase())
                  ) {
                    return item;
                  }
                })
                .map((item, i) => (
                  <li key={`items-${i}`}>
                    <Link className={classes.link} href={`overview/${item.id}`}>
                      <div className={classes.plantItem}>
                        <Image
                          className={classes.plantImg}
                          src={item.fotos[0].url}
                          alt={item.naam}
                          width="300"
                          height="330"
                        />

                        <p className={classes.plantName}>{item.naam}</p>
                        <p className={classes.category}>
                          {item.categories[0].naam}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}

const graphcms = new GraphQLClient(
  "https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clbe0wlb32hx401ui0c2yfm49/master"
);

const QUERY = gql`
  query {
    stekjes {
      naam
      slug
      categories {
        naam
      }
      id
      fotos {
        url
      }
    }
  }
`;

export async function getStaticProps() {
  const { stekjes } = await graphcms.request(QUERY);
  console.log(stekjes);

  return {
    props: {
      stekjes,
    },
    revalidate: 30,
  };
}

export default OverviewPage;
