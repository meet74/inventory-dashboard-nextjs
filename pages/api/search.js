import { connectToElasticsearch } from "../../lib/elasticsearch";

export default async function search(req, res) {
  try {
    const client = await connectToElasticsearch();
    console.log("Connected to Elasticsearch");
    console.log("Shreehari");
    const body = await client.search({
      index: "sample",
      body: {
        query: {
          match_all: {},
        },
      },
    });

    //console.log(body);

    if (!body || !body.hits || !body.hits.hits) {
      throw new Error("No search results found.");
    }

    const searchResults = body.hits.hits.map((hit) => hit._source);

    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error during Elasticsearch search:", error);
    res.status(500).json({ error: "An error occurred during the search." });
  }
}
