// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/bar
import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    country: "AD",
    "hot dog": 114,
    "hot dogColor": "hsl(338, 70%, 50%)",
    burger: 62,
    burgerColor: "hsl(352, 70%, 50%)",
    sandwich: 101,
    sandwichColor: "hsl(233, 70%, 50%)",
    kebab: 152,
    kebabColor: "hsl(198, 70%, 50%)",
    fries: 93,
    friesColor: "hsl(128, 70%, 50%)",
    donut: 8,
    donutColor: "hsl(348, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 180,
    "hot dogColor": "hsl(75, 70%, 50%)",
    burger: 129,
    burgerColor: "hsl(288, 70%, 50%)",
    sandwich: 135,
    sandwichColor: "hsl(204, 70%, 50%)",
    kebab: 198,
    kebabColor: "hsl(310, 70%, 50%)",
    fries: 71,
    friesColor: "hsl(267, 70%, 50%)",
    donut: 131,
    donutColor: "hsl(319, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 184,
    "hot dogColor": "hsl(21, 70%, 50%)",
    burger: 137,
    burgerColor: "hsl(197, 70%, 50%)",
    sandwich: 72,
    sandwichColor: "hsl(240, 70%, 50%)",
    kebab: 1,
    kebabColor: "hsl(236, 70%, 50%)",
    fries: 87,
    friesColor: "hsl(127, 70%, 50%)",
    donut: 96,
    donutColor: "hsl(181, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 196,
    "hot dogColor": "hsl(142, 70%, 50%)",
    burger: 5,
    burgerColor: "hsl(263, 70%, 50%)",
    sandwich: 130,
    sandwichColor: "hsl(141, 70%, 50%)",
    kebab: 95,
    kebabColor: "hsl(332, 70%, 50%)",
    fries: 47,
    friesColor: "hsl(133, 70%, 50%)",
    donut: 70,
    donutColor: "hsl(262, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 75,
    "hot dogColor": "hsl(244, 70%, 50%)",
    burger: 165,
    burgerColor: "hsl(252, 70%, 50%)",
    sandwich: 67,
    sandwichColor: "hsl(138, 70%, 50%)",
    kebab: 51,
    kebabColor: "hsl(135, 70%, 50%)",
    fries: 197,
    friesColor: "hsl(182, 70%, 50%)",
    donut: 110,
    donutColor: "hsl(332, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 107,
    "hot dogColor": "hsl(181, 70%, 50%)",
    burger: 170,
    burgerColor: "hsl(268, 70%, 50%)",
    sandwich: 82,
    sandwichColor: "hsl(245, 70%, 50%)",
    kebab: 171,
    kebabColor: "hsl(256, 70%, 50%)",
    fries: 76,
    friesColor: "hsl(244, 70%, 50%)",
    donut: 156,
    donutColor: "hsl(7, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 66,
    "hot dogColor": "hsl(333, 70%, 50%)",
    burger: 147,
    burgerColor: "hsl(339, 70%, 50%)",
    sandwich: 170,
    sandwichColor: "hsl(268, 70%, 50%)",
    kebab: 24,
    kebabColor: "hsl(163, 70%, 50%)",
    fries: 188,
    friesColor: "hsl(237, 70%, 50%)",
    donut: 57,
    donutColor: "hsl(141, 70%, 50%)",
  },
];

const BarChart = () => (
  <ResponsiveBar
    data={data}
    keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
    indexBy="country"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "country",
      legendPosition: "middle",
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "food",
      legendPosition: "middle",
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    legends={[
      {
        dataFrom: "keys",
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: "left-to-right",
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: "hover",
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={(e) =>
      e.id + ": " + e.formattedValue + " in country: " + e.indexValue
    }
  />
);

export default BarChart;
