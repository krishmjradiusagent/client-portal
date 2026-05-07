"use client";

import * as React from "react";
import {
  Archive,
  Check,
  ChevronDown,
  CirclePlus,
  Delete,
  Filter,
  PencilLine,
  Search,
  Tag,
  Trash2,
  UserRoundPlus,
  X,
  Sparkles,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type PanelKey = "stage" | "source" | "collaborator" | "tags";
type SelectionKey = "selection";

type Option = {
  id: string;
  label: string;
  meta?: string;
  icon?: React.ReactNode;
};

const stageOptions: Option[] = [
  { id: "new-client", label: "New Client" },
  { id: "met-with-client", label: "Met with Client" },
  { id: "pre-approved", label: "Pre-approved/Listing Prepped" },
  { id: "showings", label: "Showings/Tours" },
  { id: "offers", label: "Sending/Receiving Offers" },
  { id: "in-contract", label: "In Contract" },
  { id: "closed", label: "Closed" },
  { id: "archived", label: "Archived" },
];

const sourceOptions: Option[] = [
  { id: "agency", label: "Agency" },
  { id: "builder", label: "Builder" },
  { id: "events", label: "Events" },
  { id: "floor-call", label: "Floor Call" },
  { id: "fsbo", label: "FSBO" },
  { id: "mail", label: "Mail" },
  { id: "mobile-app", label: "My mobile app" },
  { id: "networking", label: "Networking" },
  { id: "new-construction", label: "New Construction" },
  { id: "open-house", label: "Open House" },
  { id: "opcity", label: "OpCity/Realtor.com" },
  { id: "others", label: "Others" },
  { id: "farming", label: "Paid Marketing - Farming/Direct" },
  { id: "zillow-paid", label: "Paid Marketing - Zillow" },
  { id: "personal-transaction", label: "Personal Transaction" },
  { id: "property-management", label: "Property Management" },
  { id: "radius-marketplace", label: "Radius Marketplace" },
  { id: "attorney", label: "Referral - Attorney" },
  { id: "past-client", label: "Referral - From Past Client" },
  { id: "lender", label: "Referral - Lender" },
  { id: "external-agent", label: "Referral - Real Estate Agent(External)" },
  { id: "sphere", label: "Referral - Sphere of Influence" },
  { id: "title", label: "Referral - Title" },
  { id: "referrals", label: "Referrals (Agent/Lender)" },
  { id: "self", label: "Self" },
  { id: "sign-call", label: "Sign Call" },
  { id: "facebook", label: "Social Profile - Facebook" },
  { id: "instagram", label: "Social Profile - Instagram" },
  { id: "sphere-personal", label: "Sphere of Influence/Personal" },
  { id: "mentor", label: "Team/Mentor Lead" },
  { id: "zillow-personal", label: "Zillow (Agent's Personal Account)" },
  { id: "zillow-provided", label: "Zillow (Radius Provided)" },
  { id: "zillow-flex", label: "Zillow Flex" },
  { id: "zillow", label: "Zillow" },
  { id: "slyhomes", label: "Slyhomes" },
  { id: "skyhomes", label: "Skyhomes" },
  { id: "skr", label: "SKR" },
];

const collaboratorOptions: Option[] = [
  { id: "rick", label: "Rick Noguera", meta: "T.C." },
  { id: "roger", label: "Roger Zelaya", meta: "T.C." },
  { id: "dillion", label: "Dillion Dennis", meta: "T.C." },
  { id: "sandeep-team", label: "Sandeep M Team", meta: "T.C." },
  { id: "james-cooper", label: "James Cooper", meta: "Vendor" },
  { id: "james-mori", label: "James Mori", meta: "T.C. · Invited" },
  { id: "sandeep-tc", label: "Sandeep TC 1", meta: "T.C. · Invited" },
  { id: "james-money", label: "James Money", meta: "Lender" },
  { id: "joe-assistant", label: "Joe Assistant", meta: "Assistant · Invited" },
];

const tagOptions: Option[] = [
  { id: "newzillowleads", label: "#newzillowleads" },
  { id: "probate", label: "#probate" },
  { id: "probatejune", label: "#probatejune" },
  { id: "probatewebsite", label: "#probatewebsite" },
];

const selectionMenu = [
  "Select all 10 visible clients",
  "Select all 243 matching clients",
  "Clear selection",
];

const actionMenu = [
  { id: "collaborator", label: "Assign Collaborator", icon: <UserRoundPlus /> },
  { id: "stage", label: "Update Stage", icon: <PencilLine /> },
  { id: "source", label: "Update Source", icon: <Sparkles /> },
  { id: "pond", label: "Assign Pond", icon: <CirclePlus /> },
  { id: "merge", label: "Merge Clients", icon: <Check /> },
  { id: "export", label: "Export Clients", icon: <Upload /> },
  { id: "archive", label: "Archive Clients", icon: <Archive /> },
  { id: "delete", label: "Delete Clients", icon: <Trash2 /> },
];

const tagMenu = [
  { id: "add", label: "Add Tags" },
  { id: "remove", label: "Remove Tags" },
];

export function BulkClientActionsToolbar() {
  const { toast } = useToast();
  const [selectedCount, setSelectedCount] = React.useState(1);
  const totalVisible = 10;
  const totalMatching = 243;
  const [selectionOpen, setSelectionOpen] = React.useState(false);
  const [activePanel, setActivePanel] = React.useState<PanelKey | null>(null);
  const [dialogSearch, setDialogSearch] = React.useState<Record<PanelKey, string>>({
    stage: "",
    source: "",
    collaborator: "",
    tags: "",
  });
  const [dialogValue, setDialogValue] = React.useState<Record<PanelKey, string>>({
    stage: "new-client",
    source: "zillow",
    collaborator: "james-money",
    tags: "probate",
  });
  const [dialogValues, setDialogValues] = React.useState<Record<PanelKey, string[]>>({
    stage: [],
    source: [],
    collaborator: ["james-money"],
    tags: ["probate"],
  });

  const closePanel = () => {
    setActivePanel(null);
    setDialogSearch({ stage: "", source: "", collaborator: "", tags: "" });
  };

  const submitPanel = () => {
    if (activePanel === "stage") {
      toast({ title: "Client stage updated" });
    } else if (activePanel === "source") {
      toast({ title: "Client source updated" });
    } else if (activePanel === "collaborator") {
      toast({ title: "Collaborators assigned" });
    } else if (activePanel === "tags") {
      toast({ title: "Tags added" });
    }
    closePanel();
  };

  const filteredOptions = (panel: PanelKey) => {
    const q = dialogSearch[panel].trim().toLowerCase();
    const source = panel === "stage"
      ? stageOptions
      : panel === "source"
        ? sourceOptions
        : panel === "collaborator"
          ? collaboratorOptions
          : tagOptions;

    if (!q) return source;
    return source.filter((item) =>
      `${item.label} ${item.meta ?? ""}`.toLowerCase().includes(q)
    );
  };

  const isMulti = activePanel === "collaborator" || activePanel === "tags";

  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-8">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-background px-2 py-2 shadow-sm shadow-black/5">
          <DropdownMenu open={selectionOpen} onOpenChange={setSelectionOpen}>
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 rounded-full border-border bg-muted/40 px-3 text-sm font-medium text-foreground shadow-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Selection actions"
                  >
                    <span>{selectedCount}/{totalVisible} selected</span>
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>Selection actions</TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="start" sideOffset={10} className="w-64 rounded-2xl p-2">
              <DropdownMenuLabel className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Selection
              </DropdownMenuLabel>
              {selectionMenu.map((item) => (
                <DropdownMenuItem
                  key={item}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm",
                    item.includes("Clear") && "text-destructive focus:text-destructive"
                  )}
                  onSelect={(e) => {
                    e.preventDefault();
                    if (item === "Clear selection") {
                      setSelectedCount(0);
                      toast({ title: "Selection cleared" });
                    } else if (item === "Select all 10 visible clients") {
                      setSelectedCount(totalVisible);
                    } else {
                      setSelectedCount(totalMatching);
                    }
                    setSelectionOpen(false);
                  }}
                >
                  {item}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full border-border bg-background shadow-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Tags actions"
                  >
                    <Tag className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>Tags</TooltipContent>
              <DropdownMenuContent align="start" sideOffset={10} className="w-56 rounded-2xl p-2">
                <DropdownMenuLabel className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Tags
                </DropdownMenuLabel>
                {tagMenu.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    className="rounded-xl px-3 py-2 text-sm"
                    onSelect={(e) => {
                      e.preventDefault();
                      setActivePanel("tags");
                    }}
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </Tooltip>

          <Tooltip>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button
                    variant="default"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label="Bulk actions"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>Actions</TooltipContent>
              <DropdownMenuContent align="start" sideOffset={10} className="w-64 rounded-2xl p-2">
                <DropdownMenuLabel className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Actions
                </DropdownMenuLabel>
                {actionMenu.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm",
                      item.id === "delete" && "text-destructive focus:text-destructive"
                    )}
                    onSelect={(e) => {
                      e.preventDefault();
                      if (item.id === "stage" || item.id === "source" || item.id === "collaborator" || item.id === "merge" || item.id === "pond") {
                        setActivePanel(item.id === "merge" || item.id === "pond" ? null : (item.id as PanelKey));
                        if (item.id === "merge") {
                          toast({ title: "Clients merged" });
                        } else if (item.id === "pond") {
                          toast({ title: "Pond assigned" });
                        }
                        return;
                      }
                      if (item.id === "export") toast({ title: "Export started" });
                      if (item.id === "archive") toast({ title: "Client archived" });
                      if (item.id === "delete") toast({ title: "Client deleted" });
                    }}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/60">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Clear selection"
                onClick={() => {
                  setSelectedCount(0);
                  toast({ title: "Selection cleared" });
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Clear selection</TooltipContent>
          </Tooltip>
        </div>

        <Dialog open={activePanel !== null} onOpenChange={(open) => !open && closePanel()}>
          <DialogContent className="max-w-[640px] gap-0 overflow-hidden rounded-2xl border-border p-0 shadow-2xl">
            {activePanel && (
              <>
                <DialogHeader className="border-b border-border px-6 py-5 text-left">
                  <DialogTitle className="text-xl font-semibold">
                    {activePanel === "stage"
                      ? "Update Stage"
                      : activePanel === "source"
                        ? "Update Source"
                        : activePanel === "collaborator"
                          ? "Assign Collaborator"
                          : "Add Tags"}
                  </DialogTitle>
                  <DialogDescription className="text-sm text-muted-foreground">
                    {activePanel === "stage"
                      ? "Choose one client stage."
                      : activePanel === "source"
                        ? "Choose one client source."
                        : activePanel === "collaborator"
                          ? "Select collaborators to assign."
                          : "Select tags to add."}
                  </DialogDescription>
                </DialogHeader>

                <Command className="rounded-none border-0">
                  <CommandInput
                    placeholder={
                      activePanel === "stage"
                        ? "Search stage"
                        : activePanel === "source"
                          ? "Search source"
                          : activePanel === "collaborator"
                            ? "Search team members"
                            : "Search or create a new tag"
                    }
                    value={dialogSearch[activePanel]}
                    onValueChange={(value) =>
                      setDialogSearch((prev) => ({ ...prev, [activePanel]: value }))
                    }
                  />
                  <CommandList className="max-h-[360px] px-2 py-2">
                    <CommandEmpty>Nothing found.</CommandEmpty>
                    <CommandGroup>
                      {filteredOptions(activePanel).map((item) => {
                        const selected = isMulti
                          ? dialogValues[activePanel].includes(item.id)
                          : dialogValue[activePanel] === item.id;
                        return (
                          <CommandItem
                            key={item.id}
                            value={`${item.label} ${item.meta ?? ""}`}
                            className="rounded-xl px-3 py-3"
                            onSelect={() => {
                              if (activePanel === "stage" || activePanel === "source") {
                                setDialogValue((prev) => ({ ...prev, [activePanel]: item.id }));
                              } else {
                                setDialogValues((prev) => ({
                                  ...prev,
                                  [activePanel]: prev[activePanel].includes(item.id)
                                    ? prev[activePanel].filter((id) => id !== item.id)
                                    : [...prev[activePanel], item.id],
                                }));
                              }
                            }}
                          >
                            <div className="flex min-w-0 flex-1 items-center gap-3">
                              <span className="truncate text-sm font-medium">{item.label}</span>
                              {item.meta ? (
                                <span className="rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                                  {item.meta}
                                </span>
                              ) : null}
                            </div>
                            <div className="ml-auto flex h-5 w-5 items-center justify-center">
                              {selected ? (
                                <Check className="h-4 w-4 text-primary" />
                              ) : (
                                <span className="h-2 w-2 rounded-full border border-muted-foreground/30" />
                              )}
                            </div>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>

                <div className="sticky bottom-0 border-t border-border bg-background px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" className="rounded-full px-4" onClick={closePanel}>
                      Cancel
                    </Button>
                    <Button
                      className="rounded-full px-4"
                      disabled={
                        activePanel === "stage" || activePanel === "source"
                          ? !dialogValue[activePanel]
                          : dialogValues[activePanel].length === 0
                      }
                      onClick={submitPanel}
                    >
                      {activePanel === "stage"
                        ? "Update stage"
                        : activePanel === "source"
                          ? "Update source"
                          : activePanel === "collaborator"
                            ? "Assign collaborator"
                            : "Add tags"}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  );
}
