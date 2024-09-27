import * as cheerio from "cheerio";
import fetch from "node-fetch";

export async function getSkylanderData(
  partial: PartialSkylander
): Promise<Skylander> {
  const response = await fetch(partial.link);
  const html = await response.text();
  const $ = cheerio.load(html);

  const skylander: Skylander = {
    name: partial.name,
    link: partial.link,
    image: partial.image,
    category: partial.category,
    game: partial.game,
    element: "",
    releasedWith: "",
    series: "",
    price: "",
  };

  const basicInfoDiv = $("#tab-0ee9a008cffb9186d57")
    .find("table")
    .find("tbody");
  const basicInfo = $(basicInfoDiv).find("tr").find("td");
  skylander.element = $(basicInfo[0]).text();
  skylander.releasedWith = $(basicInfo[1]).text();
  skylander.series = $(basicInfo[2]).text();

  const priceUrl = `https://skylanderscharacterlist.com/shop/${
    skylander.link.split("/")[3]
  }/`;
  const priceResponse = await fetch(priceUrl);
  const priceHtml = await priceResponse.text();
  const price$ = cheerio.load(priceHtml);

  const price = price$(".price-item.price-item--regular")
  if (price.length > 0) {
    skylander.price = price.text().replaceAll("\n", "").trim();
  } else {
    skylander.price = "N/A";
  }
  return skylander;
}
