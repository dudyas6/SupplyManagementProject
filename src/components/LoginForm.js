export default function LoginForm ({ setUsername, setPassword, ValidateLogin }){
    return (
      <form className="w-full">
        <div className="flex flex-wrap mb-6 -mx-3">
          <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
            <label
              className="block mb-1 text-xs font-light tracking-wide text-gray-700 uppercase"
              htmlFor="grid-username"
            >
              Username
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white-500"
              id="grid-username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <p className="text-xs italic text-red-500">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full px-3 md:w-1/2">
            <label
              className="block mb-1 text-xs font-light tracking-wide text-gray-700 uppercase"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-red-500 rounded appearance-none focus:outline-none focus:bg-white-500"
              id="grid-password"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs italic text-red-500">
              Please fill out this field.
            </p>
          </div>
        </div>
        <div className="w-full mt-10 mb-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              ValidateLogin();
            }}
            className="float-right px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
          >
            Login
          </button>
          <div className="clear-both" />
        </div>
      </form>
    );
  };