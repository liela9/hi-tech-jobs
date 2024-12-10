import { NextRequest, NextResponse } from "next/server";

import { fetchAllFiles, filterByCategory, filterByKeywords, filterOutBlacklist, loadData } from "./handler";

// Get raw data
export async function GET(request: NextRequest) {
    const encodedData = request.nextUrl.searchParams.get('data')

    if (encodedData) {
        try {
            const decodedData = JSON.parse(decodeURIComponent(encodedData))
            console.log('decodedData:', decodedData)

            await fetchAllFiles()
            const data = loadData().flat()
            const categoryFiltered = filterByCategory(data, decodedData.categories)
            console.log('categoryFiltered:', categoryFiltered.length)

            const keywordFiltered = filterByKeywords(categoryFiltered, decodedData.keywords)
            console.log('keywordFiltered:', keywordFiltered)

            const result = filterOutBlacklist(keywordFiltered, decodedData.blacklist)
            console.log('blacklistFiltered:', result.length)

            return NextResponse.json(result, { status: 200 });
        } catch (error) {
            console.error('Error loading data:', error)
            return NextResponse.json({ error: 'Database error occurred: ' + error }, { status: 500 })
        }
    }
}