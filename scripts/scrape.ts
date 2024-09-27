// @ts-nocheck
// not gonna bother to check because this is a one-time script (i also wrote it in like 10 minutes)

import fetch from "node-fetch";
import * as cheerio from "cheerio";
import { mkdirSync, readdirSync, writeFileSync } from "fs";
import { savePartialSkylander, wipePartialSkylanders } from "../utils/database";

const links = [
  "https://skylanderscharacterlist.com/spyros-adventure-figures/",
  "https://skylanderscharacterlist.com/giants-figures/",
  "https://skylanderscharacterlist.com/swap-force-figures/",
  "https://skylanderscharacterlist.com/trap-team-figures/",
  "https://skylanderscharacterlist.com/superchargers-figures/",
  "https://skylanderscharacterlist.com/imaginators-figures/",
];

interface Figure {
  category: string;
  image: string;
  name: string;
  link: string;
  game: string;
}

const figures: Figure[] = [];
const categories = [];

async function scrapeFigures() {
  for (const link of links) {
    console.log(`scraping ${link}...`);
    const html = await fetch(link);
    const body = await html.text();

    const $ = cheerio.load(body);
    const figureElements = $(".fusion-builder-row.fusion-row ");
    const validCategories: any = [];
    figureElements.each((index, element) => {
      const category = $(element).find("h3").text();
      if (category.length > 0) {
        validCategories.push(element);
        categories.push(category);
        console.log(`found category: ${category}`);
      }
    });

    validCategories.forEach((cat: any) => {
      const figureElements = $(cat).find(
        ".fusion-column-wrapper.fusion-column-has-shadow.fusion-flex-justify-content-flex-start.fusion-content-layout-column"
      );
      figureElements.each((index, element) => {
        const figure = {
          category: $(cat).find("h3").text(),
          image: $(element).find("img").attr("data-lazy-srcset"),
          name: $(element).find("h6"),
          link: $(element).find("a").attr("href"),
          game: link.split("/")[3],
        };
        if (!figure.image || !figure.name || !figure.link || !figure.category) {
          return;
        } else {
          figure.image = figure.image.split(" ")[2];
          figure.name = $(figure.name).find("a").text();
        }
        console.log(`found figure: ${figure.name}`);
        figures.push(figure);
      });
    });
  }
}

function sanitizeFilename(name) {
  name = name.replace("\n", " ").trim();
  const illegalCharacters = /[\/\?<>\\:\*\|":]/g;
  return name.replace(illegalCharacters, "");
}

async function main() {
  console.log("scraping partial figures...");
  await scrapeFigures();
  console.log("partial figures scraped successfully");
  console.log(`total figures scraped: ${figures.length}`);
  console.log("saving partial figures...");
  /* skip file saving for now... db is faster. 
  for (const figure of figures) {
    if (!figure.image || !figure.name || !figure.link || !figure.category) {
      continue;
    }

    const figureDirectory = `./figures/${figure.game}`;
    const figurePath = `${figureDirectory}/${sanitizeFilename(
      figure.name
    )}.json`;
    try {
      await readdirSync(figureDirectory);
    } catch (e) {
      await mkdirSync(figureDirectory);
      console.log(`created directory: ${figureDirectory}`);
    }

    await writeFileSync(figurePath, JSON.stringify(figure));

    console.log(`saved figure: ${figure.name}`);
  }
    // */
  console.log("partial figures saved successfully");
  console.log("saving figures to database...");

  await wipePartialSkylanders();

  for (const figure of figures) {
    if (!figure.image || !figure.name || !figure.link || !figure.category) {
      continue;
    }

    await savePartialSkylander(figure);
    console.log(`saved figure to database: ${figure.name}`);
  }

  console.log("figures saved to database successfully");
  console.log("done!");
  console.log("categories found:", categories);
  process.exit(0);
}

main();
