type Job = {
    id: string;
    title: string;
    company: string;
    department: string;
    city: string;
    level: string,
    url: string;
    submition_time: string;
    referrer: string;
    status: string;
}

type Card = {
    id: string;
    title: string;
    description?: string;
    choices: string[];
}

type UserPreferences = {
    includes: string[]; 
    excludes: string[]; 
    categories: string[];
}