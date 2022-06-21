// import { useEffect, useRef, useState } from "react";

// import React from "react";

// const { ipcRenderer } = require("electron");

// // Import the modules we need
// // const rp = require("request-promise");
// // const otcsv = require("objects-to-csv");
// const cheerio = require("cheerio").default;
// // const excel = require("exceljs");
// // var json2xls = require('json2xls');
// const xl = require("excel4node");
// const wb = new xl.Workbook();
// const ws = wb.addWorksheet("Worksheet Name");
// var fs = require("fs");
// var XLSX = require('xlsx');
// var xlsx = require('node-xlsx');


// function Dashboard(props) {
//   console.log("Dashboard props", props);

//   const ref = useRef();
//   const updatedExcel = useRef();
//   const [sourceFile, setFile] = useState([]);
//   const [showResults, setShowResults] = React.useState(true); 


//   // Define the method for collecting the data
//   const getCountriesData = async (path) => {
//     // const html = await rp(baseURL + countriesURL);
//     // cheerio("body :not(script)", fs.readFileSync('./index.html').contents)

//     // const $ = cheerio.load(fs.readFileSync('./index.html')).html()
//     const $ = cheerio.load(fs.readFileSync(path), null, true);

//     // console.log('is',  $('body :not(script)').contents());
//     let is = $("body :not(script)")
//       .contents()
//       .filter(function () {
//         return (
//           this.nodeType === 3 &&
//           this.data != undefined &&
//           this.data.trim() != ""
//         );
//       })
//       .map(async (index, element) => {
//         const name = element.data; // Get the country name
//         console.log("name", name);
//         return {
//           name,
//         };
//       })
//       .get();
//     return Promise.all(is);
//   };



//   const setCountriesData = async (path) => {
  
//     console.log('pathsss',path);
//     // var workbook = xlsx.parse(fs.readFileSync(path));
//     var workbook = XLSX.read(fs.readFileSync(path));
//     console.log('workbook',workbook);
//     var sheet_name_list = workbook.SheetNames;

//     const $ = cheerio.load(fs.readFileSync(sourceFile[0].path), null, true);
//     let is = $('body :not(script)').contents();
 


//     sheet_name_list.forEach(function(y) {
//       var worksheet = workbook.Sheets[y];
//       var headers = {};
//       var data = [];
      
//       console.log('worksheet',worksheet);
//       for(var z in worksheet) {
//           if(z[0] === '!') continue;
//           //parse out the column, row, and value
//           var col = z.substring(0,1);
//           var row = parseInt(z.substring(1));
//           var value = worksheet[z].v;
  
//           //store header names
//           if(row == 1) {
//               headers[col] = value;
//               continue;
//           }
  
//           if(!data[row]) data[row]={};
//           data[row][headers[col]] = value;
//       }
//       //drop those first two rows which are empty
//       data.shift();
//       data.shift();
//       data.forEach(function(item) {
//           if(item.Replace){
//               console.log('itemReplace',item.Replace);
//               is.filter(function() {
//                   return this.nodeType === 3 
//             }).replaceWith(function() {
//                 return  this.nodeValue.replace(item.Name,item.Replace);
//             });
//           }
     

     

//        });
//            window.ipcRenderer.send("file-request");

//          window.ipcRenderer.on("file", (event, file) => {
//            console.log("obtained file from main process: " + file);

//           //  fs.writeFile(filess, $.html(), {encoding: 'utf8' , flag:'w'} );
//           fs.writeFileSync(file+'/newht.html', $.html(), {'encoding': 'utf-8'});
           
   
//          });
     
//       // return data;
//   });






//     // workbook.forEach(function(item) {
      
//     //     item.data.forEach(function(item) {
//     //       console.log('itemReplace',item);
//     //         if(item.Replace){
//     //             console.log('itemReplace',item.Replace);
//     //             is.filter(function() {
//     //                 return this.nodeType === 3 
//     //           }).replaceWith(function() {
//     //               return  this.nodeValue.replace(item.Name,item.Replace);
//     //           });
//     //         }
       

       

