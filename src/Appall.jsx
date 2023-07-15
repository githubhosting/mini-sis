/* eslint-disable no-unused-vars */
import "./App.css";
import React, { useEffect, useState } from "react";
// import data from "./data.json";

const profile = {
  avatar:
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  backgroundImage:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
};

const all_usns_with_dob = [
  {
    usn: "1MS21CI001",
    dob: "2003-01-25",
  },
  {
    usn: "1MS21CI002",
    dob: "2003-07-08",
  },
  {
    usn: "1MS21CI003",
    dob: "2002-09-30",
  },
  {
    usn: "1MS21CI004",
    dob: "2003-07-19",
  },
  {
    usn: "1MS21CI005",
    dob: "2003-06-06",
  },
  {
    usn: "1MS21CI006",
    dob: "2003-03-05",
  },
  {
    usn: "1MS21CI007",
    dob: "2003-04-05",
  },
  {
    usn: "1MS21CI008",
    dob: "2001-06-01",
  },
  {
    usn: "1MS21CI009",
    dob: "2001-12-30",
  },
  {
    usn: "1MS21CI010",
    dob: "2004-03-16",
  },
  {
    usn: "1MS21CI011",
    dob: "2003-04-19",
  },
  {
    usn: "1MS21CI012",
    dob: "2003-10-02",
  },
  {
    usn: "1MS21CI013",
    dob: "2003-09-07",
  },
  {
    usn: "1MS21CI014",
    dob: "2001-12-01",
  },
  {
    usn: "1MS21CI015",
    dob: "2002-09-17",
  },
  {
    usn: "1MS21CI016",
    dob: "2004-02-08",
  },
  {
    usn: "1MS21CI017",
    dob: "2002-11-07",
  },
  {
    usn: "1MS21CI018",
    dob: "2003-12-30",
  },
  {
    usn: "1MS21CI019",
    dob: "2003-03-04",
  },
  {
    usn: "1MS21CI020",
    dob: "2002-11-16",
  },
  {
    usn: "1MS21CI021",
    dob: "2003-03-13",
  },
  {
    usn: "1MS21CI022",
    dob: "2003-12-30",
  },
  {
    usn: "1MS21CI023",
    dob: "2003-10-18",
  },
  {
    usn: "1MS21CI024",
    dob: "2003-06-07",
  },
  {
    usn: "1MS21CI025",
    dob: "2004-01-23",
  },
  {
    usn: "1MS21CI026",
    dob: "2003-05-04",
  },
  {
    usn: "1MS21CI027",
    dob: "2003-03-07",
  },
  {
    usn: "1MS21CI028",
    dob: "2002-11-12",
  },
  {
    usn: "1MS21CI029",
    dob: "2003-10-15",
  },
  {
    usn: "1MS21CI030",
    dob: "2002-12-15",
  },
  {
    usn: "1MS21CI031",
    dob: "2003-01-12",
  },
  {
    usn: "1MS21CI032",
    dob: "2001-10-27",
  },
  {
    usn: "1MS21CI033",
    dob: "2004-02-21",
  },
  {
    usn: "1MS21CI034",
    dob: "2003-07-10",
  },
  {
    usn: "1MS21CI035",
    dob: "2003-03-13",
  },
  {
    usn: "1MS21CI036",
    dob: "2003-11-11",
  },
  {
    usn: "1MS21CI037",
    dob: "2003-08-02",
  },
  {
    usn: "1MS21CI038",
    dob: "2003-01-23",
  },
  {
    usn: "1MS21CI039",
    dob: "2003-09-28",
  },
  {
    usn: "1MS21CI040",
    dob: "2002-09-06",
  },
  {
    usn: "1MS21CI041",
    dob: "2002-03-06",
  },
  {
    usn: "1MS21CI042",
    dob: "2002-08-12",
  },
  {
    usn: "1MS21CI043",
    dob: "2003-09-21",
  },
  {
    usn: "1MS21CI044",
    dob: "2003-05-15",
  },
  {
    usn: "1MS21CI045",
    dob: "2003-06-10",
  },
  {
    usn: "1MS21CI046",
    dob: "2003-08-18",
  },
  {
    usn: "1MS21CI047",
    dob: "2002-12-23",
  },
  {
    usn: "1MS21CI048",
    dob: "2002-03-10",
  },
  {
    usn: "1MS21CI049",
    dob: "2003-05-21",
  },
  {
    usn: "1MS21CI050",
    dob: "2003-08-09",
  },
  {
    usn: "1MS21CI051",
    dob: "2003-10-13",
  },
  {
    usn: "1MS21CI052",
    dob: "2003-08-16",
  },
  {
    usn: "1MS21CI053",
    dob: "2003-07-15",
  },
  {
    usn: "1MS21CI054",
    dob: "2003-05-19",
  },
  {
    usn: "1MS21CI055",
    dob: "2003-03-24",
  },
  {
    usn: "1MS21CI056",
    dob: "2003-09-18",
  },
  {
    usn: "1MS21CI057",
    dob: "2003-09-15",
  },
  {
    usn: "1MS21CI058",
    dob: "2003-08-21",
  },
  {
    usn: "1MS21CI059",
    dob: "2002-11-13",
  },
  {
    usn: "1MS21CI060",
    dob: "2004-02-02",
  },
  {
    usn: "1MS21CI061",
    dob: "2003-04-18",
  },
  {
    usn: "1MS21CI062",
    dob: "2003-05-14",
  },
  {
    usn: "1MS21CI063",
    dob: "2002-06-06",
  },
  {
    usn: "1MS21CI064",
    dob: "2003-09-20",
  },
  {
    usn: "1MS21CI065",
    dob: "2003-03-31",
  },
  {
    usn: "1MS21CI066",
    dob: "2002-01-20",
  },
  {
    usn: "1MS21CI067",
    dob: "2003-09-14",
  },
  {
    usn: "1MS21CI068",
    dob: "2002-08-18",
  },
  {
    usn: "1MS21CI069",
    dob: "2003-11-19",
  },
  {
    usn: "1MS21CI070",
    dob: "2003-08-08",
  },
];

