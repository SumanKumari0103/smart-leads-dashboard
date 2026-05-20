const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-700 text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        Smart Leads
      </h1>

      <ul className="space-y-4">
        <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer">
          Dashboard
        </li>

        <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer">
          Leads
        </li>

        <li className="hover:bg-blue-600 p-3 rounded-lg cursor-pointer">
          Settings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;