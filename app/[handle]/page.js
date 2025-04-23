import clientPromise from "@/lib/mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

// this page will handle the display of the links of a specific handle, we will get the handle name as dynamic route from the file name as url param
export default async function Page({ params }) {
  
  // after next js 14 version we have to await params before using it.
  const handle = (await params).handle;
  console.log(handle);

  //connect to mongodb
  const client = await clientPromise;
  //get the database
  const db = client.db("linkCanopy");
  //get the database collection
  const collection = db.collection("linkList");

  if (!handle) {
    return Response.json({
      message: "Error: No data corresponding to this handle found❌",
    });
  }

  //check if data having that handler is present or not
  const userdata = await collection.findOne({ handler:handle });

  if (!userdata) {
    notFound();
  } else {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#ffe29f] via-[#ffa99f] to-[#ff719a] flex flex-col items-center p-4">
        <div className="text-center mt-10">
          <img
            src={userdata.imgUrl}
            alt={`${handle}'s profile`}
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
          />
          <h1 className="text-3xl font-bold text-white mt-4">@{handle}</h1>
        </div>

        <div className="mt-8 w-full max-w-md flex flex-col gap-4">
          {userdata.links.map((link, index) => (
            <a
              key={index}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#333] px-6 py-3 rounded-full text-center font-semibold shadow-lg hover:bg-[#ff719a] hover:text-white transition-all duration-300"
            >
              {link.linkText}
            </a>
          ))}
          <Link href="/" className="m-auto cursor-pointer"><button className="bg-white text-[#333] px-6 py-3 rounded-full text-center font-semibold shadow-lg hover:bg-[#26a561] hover:text-white transition-all duration-300" >CLick to go back to homepage</button></Link>
        </div>
      </div>
    );
  }
}
