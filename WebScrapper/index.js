import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
import fetch from "node-fetch";
import express from "express";
import cors from "cors";
import cheerio from "cheerio"
const app = express();

app.use(cors());

app.get("/", function (req, res) {
	res.send(
		'<h1>This Is My Web Scrapper Project</h1><h2>Please Go to <a href="http://localhost:9090/results">Result Page</a></h2>'
	);
});

app.get("/results", (req, res) => {
	async function BemmyWebScrapping() {
		try {
			const response = await fetch(
				"https://ethiopianhealthdirectory.com/index.php?option=com_mtree&task=listall&cat_id=79&Itemid=435"
			);
			const body = await response.text();
			const $ = cheerio.load(body);

			const items = [];
			$(".listing-summary").map((i, el) => {
				const hospital = $(el).find(".header > h3 > a").text();
				const category = $(el).find(".category > a").text();
				const region = $(el).find("#field_31 > .output").text();
				const address = $(el).find(".address").text();
				const telephone = $(el)
					.find("#field_9 > .output")
					.text();

				items.push({
					hospital,
					category,
					region,
					address,
					telephone,
				});
			});
			console.log("Web Scrapper Working...");
			res.json(items);
		} catch (error) {
			console.log(error);
		}
	}
	BemmyWebScrapping();
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
