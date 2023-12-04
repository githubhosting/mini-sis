/* eslint-disable no-unused-vars */
function NewComp(props) {
  const getLatestDate = (presentDates, absentDates) => {
    const latestPresentDate =
      presentDates.length > 0 ? presentDates[0].date : null;
    const latestAbsentDate =
      absentDates.length > 0 ? absentDates[0].date : null;
    let latestDate = null;

    if (latestPresentDate && latestAbsentDate) {
      latestDate =
        latestPresentDate > latestAbsentDate
          ? latestPresentDate
          : latestAbsentDate;
    } else if (latestPresentDate) {
      latestDate = latestPresentDate;
    } else if (latestAbsentDate) {
      latestDate = latestAbsentDate;
    }
    return latestDate;
  };

  const calculateDaysAgo = (date) => {
    const currentDate = new Date();
    const dateParts = date.split("-");
    const targetDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    const timeDifference = currentDate - targetDate;
    const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  return (
    <div className="bg-gray-900">
      <div>
        {/* <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={props.profile.backgroundImage}
            alt="Background"
          />
        </div> */}
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 flex items-center space-x-5">
            {/* <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-2 ring-indigo-50 shadow-num_d sm:h-32 sm:w-32"
                src={props.profile.avatar}
                alt="Avatar"
              />
            </div> */}
            <div className="flex-1">
              <h1 className="lg:text-2xl font-bold text-white text-xl text-center">
                Welcome {props.data.name} !
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-6"></div>
      <div className="grid gap-3 px-4 py-10 lg:grid-cols-2 items-center justify-center lg:mx-20 xl:grid-cols-3">
        {props.data.marks.map((item, index) => {
          if (item.name) {
            const presentDates = props.data.attendance[index].present_dates;
            const absentDates = props.data.attendance[index].absent_dates;
            const latestDate = getLatestDate(presentDates, absentDates);
            const days_present = props.data.attendance[index].present;
            const days_absent = props.data.attendance[index].absent;
            const remaining_days = props.data.attendance[index].remaining;
            const total_days =
              parseInt(days_present) +
              parseInt(days_absent) +
              parseInt(remaining_days);
            const daysAgo = latestDate ? calculateDaysAgo(latestDate) : null;
            return (
              <div
                key={index}
                className="p-5 bg-[#0b1120] rounded-xl shadow-num_d0"
              >
                <h1 className="text-center font-semibold text-white">
                  {item.name}
                </h1>
                <table className="min-w-full divide-y divide-gray-600 bg-slate-800 rounded-lg text-sm mt-2">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-indigo-50 text-left">
                        Marks
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-indigo-50">
                        CIE 1
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-medium text-indigo-50">
                        CIE 2
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-600">
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 text-indigo-50">
                        Test
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-indigo-50 text-center font-semibold">
                        {item.t1 === "-"
                          ? "-"
                          : item.t1.slice(0, item.t1.indexOf("/"))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-indigo-50 text-center font-semibold">
                        {item.t2 === "-"
                          ? "-"
                          : item.t2.slice(0, item.t2.indexOf("/"))}
                      </td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-4 py-2 text-indigo-50">
                        Assignment
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-indigo-50 text-center font-semibold">
                        {item.a1 === "-"
                          ? "-"
                          : item.a1.slice(0, item.a1.indexOf("/"))}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-indigo-50 text-center font-semibold">
                        {item.a2 === "-"
                          ? "-"
                          : item.a2.slice(0, item.a2.indexOf("/"))}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-2 text-indigo-50">
                  <h1 className="">Final CIE: </h1>
                  <h1 className="ml-2 font-semibold">{item["final cie"]}</h1>
                </div>
                <div className="flex justify-center mt-2 text-indigo-50">
                  <h1 className="">Attendance: </h1>
                  <h1
                    className={`ml-2 font-semibold ${
                      parseInt(props.data.attendance[index].percentage) < 75
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {props.data.attendance[index].percentage}
                  </h1>
                </div>
                <h1 className="text-center text-sm text-indigo-50 mt-1">
                  {latestDate ? `Updated on ${latestDate}` : ""}:{" "}
                  {daysAgo ? daysAgo : ""} days ago
                </h1>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default NewComp;
