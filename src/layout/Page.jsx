import React, { useState } from "react";
import { Navbar, Sidebar } from "../components";

function Page({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Navbar setShowSidebar={() => setShowSidebar(!showSidebar)} />
      <Sidebar Sidebar={showSidebar} />
      <div className="p-4">
        <div className="p-4  mt-14 max-w-full mx-auto">
          <div className="sm:ml-64">{children}</div>
        </div>
      </div>
    </>
  );
}

export default Page;
