import { FC } from "react";

interface IItemEmployee {
  name: string;
  email: string;
  img: string;
  position: string;
  active: Boolean;
  openModal: () => void;
}

const ItemEmployee: FC<IItemEmployee> = ({
  name,
  email,
  img,
  position,
  active,
  openModal,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
      >
        <img className="w-10 h-10 rounded-full" src={img} alt="Jese image" />
        <div className="ps-3">
          <div className="text-base font-semibold">{name}</div>
          <div className="font-normal text-gray-500">{email}</div>
        </div>
      </th>
      <td className="px-6 py-4">{position}</td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <div
            className={`h-2.5 w-2.5 rounded-full me-2 ${
              active ? "bg-green-500" : "bg-red-500"
            }`}
          ></div>
          {active ? "Online" : "Offline"}
        </div>
      </td>
      <td className="px-6 py-4">
        {/* <!-- Modal toggle --> */}
        <a
          href="#"
          type="button"
          data-modal-show="editUserModal"
          data-modal-target="editUserModal"
          data-modal-toggle="editUserModal"
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          onClick={openModal}
        >
          Edit user
        </a>
      </td>
    </tr>
  );
};

export default ItemEmployee;
