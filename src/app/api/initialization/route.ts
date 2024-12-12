import { NextRequest, NextResponse } from "next/server";

import { fetchFiles, filterByCategory, filterByKeywords, filterOutBlacklist, loadData } from "./handler";

// Get raw data
export async function GET(request: NextRequest) {
    const encodedData = request.nextUrl.searchParams.get('data')

    if (encodedData) {
        try {
            const decodedData = JSON.parse(decodeURIComponent(encodedData))

            await fetchFiles(decodedData.categories)
            const data = loadData(decodedData.categories).flat()

            const blacklistFiltered = filterOutBlacklist(data, decodedData.blacklist)
            // console.log('blacklistFiltered:', result.length)

            const result = filterByKeywords(blacklistFiltered, decodedData.keywords)
            // console.log('result:', keywordFiltered)

            return NextResponse.json(result, { status: 200 });
        } catch (error) {
            console.error('Error loading data:', error)
            return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 })
        }
    }
}