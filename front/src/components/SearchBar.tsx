import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({placeholder=""}:{
    placeholder?: string
}) => {
    return (
        <div className="w-full ">
            <div className="relative w-full rounded-lg border border-neutral-200 bg-white text-neutral-950 h-12 p-1 flex items-center pr-2">
                <Input 
                    className="shadow-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 selection:bg-search-selection selection:text-white" 
                    placeholder={placeholder}
                />
                
                <div className="bg-eng-primary rounded text-white h-full aspect-square flex items-center justify-center">
                    <Search className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

export { SearchBar };