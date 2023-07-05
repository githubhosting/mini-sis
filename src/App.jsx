/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useEffect, useState } from "react";
import data from "./data.json";

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

function App() {
  // const urll =
  //   "https://upylba53h2.execute-api.us-east-1.amazonaws.com/sis?usn=1ms21ci049&dob=2003-05-21";
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(urll);
  //     const json = await response.json();
  //     setData(json);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  console.log(data);
  return (
    <main className="">
      {data ? (
        <div className="bg-[#fefefe]">
          <div>
            <div>
              <img
                className="h-32 w-full object-cover lg:h-48"
                src={profile.backgroundImage}
                alt=""
              />
            </div>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                  <img
                    className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                    src={profile.avatar}
                    alt=""
                  />
                </div>
                <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                    <h1 className="truncate text-2xl font-bold text-gray-900">
                      {data.name}
                    </h1>
                  </div>
                </div>
              </div>
              <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {data.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-6"></div>
          <div className="grid gap-3 px-4 my-10 lg:grid-cols-2 items-center justify-center lg:mx-20 xl:grid-cols-3">
            {data.marks.map((item, index) => {
              if (item.name) {
                return (
                  <div
                    key={index}
                    className="p-5 bg-blue-100 rounded-xl shadow-md"
                  >
                    <h1 className="text-center font-semibold">{item.name}</h1>
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-blue-50 rounded-lg text-sm mt-2">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-left">
                            Marks
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            1
                          </th>
                          <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            2
                          </th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-gray-100">
                        <tr>
                          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                            Test
                          </td>
                          <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center">
                            {item.t1}
                          </td>
                          <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center">
                            {item.t2}
                          </td>
                        </tr>
                        <tr>
                          <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                            Assignment
                          </td>
                          <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center">
                            {item.a1}
                          </td>
                          <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center">
                            {item.a2}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="flex justify-center mt-2">
                      <h1 className="">Final CIE: </h1>
                      <h1 className="ml-2 font-semibold">
                        {item["final cie"]}
                      </h1>
                    </div>
                    <div className="flex justify-center mt-2">
                      <h1 className="">Attendance: </h1>
                      <h1
                        className={`ml-2 font-semibold ${
                          data.attendance[index].percentage < "70"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {data.attendance[index].percentage}
                      </h1>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center min-h-screen bg-[#f2f3f9]">
            <div class="loader">
              <div class="inner one"></div>
              <div class="inner two"></div>
              <div class="inner three"></div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default App;
