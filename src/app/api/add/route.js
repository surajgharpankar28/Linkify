import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  const body = await request.json();
  const client = await clientPromise;
  const db = client.db("linkify");
  const collection = db.collection("links");

  console.log(body);

  //if handle is already claimed, you cannot create the Linkify
  const doc = await collection.findOne({ handle: body.handle });

  if (doc) {
    return Response.json({
      success: false,
      error: true,
      message: "Handle is already claimed, Please enter different handle",
      result: null,
    });
  }

  // Insert the new document into the collection
  const result = await collection.insertOne(body);
  return Response.json({
    success: true,
    error: false,
    message: "Your Linkify is created, Enjoy!",
    result: result,
  });
}
