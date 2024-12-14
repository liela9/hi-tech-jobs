import FilterLayout from "@/components/customize/filter/FilterLayout"

export default function FilterPage({ searchParams }: { searchParams: { includes?: string; excludes?: string, categories?: string } }) {
    const includes = searchParams.includes ? JSON.parse(searchParams.includes) : [];
    const excludes = searchParams.excludes ? JSON.parse(searchParams.excludes) : [];
    const categories = searchParams.categories ? JSON.parse(searchParams.categories) : [];

    return (
        <div className="flex items-center mt-12">
            <FilterLayout includes={includes} excludes={excludes} categories={categories}/>
        </div>
    );
}