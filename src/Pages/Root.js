import React from "react";
import MainContainer from "../Components/Container/MainContainer";
import NavBar from "../Components/NavItems/NavBar";
import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <MainContainer>
        <NavBar />
        <div className=" relative bg-zinc-800 bg-opacity-20 sm:col-start-3 sm:col-span-full row-span-full row-start-2 rounded-2xl">
          <Outlet />
        </div>
      </MainContainer>
    </>
  );
};

export default Root;

// import React from "react";
// import { Outlet } from "react-router-dom";
// import MainContainer from "../Components/Container/MainContainer";
// import Navbar from "../Components/NavItems/Navbar";

// function Root() {
//   return (
//     <>
//       <MainContainer>
//         <Navbar />
//         <div className=" relative bg-white bg-opacity-40 sm:col-start-3 sm:col-span-full row-span-full row-start-2 rounded-2xl">
//           <Outlet />
//         </div>
//       </MainContainer>
//     </>
//   );
// }

// export default Root;