import clientPromise from "@/lib/mongodb";


export async function POST(req) {
    const body = await req.json();
    //connect to mongodb
    const client = await clientPromise;
    //create an new database
    const db = client.db("linkCanopy");
    //create the database collection
    const collection = db.collection("linkLeaves");
    
    const result = collection.insertOne(body);

    if(result){
        return Response.json({ message: 'Added', success:true });
    }else{
        return Response.json({message:"Failed to add", success:false});
    }

  }