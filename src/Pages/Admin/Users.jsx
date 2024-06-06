import { useEffect, useState } from "react";
import API from "../../Services/API";
import Menu from "../../Components/Data/Menu";

const Users = () => {
  const [users, setUsers] = useState([]);
  //   console.log(users);
  const getUsers = async () => {
    try {
      const { data } = await API.get("/admin/getAllUsers");
      if (data?.success) {
        setUsers(data.data);
        // alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Menu>
      <div className="h-full overflow-y-scroll">
        <h2 className="text-center font-semibold text-3xl my-10">Users List</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="text-black text-sm">
                <th className="text-center">Name</th>
                <th className="text-center">Email</th>
                <th className="text-center">Doctor</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td className="text-center">{user.name}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">
                    {user.isDoctor ? "Yes" : "No"}
                  </td>
                  <td className="text-center">
                    <button className="px-3 hover:opacity-85 py-2 bg-red-500 rounded-md">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {/* row 1 */}
            </tbody>
          </table>
        </div>
      </div>
    </Menu>
  );
};

export default Users;
