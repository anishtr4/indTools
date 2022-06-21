import { useEffect, useRef, useState } from "react";

import React from "react";

const { ipcRenderer } = require("electron");

// Import the modules we need
// const rp = require("request-promise");
// const otcsv = require("objects-to-csv");
const cheerio = require("cheerio").default;
// const excel = require("exceljs");
// var json2xls = require('json2xls');
const xl = require("excel4node");
const wb = new xl.Workbook();
const ws = wb.addWorksheet("Worksheet Name");
var fs = require("fs");
var XLSX = require("xlsx");
var xlsx = require("node-xlsx");
import { Button, message, Steps, Upload, List, Input } from "antd";

import { UploadOutlined } from "@ant-design/icons";

const { Step } = Steps;

const steps = [
  {
    title: "HTML",
    content: "First-content",
  },
  {
    title: "EXCEL",
    content: "Second-content",
  },
  {
    title: "FINAL",
    content: "Last-content",
  },
];
message.config({
  // right:0,
  bottom: 0,
  duration: 2,
  maxCount: 1,
  prefixCls: "app-notification ant-message",
});

function Translator(props) {
  console.log("Dashboard props", props);

  const ref = useRef();
  const updatedExcel = useRef();
  const [sourceFile, setFile] = useState([]);
  const [showResults, setShowResults] = React.useState(true);
  const [current, setCurrent] = useState(0);
  const [fileList1, setFileList1] = useState([]);
  const [fileList2, setFileList2] = useState([]);
  const [fileName, setFileName] = useState("translated");

  const onChangeHandler = (event) => {
    setFileName(event.target.value);
  };

  const next = () => {
    if (current == 0) {
      console.log("gg");

      //   const withTitle = files.map(({ name }) => ({
      //     name
      //   }));
      // setFile((oldFile) => [...oldFile, ...fileList1]);

      // Call the method
      if (fileList1[0]) {
        getCountriesData(fileList1[0].path)
          .then((data) => {
            console.log("data", data);

            const headingColumnNames = ["Name", "Replace"];
            //Write Column Title in Excel file
            let headingColumnIndex = 1;
            headingColumnNames.forEach((heading) => {
              ws.cell(1, headingColumnIndex++).string(heading);
            });
            ws.column(1).setWidth(300);

            //Write Data in Excel file
            let rowIndex = 2;
            data.forEach((record) => {
              let columnIndex = 1;
              Object.keys(record).forEach((columnName) => {
                ws.cell(rowIndex, columnIndex++).string(record[columnName]);
              });
              rowIndex++;
            });

            window.ipcRenderer.invoke("file-request").then((path) => {
              wb.write(path + "/updatedFiles.xlsx");
              setShowResults(false);
              message.success("Excel file generated");
              setCurrent(current + 1);
            });
          })
          .then(() => {
            console.log("Web Scrape Complete!");
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        message.warning("Please select file");
      }
    }

    if (current == 1) {
      if (fileList2[0]) {
        setCurrent(current + 1);
      } else {
        message.warning("Please select updated excel file");
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const translate = () => {
    if (fileName) {
      setCountriesData(fileList2[0].path)
        .then((data) => {
          // console.log(data);
        })
        .then(() => {
          console.log("Web Scrape Complete!");
          // message.success('Output Html generated')
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      message.warning("Please enter file name");
    }
  };

  // Define the method for collecting the data
  const getCountriesData = async (path) => {
    // const html = await rp(baseURL + countriesURL);
    // cheerio("body :not(script)", fs.readFileSync('./index.html').contents)

    // const $ = cheerio.load(fs.readFileSync('./index.html')).html()
    const $ = cheerio.load(fs.readFileSync(path), null, true);

    // console.log('is',  $('body :not(script)').contents());
    let is = $("body :not(script)")
      .contents()
      .filter(function () {
        return (
          this.nodeType === 3 &&
          this.data != undefined &&
          this.data.trim() != ""
        );
      })
      .map(async (index, element) => {
        const name = element.data; // Get the country name
        console.log("name", name);
        return {
          name,
        };
      })
      .get();
    return Promise.all(is);
  };

  const setCountriesData = async (path) => {
    console.log("pathsss", path);
    // var workbook = xlsx.parse(fs.readFileSync(path));
    var workbook = XLSX.read(fs.readFileSync(path));
    console.log("workbook", workbook);
    var sheet_name_list = workbook.SheetNames;

    const $ = cheerio.load(fs.readFileSync(fileList1[0].path), null, true);
    let is = $("body :not(script)").contents();

    sheet_name_list.forEach(function (y) {
      var worksheet = workbook.Sheets[y];
      var headers = {};
      var data = [];

      console.log("worksheet", worksheet);
      for (var z in worksheet) {
        if (z[0] === "!") continue;
        //parse out the column, row, and value
        var col = z.substring(0, 1);
        var row = parseInt(z.substring(1));
        var value = worksheet[z].v;

        //store header names
        if (row == 1) {
          headers[col] = value;
          continue;
        }

        if (!data[row]) data[row] = {};
        data[row][headers[col]] = value;
      }
      //drop those first two rows which are empty
      data.shift();
      data.shift();
      console.log("is",  is.filter(function () {
                        return this.nodeType === 3 &&  this.data != undefined && this.data.trim() != "";

          }));

  
      data.forEach(function (item, mainindex) {
        if (item.Replace && item.Replace.trim().length) {
 
           console.log("is",  is.filter(function () {
                        return this.nodeType === 3 &&  this.data != undefined && this.data.trim() != "";

          }).filter((index) => index == mainindex));


       

is.filter(function () {
                        return this.nodeType === 3 &&  this.data != undefined && this.data.trim() != "" ;

          }).filter((index) => index == mainindex).replaceWith(function (index) {
                return this.nodeValue.replace(item.Name, item.Replace);

              });



 //          is.filter(function () {
 //            return this.nodeType === 3 &&  this.data != undefined && this.data.trim() != "";
 //          }).replaceWith(function (index) {
         
 // console.log("mainindex", mainindex);
 //           console.log("index", index);
 //         if(mainindex == index){
 //               return this.nodeValue.replace(item.Name, item.Replace);

 //         }else{
 //          return this;
 //         }
           
           
 //          });
        }
      });
   

      window.ipcRenderer.invoke("file-request").then((path) => {
        console.log("path", path);
        fs.writeFileSync(path + "/" + fileName + ".html", $.html(), {
          encoding: "utf-8",
        });
        message.success("Output Html generated");
      });

      // return data;
    });

    // workbook.forEach(function(item) {

    //     item.data.forEach(function(item) {
    //       console.log('itemReplace',item);
    //         if(item.Replace){
    //             console.log('itemReplace',item.Replace);
    //             is.filter(function() {
    //                 return this.nodeType === 3
    //           }).replaceWith(function() {
    //               return  this.nodeValue.replace(item.Name,item.Replace);
    //           });
    //         }

    //      });

    //     fs.writeFileSync('/Users/anishrajan/Downloads/cheerio-tutorial-main/myx.html', $.html(), {'encoding': 'utf-8'});

    //      console.log('item', item);
    //   //   console.log('is',  $.html(is));

    //      window.ipcRenderer.send("file-request");

    //      window.ipcRenderer.on("file", (event, file) => {
    //        console.log("obtained file from main process: " + file);

    //       //  fs.writeFile(filess, $.html(), {encoding: 'utf8' , flag:'w'} );
    //       fs.writeFileSync(file+'/newht.html', $.html(), {'encoding': 'utf-8'});

    //      });

    // });
  };

  const uploadProps1 = {
    onRemove: (file) => {
      const index = fileList1.indexOf(file);
      const newFileList = fileList1.slice();
      newFileList.splice(index, 1);
      setFileList1(newFileList);
    },
    beforeUpload: (file) => {
      setFileList1([...fileList1, file]);
      return false;
    },
    fileList1,
    defaultFileList: [...fileList1],
  };

  const uploadProps2 = {
    onRemove: (file) => {
      const index = fileList2.indexOf(file);
      const newFileList = fileList2.slice();
      newFileList.splice(index, 1);
      setFileList2(newFileList);
    },
    beforeUpload: (file) => {
      setFileList2([...fileList2, file]);
      return false;
    },
    fileList2,
    defaultFileList: [...fileList2],
  };

  function stepcontent(current) {
    console.log("fileList1", fileList1);
    console.log("fileList2", fileList2);

    if (current == 0) {
      return (
        <div
          style={{
            height: 200,
            width: 400,
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Upload {...uploadProps1} fileList={[...fileList1]}>
            <Button icon={<UploadOutlined />}>Upload Html</Button>
          </Upload>
        </div>
      );
    }

    if (current == 1) {
      return (
        <div
          style={{
            height: 200,
            width: 400,
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Upload {...uploadProps2} fileList={[...fileList2]}>
            <Button icon={<UploadOutlined />}>Upload Excel</Button>
          </Upload>
        </div>
      );
    }

    if (current == 2) {
      return (
        <div
          style={{
            height: 200,
            width: 400,
            margin: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            style={{ width: 200 }}
            placeholder="file name"
            addonAfter=".html"
            onChange={onChangeHandler}
            value={fileName}
          />
        </div>
      );
    }
  }

  return (
    <>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{stepcontent(current)}</div>

      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => translate()}>
            Translate
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>

    
  );
}

export default Translator;
