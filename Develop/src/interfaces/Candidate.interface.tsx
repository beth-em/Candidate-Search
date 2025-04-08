// TODO: Create an interface for the Candidate objects returned by the API
export interface Candidate {
    name: string;
    username: string;
    location: string;
    avatar: string;
    email: string | null;
    html_url: string;
    company: string | null; 
}

// null is added to email and company because 1 of each of them may not always be available, so we allow it to be null.