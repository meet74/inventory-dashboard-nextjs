"use client";
import SearchIcon from "@/assets/icons/SearchIcon";
import Image from "next/image";
import { useState, useEffect } from "react";

function HomePage() {
  const [tableData, settableData] = useState([]);

  
  useEffect(() => {
    loadData();
  }, []);
  console.log(tableData);

  // Fetching data from elasticsearch
  const loadData = () => {
    console.log("shriji");
    fetch("http://localhost:3000/api/search", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); 
      })
      .then((data) => {
        console.log(data);
        settableData(data); 
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  //checking stock and changing color of avaibilty text according to quantity
  const checkStock = (quantity) => {
    if (quantity === 0) {
      return "Out of Stock";
    } else if (quantity < 5) {
      return "Low in stock";
    } else {
      return "Stock Available";
    }
  };
  return (
    <div className=" container ml-[15rem]">
      <div className="bg-white w-full flex justify-between p-5 items-center h-16">
        <div>
            
          <input className="border w-[20rem]  h-4 p-5 rounded-md" placeholder="Search" />
        </div>
        <div className="rounded-full overflow-hidden">
          <div
            className="rounded-full overflow-hidden"
            style={{ width: "40px", height: "40px" }}
          >
            <Image
              src="/profile.jpg" 
              alt="My Image"
              layout="fixed" 
              width={40} 
              height={40}
              className="rounded-full" 
            />
          </div>
        </div>
      </div>
      <section className="w-[95%] bg-white m-8 p-2 rounded-md">
        <h3>Overall Inventory</h3>
        <div className="flex justify-around items-start p-4">
          <div>
            <h2 className="text-[#237AF0] font-medium">Categories</h2>
            <h4 className="text-base my-4">14</h4>
            <p className="text-[0.6rem] text-gray-400 font-light">
              Last 7 days
            </p>
          </div>
          <div>
            <h2 className="text-[#E19132] font-medium">Total Products</h2>
            <div className="flex justify-between">
              <h4 className="text-base my-4">14</h4>
              <h4 className="text-base my-4">$2500</h4>
            </div>
            <div className="flex justify-between">
              <p className="text-[0.6rem] text-gray-400 font-light">
                Last 7 days
              </p>
              <p className="text-[0.6rem] text-gray-400 font-light">Revenue</p>
            </div>
          </div>
          <div>
            <h2 className="text-[#855EBD] font-medium">Total Selling</h2>
            <div className="flex justify-between">
              <h4 className="text-base my-4">14</h4>
              <h4 className="text-base my-4">$2500</h4>
            </div>
            <div className="flex justify-between">
              <p className="text-[0.6rem] text-gray-400 font-light">
                Last 7 days
              </p>
              <p className="text-[0.6rem] text-gray-400 font-light">Cost</p>
            </div>
          </div>
          <div>
            <h2 className="text-[#F26A60] font-medium">Low Stocks</h2>
            <div className="flex justify-between">
              <h4 className="text-base my-4">14</h4>
              <h4 className="text-base my-4">$2500</h4>
            </div>
            <div className="flex justify-between">
              <p className="text-[0.6rem] text-gray-400 font-light">
                Last 7 days
              </p>
              <p className="text-[0.6rem] text-gray-400 font-light">NA</p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-[95%] bg-white m-8 p-4 rounded-md ">
        <div className="flex justify-between">
          <h3 className="text-lg">Products</h3>
          <div>
            <button className="bg-[#1466D9] rounded-sm text-white text-xs p-2 mx-3">
              Add Products
            </button>
            <button className="border rounded-sm border-gray-200 text-gray-500 font-medium text-xs p-2 mx-3">
              Filters
            </button>
            <button className="border rounded-sm border-gray-200 text-gray-500 font-medium text-xs p-2 mx-3">
              Downdload all
            </button>
          </div>
        </div>
        <div className="overflow-x-auto p-4 text-sm">
          <table className="table-auto w-full border-collapse  border-gray-300">
            <thead>
              <tr>
                <th className="border-b-2 text-gray-600 font-normal px-4 py-2">
                  Products
                </th>
                <th className="border-b-2 text-gray-600 font-normal px-4 py-2">
                  Buying Price
                </th>
                <th className="border-b-2 text-gray-600 font-normal px-4 py-2">
                  Quantity
                </th>
                <th className="border-b-2 text-gray-600 font-normal px-4 py-2">
                  Quantity Sold
                </th>
                <th className="border-b-2 text-gray-600 font-normal px-4 py-2">
                  Store Name
                </th>
                <th className="border-b-2 text-gray-600 font-normal px-4 py-2">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>

              {tableData.length ?  tableData.map((data, index) => {
                return (
                  <tr>
                    <td className="border-b-2 text-center px-4 py-2">
                      {data.ProductName}
                    </td>
                    <td className="border-b-2 text-center px-4 py-2">
                      {data.Cost}
                    </td>
                    <td className="border-b-2 text-center px-4 py-2">
                      {data.QuantityAvailable}
                    </td>
                    <td className="border-b-2 text-center px-4 py-2">
                      {data.QuantitySold}
                    </td>
                    <td className="border-b-2 text-center px-4 py-2">
                      {data.StoreName}
                    </td>
                    <td
                      className={`border-b-2 text-center px-4 py-2 ${
                        checkStock(data.QuantityAvailable) === "Out of Stock"
                          ? "text-red-600"
                          : checkStock(data.QuantityAvailable) ===
                            "Low in stock"
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {checkStock(data.QuantityAvailable)}
                    </td>
                  </tr>
                );
              }):<tr><td>No Data Found</td></tr>}
             
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