//     //      });
      
//     //     fs.writeFileSync('/Users/anishrajan/Downloads/cheerio-tutorial-main/myx.html', $.html(), {'encoding': 'utf-8'});


//     //      console.log('item', item);
//     //   //   console.log('is',  $.html(is));
      

//     //      window.ipcRenderer.send("file-request");

//     //      window.ipcRenderer.on("file", (event, file) => {
//     //        console.log("obtained file from main process: " + file);

//     //       //  fs.writeFile(filess, $.html(), {encoding: 'utf8' , flag:'w'} );
//     //       fs.writeFileSync(file+'/newht.html', $.html(), {'encoding': 'utf-8'});
           
   
//     //      });


       

 

//     // });

  
   
// };

//   return (
//     <div className="App">
//       <h2>Html Processor</h2>



//       { showResults ? 

// <div >
// <h2>Test1</h2>
//       <input
//         type="file"
//         id="input"
//         ref={ref}
//         multiple={true}
//         style={{ display: "block", padding: "5px" }}
//       />
//       mm
//       <button
//         style={{ display: "block" }}
//         onClick={() => {
//           const files = [...ref.current.files];
//           console.log(files);
//           //   const withTitle = files.map(({ name }) => ({
//           //     name
//           //   }));
//           setFile((oldFile) => [...oldFile, ...files]);
        
//           // Call the method
//           getCountriesData(files[0].path)
//             .then((data) => {
//               console.log("data", data);

//               const headingColumnNames = ["Name", "Replace"];
//               //Write Column Title in Excel file
//               let headingColumnIndex = 1;
//               headingColumnNames.forEach((heading) => {
//                 ws.cell(1, headingColumnIndex++).string(heading);
//               });
//               ws.column(1).setWidth(300);

//               //Write Data in Excel file
//               let rowIndex = 2;
//               data.forEach((record) => {
//                 let columnIndex = 1;
//                 Object.keys(record).forEach((columnName) => {
//                   ws.cell(rowIndex, columnIndex++).string(record[columnName]);
//                 });
//                 rowIndex++;
//               });

//               window.ipcRenderer.send("file-request");

//               window.ipcRenderer.on("file", (event, file) => {
//                 console.log("obtained file from main process: " + file);

//                 wb.write(file+'/updatedFiles.xlsx');
//                 setShowResults(false);
//               });
//             })
//             .then(() => {
//               console.log("Web Scrape Complete!");
//             })
//             .catch((error) => {
//               console.log(error);
//             });
//         }}
//       >  Next
//       </button>
//       </div>: 

//       <div>
//        <h2>Test2</h2>
       
//        <input
//        type="file" name="files"
//         ref={updatedExcel}
//         multiple={true}
//         style={{ display: "block", padding: "5px" }}
//       />
//      <button
//         style={{ display: "block" }}
//         onClick={() => {
//           const files = [...updatedExcel.current.files];
//           console.log(files);

//           setCountriesData(files[0].path)
//   .then((data) => {
// // console.log(data);
//   })
//   .then(() => {
//     console.log("Web Scrape Complete!");
//   })
//   .catch((error) => {
//     console.log(error);
//   });

          
//         }}
//       >  Proceed
//       </button>

//       </div> }
//     </div>
//   );
// }

// export default Dashboard;

import 'antd/dist/antd.css';

import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';

import React from 'react';

const { Header, Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const Dashboard = () => (
  <Layout hasSider>
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} />
    </Sider>
    <Layout
      className="site-layout"
      style={{
        marginLeft: 200,
      }}
    >
      <Header
        className="site-layout-background"
        style={{
          padding: 0,
          position: 'fixed',
          zIndex: 1,
          width: '100%',
        }}
      />
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
        }}
      >
        <div
          className="site-layout-background"
          style={{
            padding: 24,
            textAlign: 'center',
          }}
        >
          ...
          <br />
          Really
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          long
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          ...
          <br />
          content
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  </Layout>
);

export default Dashboard;