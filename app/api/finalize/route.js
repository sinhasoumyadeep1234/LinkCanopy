import clientPromise from "@/lib/mongodb";


export async function POST(req) {
    const body = await req.json();
    console.log("Body is", body);
    const {handler,links,imgUrl} = body;
    //connect to mongodb
    const client = await clientPromise;
    //get the database
    const db = client.db("linkCanopy");
    //create a database collection
    const collection = db.collection("linkList");
    
    if (!handler || !Array.isArray(links)) {
        return Response.json({ message: "Error: Add some links before submission❌" });
    }

    //check if same handler exists then not add
    const existing = await collection.findOne({handler});

    if(existing){
        return Response.json({message:"Handler already exists, please change⚠️", success:false});
    }
    //else add
    await collection.insertOne({ handler, links, imgUrl });
    return Response.json({ message: "Profile saved successfully✅ Go to handle and check" });


  }