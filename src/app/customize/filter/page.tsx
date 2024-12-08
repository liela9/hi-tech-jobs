import FilterLayout from "@/components/customize/filter/FilterLayout"

export default function FilterPage({ searchParams }: { searchParams: { includes?: string; excludes?: string } }) {
    const includes = searchParams.includes ? JSON.parse(searchParams.includes) : [];
    const excludes = searchParams.excludes ? JSON.parse(searchParams.excludes) : [];

    return (
        <FilterLayout includes={includes} excludes={excludes}/>
    );
}