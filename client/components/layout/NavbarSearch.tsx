"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const NavbarSearch = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [search, setSearch] = useState(params.get("search") ?? "");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const query = new URLSearchParams(params.toString());

    if (search) {
      query.set("search", search);
    } else {
      query.delete("search");
    }

    router.push(`/?${query.toString()}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-1 items-center overflow-hidden rounded-md bg-white text-zinc-900"
    >
      <button
        type="button"
        className="flex items-center gap-1 bg-zinc-100 px-3 py-2 text-xs text-zinc-700"
      >
        All
        <ChevronDown className="h-3 w-3" />
      </button>
      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products"
        className="flex-1 px-3 py-2 text-sm outline-none"
      />
      <button
        type="submit"
        className="flex items-center justify-center bg-(--amazon-orange) px-4 py-2 text-sm font-semibold text-zinc-900"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
};

export default NavbarSearch;
