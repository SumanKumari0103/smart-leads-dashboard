const Navbar = () => {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h2 className="text-2xl font-semibold">
        Leads Dashboard
      </h2>

      <div>
        <p className="font-medium">
          {user.name}
        </p>

        <p className="text-sm text-gray-500">
          {user.role}
        </p>
      </div>
    </div>
  );
};

export default Navbar;