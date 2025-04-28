import { FC } from "react";

interface IPaginationEmployee {
  currentPage: number;
  allPages: number;
  change: (e: any) => void;
}

const PaginationEmployee: FC<IPaginationEmployee> = ({
  currentPage,
  allPages,
  change,
}) => {
  const pages = Array.from({ length: allPages }, (_, i) => i + 1);

  return (
    <div>
      <nav
        aria-label="Page navigation example"
        className="flex justify-center mt-4"
      >
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <a
              onClick={change}
              href="#"
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Prev</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          {pages.map((item, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={change}
                aria-current={item === currentPage ? "page" : undefined}
                className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white ${
                  item === currentPage
                    ? "text-blue-600 border border-gray-300 bg-blue-50 dark:bg-gray-900 dark:text-gray-100"
                    : "dark:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {item}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              onClick={change}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationEmployee;
