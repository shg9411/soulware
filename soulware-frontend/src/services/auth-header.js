import localforage from "localforage";

export default async function authHeader() {
  let tmp = "";
  try {
    const value = await localforage.getItem("token");
    tmp = value;
  } catch (err) {
    console.log(err);
  }
  return { Authorization: "Bearer " + tmp };
}
