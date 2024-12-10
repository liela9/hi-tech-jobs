import FilterLayout from "@/components/customize/filter/FilterLayout"

export default function FilterPage({ searchParams }: { searchParams: { includes?: string; excludes?: string, categories?: string } }) {
    const includes = searchParams.includes ? JSON.parse(searchParams.includes) : [];
    const excludes = searchParams.excludes ? JSON.parse(searchParams.excludes) : [];
    const categories = searchParams.categories ? JSON.parse(searchParams.categories) : [];

    return (
        <FilterLayout includes={includes} excludes={excludes} categories={categories}/>
    );
}