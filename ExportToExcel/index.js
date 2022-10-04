const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Worksheet Name");
const axios = require("axios");

const url = "http://localhost:9090/results";

async function fetchData() {
	const request = await axios.get(url);
	const data = request.data;

	const headingColumnNames = [
		"Hospital",
		"Category",
		"Region",
		"Address",
		"Telephone",
	];
	//Write Column Title in Excel file
	let headingColumnIndex = 1;
	headingColumnNames.forEach((heading) => {
		ws.cell(1, headingColumnIndex++).string(heading);
	});
	//Write Data in Excel file
	let rowIndex = 2;
	data.forEach((record) => {
		let columnIndex = 1;
		Object.keys(record).forEach((columnName) => {
			ws.cell(rowIndex, columnIndex++).string(record[columnName]);
		});
		rowIndex++;
	});
	wb.write("data.xlsx");
}

fetchData();

// console.log(data);
