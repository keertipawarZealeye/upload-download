const XLSX = require("xlsx");
// Sample data to be exported
const sampleData = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' },
  { name: 'Keerti Pawar', age: 23, email: 'keerti@gmail.com' },
];

const downloadController = async(req,res)=>{
    // Create a new workbook and add a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(sampleData);
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    // Write workbook to a buffer
    const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  
    // Set headers and send the buffer as a downloadable file
    res.setHeader('Content-Disposition', 'attachment; filename="data.xlsx"');
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(buffer);
}
module.exports = {
  downloadController
};
