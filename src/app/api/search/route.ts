import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { message: "Query parameter is required" },
        { status: 400 }
      );
    }

    // Simulate processing delay (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Dummy data
    const dummyResults = [
      {
        name: "Alice Johnson",
        title: "Senior Product Manager",
        company: "TechNova Inc.",
        location: "San Francisco, CA",
        url: "https://www.linkedin.com/in/alicejohnson",
      },
      {
        name: "Brian Chen",
        title: "Head of Engineering",
        company: "CodeWave Labs",
        location: "New York, NY",
        url: "https://www.linkedin.com/in/brianc",
      },
      {
        name: "Clara Martinez",
        title: "Marketing Director",
        company: "BrightSpark Media",
        location: "Austin, TX",
        url: "https://www.linkedin.com/in/claramartinez",
      },
      {
        name: "David Kim",
        title: "UX Designer",
        company: "PixelWorks Studio",
        location: "Seattle, WA",
        url: "https://www.linkedin.com/in/davidkimux",
      },
      {
        name: "Eva Thompson",
        title: "Sales Manager",
        company: "GrowthEdge Solutions",
        location: "Chicago, IL",
        url: "https://www.linkedin.com/in/evathompson",
      },
    ];

    // TODO: Replace this with real search logic using your backend
    /*
    const results = await performRealSearch(query);
    return NextResponse.json({ results });
    */

    return NextResponse.json({ results: dummyResults });
  } catch (error) {
    console.error("Error in POST /api/search:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
