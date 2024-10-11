import ListAllDepartments from "@/components/ListAllDepartments";
import AddNewDepartment from "@/components/AddNewDepartment";
import { headers } from "next/headers";

export default function AdminPage() {
  const headersList = headers();
  const url = headersList.get("referer") || ""; // fallback to empty string if referer is null

  // Corrected regex to remove protocol (http:// or https://) and localhost with its port
  const urlslice = url.replace(/^https?:\/\/(localhost:\d+|[\w.-]+(:\d+)?)/, "");

  console.log(urlslice);

  return (
    <main>
      <p className="url">{urlslice}</p>
      <h4 className="mainHeadline">Departments</h4>
      <div className="sectionWrapper">
        <AddNewDepartment />
        <ListAllDepartments />
      </div>
    </main>
  );
}
