"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const SUGGESTED_ADDRESSES = [
  "123 Maple Ave, Austin, TX",
  "456 Oak St, Austin, TX",
  "789 Pine Rd, Austin, TX",
  "101 Cedar Ln, Austin, TX",
  "202 Birch Blvd, Austin, TX",
  "505 Willow Dr, Austin, TX",
  "808 Elm St, Austin, TX",
];

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Search address...",
}: AddressAutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);
  const [isSearching, setIsSearching] = React.useState(false);

  // Update internal input value when external value changes
  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const filteredAddresses = React.useMemo(() => {
    if (!inputValue) return SUGGESTED_ADDRESSES;
    return SUGGESTED_ADDRESSES.filter(addr => 
      addr.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue]);

  const handleSelect = (address: string) => {
    onChange(address);
    setOpen(false);
  };

  const handleInputChange = (val: string) => {
    setInputValue(val);
    if (val && val !== value) {
      setIsSearching(true);
      setTimeout(() => setIsSearching(false), 600);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal bg-slate-50/50 hover:bg-slate-50 border-slate-200"
        >
          <div className="flex items-center gap-2 truncate">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            {value || <span className="text-slate-400">{placeholder}</span>}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 shadow-xl border-slate-200" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Type an address..." 
            value={inputValue}
            onValueChange={handleInputChange}
          />
          <CommandList className="max-h-[300px]">
            {isSearching ? (
              <div className="py-6 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                Searching addresses...
              </div>
            ) : (
              <>
                <CommandEmpty>No address found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  {filteredAddresses.map((address) => (
                    <CommandItem
                      key={address}
                      value={address}
                      onSelect={() => handleSelect(address)}
                      className="cursor-pointer py-3"
                    >
                      <MapPin className="mr-2 h-4 w-4 text-slate-400" />
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-700">{address.split(',')[0]}</span>
                        <span className="text-xs text-slate-400">{address.split(',').slice(1).join(',').trim()}</span>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4 text-primary",
                          value === address ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
