import { updateUser } from "@/app/lib/action";
import { fetchUser } from "@/app/lib/data";

async function NewUser({ params }) {
  const user = await fetchUser(params.id);
  console.log(user);
  return (
    <div className="flex justify-between items-center w-full ">
      <div className="w-full  mx-auto max-w-lg p-4  rounded-lg shadow sm:p-6 ">
        <form className="space-y-6" action={updateUser}>
          <input type="hidden" name="id" value={user.id} />
          <h5 className="text-3xl font-medium text-slate-200">Update User</h5>
          <div>
            <label htmlFor="username" className="block mb-2  font-medium text-slate-200">
              Username
            </label>
            <input
              type="username"
              name="username"
              id="username"
              className="bg-transparent border border-slate-300 text-slate-100  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-slate-400"
              placeholder="E.g. Anoop Singh"
              defaultValue={user.username}
              required
            />
          </div>
          <div className="flex items-start"></div>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  px-5 py-2.5 text-center"
          >
            {"Update User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
