import styles from "./statistics.module.css";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { ShoppingListForStats } from "components/shoplist";
import { getListsStats, sortByMostPopularItem, sortCategoriesStats } from "lib";
import { useEffect, useState } from "react";
import { StatsBox } from "ui/icons/cards/statsBox";

export function StatisticsComponent() {
  const [statistics, setStatistics] = useState(null) as any;
  const [categoriesStats, setCategoriesStats] = useState({}) as any;
  const [itemStats, setItemStats] = useState() as any;

  async function pullListsStats() {
    const stats = await getListsStats();
    const newObj = stats.map((stat: any) => {
      return {
        date: stat.value.date,
        items: stat.value.totalItems,
        categories: stat.value.catStats,
        itemsColl: stat.value.items,
      };
    });

    setStatistics(newObj);

    // first chart : categories
    const result = sortCategoriesStats(newObj);
    const itemsArr = newObj.map((p) => p.itemsColl);
    const popularItems = sortByMostPopularItem(itemsArr);

    if (result && popularItems) {
      setCategoriesStats(result);
      setItemStats(popularItems);
    }
  }

  useEffect(() => {
    pullListsStats();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.charts_manager}>
        <div className={styles.top}>
          <div className={styles.chart}>
            <p className={styles.chart_title}>Top Items</p>
            <div>
              {itemStats?.map((item) => {
                return (
                  <StatsBox
                    max={100}
                    value={item.quantity}
                    width={"300px"}
                    label={item.name}
                    color="var(--orange)"
                  />
                );
              })}
            </div>
          </div>
          {categoriesStats != null ? (
            <div className={styles.chart}>
              <p className={styles.chart_title}>Top categories</p>
              <div>
                <StatsBox
                  max={100}
                  value={categoriesStats?.meat}
                  width={"300px"}
                  label="Meat & Fish"
                  color="lightblue"
                />
              </div>
              <div>
                <StatsBox
                  max={100}
                  value={categoriesStats?.fruit}
                  width={"300px"}
                  label="Fruits"
                  color="lightblue"
                />
              </div>
              <div>
                <StatsBox
                  max={300}
                  value={categoriesStats?.vegetables}
                  width={"300px"}
                  label="Vegetables"
                  color="lightblue"
                />
              </div>
              <div>
                <StatsBox
                  max={100}
                  value={categoriesStats?.beverages}
                  width={"300px"}
                  label="Beverages"
                  color="lightblue"
                />
              </div>
              <div>
                <StatsBox
                  max={100}
                  value={categoriesStats?.pasta}
                  width={"300px"}
                  label="Pasta"
                  color="lightblue"
                />
              </div>
              <div>
                <StatsBox
                  max={100}
                  value={categoriesStats?.dairy}
                  width={"300px"}
                  label="Dairy Products"
                  color="lightblue"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        {statistics ? (
          <div className={styles.big_chart}>
            <p style={{ textAlign: "center" }}>Items ratio</p>
            <div>
              <LineChart width={600} height={400} data={statistics}>
                <Line
                  type="monotone"
                  dataKey="items"
                  stroke="var(--cordovan)"
                  strokeWidth={3}
                  y1={100}
                  y2={100}
                />
                <CartesianGrid stroke="black" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
              </LineChart>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={styles.shopping_list_container}>
        <ShoppingListForStats />
      </div>
    </div>
  );
}
