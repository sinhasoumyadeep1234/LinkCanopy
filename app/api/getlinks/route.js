import clientPromise from "@/lib/mongodb";


export async function GET() {
    //connect to mongodb
    const client = await clientPromise;
    //get the database
    const db = client.db("linkCanopy");
    //get the database collection
    const collection = db.collection("linkLeaves");
    
    //find method returns a cursor, hence we have to convert into array
    const result = await collection.find().toArray();

    if(result.length>0){
        return Response.json({ result });
    }else{
        return Response.json({message:"No data", success:false});
    }

  }