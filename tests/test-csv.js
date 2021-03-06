var argv = require('minimist')(process.argv.slice(2));
var assert = require('assert')
var XLSX = require('../');
var fs = require('fs')
var INFILE = './test_files/pivot_table_test.xlsm';
var TESTFILE = './test_files/pivot_table_test.xlsm.';
//var INFILE = './test_files/formula_stress_test.xlsb';
//var TESTFILE = './test_files/formula_stress_test.xls.';
var INFILE = './test_files/apachepoi_Tables.xlsx';
var TESTFILE = './test_files/apachepoi_Tables.xlsx.';
var INFILE = './test_files/apachepoi_45540_classic_Footer.xlsx';
var TESTFILE = './test_files/apachepoi_45540_classic_Footer.xlsx.';
var SHEET = argv.p || 0;

function stripbom(x) {
  return x.replace(/^\ufeff/, "");
}
function fixcsv(x) {
  return stripbom(x).replace(/\t/g, ",").replace(/#{255}/g, "").replace(/"/g, "").replace(/[\n\r]+/g, "\n").replace(/\n*$/, "");
}

describe("CSV writer", function () {
  it("Generates CSV", function () {
    wb = XLSX.readFile(INFILE, {cellNF: true});

    //XLSX.writeFile(wb, '/tmp/test-csv.xlsx');
    //var wb = XLSX.readFile('/tmp/test-csv.xlsx', {cellNF: true});

    wb = XLSX.read(XLSX.write(wb, {type: "buffer", bookType: 'xlsx'}), {cellNF: true})


    var csv = fixcsv(XLSX.utils.make_csv(wb.Sheets[wb.SheetNames[SHEET]]))
    var exp = fixcsv(fs.readFileSync(TESTFILE + SHEET + '.csv', 'utf8'))

    assert.equal(csv, exp)
  })
})