function Appall() {
  const [data, setData] = useState(null);
  const [usn, setUsn] = useState(null);
  const [dob, setDob] = useState(null);
  const [usnb, setUsnb] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    fetch(
      `https://upylba53h2.execute-api.us-east-1.amazonaws.com/sis?usn=${usn}&dob=${dob}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "error") {
          setError(data.message);
          setData(null);
          return;
        }
        setData(data);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        setError("Something went wrong. Please try again later.");
        setData(null);
      });
  };

  return (
    <main className="container">
      <h1 className="text-center my-4">Student Information System</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center"
      >
        <div className="mb-3">
          <select
            className="form-control p-2 rounded-lg"
            id="usn"
            value={usn}
            onChange={(e) => {
              const selectedUsnb = e.target.value;
              const selectedDob = e.target.value; // Get the selected DOB value
              const selectedUsn = all_usns_with_dob.find(
                (option) => option.dob === selectedDob
              ).usn; // Find the corresponding USN value
              setUsn(selectedUsn); // Set the USN state
              setDob(selectedDob); // Set the DOB state
              setUsnb(selectedUsnb); // Set the USN state
            }}
          >
            {all_usns_with_dob.map((option) => (
              <option key={option.usn} value={option.dob}>
                {option.usn}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
        >
          Submit
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center min-h-screen bg-[#f2f3f9]">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
      {data && (
        <div className="bg-[#fefefe]">
          <div>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                  <img
                    className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 shadow-xl"
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
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            Test
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                            {item.t1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                            {item.t2}
                          </td>
                        </tr>
                        <tr>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            Assignment
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
                            {item.a1}
                          </td>
                          <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-center">
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
      )}
    </main>
  );
}

export default Appall;
