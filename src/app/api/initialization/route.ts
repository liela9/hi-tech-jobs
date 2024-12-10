import { NextRequest, NextResponse } from "next/server";

import { fetchAllFiles, filterByKeywords, filterOutBlacklist, loadData } from "./handler";

// Get raw data
export async function GET(request: NextRequest) {
    const encodedData = request.nextUrl.searchParams.get('data')

    if (encodedData) {
        try {
            const decodedData = JSON.parse(decodeURIComponent(encodedData))

            await fetchAllFiles()
            const data = loadData().flat()
            const keywordFiltered = filterByKeywords(data, decodedData.keywords)
            const result = filterOutBlacklist(keywordFiltered, decodedData.blacklist)
        
            return NextResponse.json(result, { status: 200 });
        } catch (error) {
            console.error('Error loading data:', error)
            return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 })
        }
    }
}