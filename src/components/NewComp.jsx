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

  return (
    <div className="bg-[#fefefe]">
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={props.profile.backgroundImage}
            alt=""
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={props.profile.avatar}
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {props.data.name}
                </h1>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {props.data.name}
            </h1>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-6"></div>
      <div className="grid gap-3 px-4 my-10 lg:grid-cols-2 items-center justify-center lg:mx-20 xl:grid-cols-3">
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
            return (
              <div key={index} className="p-5 bg-blue-100 rounded-xl shadow-md">
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
                      <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center font-semibold">
                        {item.t1.slice(0, 2)}
                      </td>
                      <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center font-semibold">
                        {item.t2.slice(0, 2)}
                      </td>
                    </tr>
                    <tr>
                      <td class="whitespace-nowrap px-4 py-2 text-gray-700">
                        Assignment
                      </td>
                      <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center font-semibold">
                        {item.a1.slice(0, 2)}
                      </td>
                      <td class="whitespace-nowrap px-4 py-2 text-gray-800 text-center font-semibold">
                        {item.a2.slice(0, 2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="flex justify-center mt-2">
                  <h1 className="">Final CIE: </h1>
                  <h1 className="ml-2 font-semibold">{item["final cie"]}</h1>
                </div>
                <div className="flex justify-center mt-2">
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
                <h1 className="text-center">
                  {latestDate ? `Updated on ${latestDate}` : ""}
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
