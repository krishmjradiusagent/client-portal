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

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value || <span className="text-muted-foreground">{placeholder}</span>}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput 
            placeholder="Type an address..." 
            value={value}
            onValueChange={(val) => onChange(val)}
          />
          <CommandList>
            <CommandEmpty>No address found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              {SUGGESTED_ADDRESSES.map((address) => (
                <CommandItem
                  key={address}
                  value={address}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  {address}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === address ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
