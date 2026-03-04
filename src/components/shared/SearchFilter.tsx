"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFilterProps {
   placeholder?: string;
   parName?: string;
}

const SearchFilter = ({ placeholder = "Search...", parName = "searchTerm" }: SearchFilterProps) => {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const searchParams = useSearchParams();
   const [value, setValue] = useState(searchParams.get(parName) || "");
   const debounceValue = useDebounce(value, 500);

   useEffect(() => {
      const params = new URLSearchParams(searchParams.toString());

      const initialValue = new URLSearchParams(searchParams.toString()).get(parName) || "";

      if (initialValue !== debounceValue) {
         // setValue(initialValue);
         return;
      }
      if (debounceValue) {
         params.set(parName, debounceValue);
         params.set("page", "1");
      } else {
         params.delete(parName);
      }

      startTransition(() => {
         router.push(`?${params.toString()}`);
      });
   }, [debounceValue]);
   return (
      <div>
         <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
         <Input type="text" name={parName} placeholder={placeholder} className="pl-8" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
   );
};

export default SearchFilter;
