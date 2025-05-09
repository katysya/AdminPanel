import { useState, useEffect, useRef } from "react";
import {
  DropDownEmployee,
  TableEmployee,
  ItemEmployee,
  SearchEmployee,
  PaginationEmployee,
} from "@/features/Employee";
import { PreLoader, NotFound } from "@/shared/index";
import { Modal } from "flowbite";

interface Employee {
  id: number;
  name: string;
  email: string;
  img: string;
  age: number;
  position: string;
  active: boolean;
  dateStart: string;
  gender: string;
  salary: number;
}

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const EditUserModalRef = useRef<HTMLDivElement | null>(null);
  const modalRef = useRef<Modal | null>(null);
  const [allCountEmployees, setAllCountEmployees] = useState(0);
  const limit = 5;
  const sortBy = "name";
  const sortOrder = "asc";

  const [params, setParams] = useState({
    page: 1,
    limit: limit,
    search: "",
    sortBy: sortBy,
    sortOrder: sortOrder,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/employees?_sort=${params.sortBy}&_page=${params.page}&_limit=${params.limit}&q=${params.search}`
        );
        if (!response.ok) {
          throw new Error("...");
        }
        const result = await response.json();
        const totalCount = response.headers.get("X-Total-Count");
        setEmployees(result);
        setAllCountEmployees(Number(totalCount));
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    if (EditUserModalRef.current) {
      modalRef.current = new Modal(EditUserModalRef.current);
      modalRef.current.hide();
    }
  }, [employees]);

  const toggleModal = () => {
    if (modalRef.current && EditUserModalRef.current) {
      const modal = modalRef.current;

      if (EditUserModalRef.current.classList.contains("hidden")) {
        modal.show();
      } else {
        modal.hide();
      }
    }
  };

  const searchWordFetch = async (word: string) => {
    setParams((prev) => ({ ...prev, search: word, page: 1 }));
  };

  const changeCurrentPagePagination = (e: any) => {
    let target = e.target as HTMLElement;

    while (target && !target.innerText && target.parentElement) {
      target = target.parentElement;
    }

    const currentpage = params.page;
    const text = target.innerText.toLowerCase();

    if (currentpage === Number(text)) return;

    switch (text) {
      case "next":
        if (currentpage < allCountEmployees / params.limit) {
          setParams((prev) => ({ ...prev, page: currentpage + 1 }));
        }
        break;
      case "prev":
        if (currentpage > 1) {
          setParams((prev) => ({ ...prev, page: currentpage - 1 }));
        }
        break;
      default:
        setParams((prev) => ({ ...prev, page: Number(e.target.innerText) }));
    }
  };

  if (loading) {
    return <PreLoader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900 px-4">
          <DropDownEmployee />

          <SearchEmployee search={searchWordFetch} />
        </div>

        {employees && employees.length > 0 && (
          <TableEmployee>
            {employees.map((item, index) => (
              <ItemEmployee
                key={index}
                name={item.name}
                email={item.email}
                img={item.img}
                position={item.position}
                active={item.active}
                openModal={toggleModal}
              />
            ))}
          </TableEmployee>
        )}

        {employees && employees.length === 0 && <NotFound />}

        <div
          id="editUserModal"
          ref={EditUserModalRef}
          tabIndex={-1}
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            {/* <!-- Modal content --> */}
            <form className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit user
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="editUserModal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Bonnie"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="last-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Green"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@company.com"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone-number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="phone-number"
                      id="phone-number"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. +(12)3456 789"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      id="department"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Development"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Company
                    </label>
                    <input
                      type="number"
                      name="company"
                      id="company"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="123456"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="current-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="new-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save all
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <PaginationEmployee
        currentPage={params.page}
        allPages={Math.ceil(allCountEmployees / params.limit)}
        change={changeCurrentPagePagination}
      />
    </div>
  );
};

export default Employees;
