// import mongoose from "mongoose";
// import { connectionStr } from "./db";
// import { cookies } from "next/headers";
// import Admin from "./adminModel";

// export async function getAuthenticationAdmin() {
//   await mongoose.connect(connectionStr);

//   const cookieStore = await cookies();

//   const sessionToken = cookieStore.get("adminSession")?.value;

//   if (!sessionToken) {
//     return null;
//   }

//   const admin = await Admin.findOne({
//     sessionToken: sessionToken,
//   }).select("-password -sessionToken");

//   return admin;
// }