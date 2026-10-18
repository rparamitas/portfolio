"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

// Root is re-exported (not wrapped) to keep the generic <Value, Multiple>
// inference intact for controlled usage.
const MultiSelect = ComboboxPrimitive.Root;

// Hook from Base UI exposing the filtered popup items. Aliased so consumers
// (e.g. "no ingredient matches the typed query") don't need deep imports.
const useMultiSelectFilteredItems = ComboboxPrimitive.useFilteredItems;

function MultiSelectGroup({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.InputGroup>) {
  return (
    <ComboboxPrimitive.InputGroup
      data-slot="multi-select-group"
      className={cn(
        "bg-card focus-within:outline-primary flex w-full flex-wrap items-center gap-1 rounded border-2 border-black px-2 py-1 text-sm shadow-sm transition-colors focus-within:outline-2 focus-within:outline-offset-2",
        className,
      )}
      {...props}
    />
  );
}

function MultiSelectChips({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Chips>) {
  return (
    <ComboboxPrimitive.Chips
      data-slot="multi-select-chips"
      className={cn("flex flex-wrap items-center gap-1", className)}
      {...props}
    />
  );
}

function MultiSelectChip({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Chip>) {
  return (
    <ComboboxPrimitive.Chip
      data-slot="multi-select-chip"
      className={cn(
        "bg-muted inline-flex items-center gap-1 rounded border-2 border-black px-1.5 py-0.5 text-xs font-medium",
        className,
      )}
      {...props}
    />
  );
}

function MultiSelectChipRemove({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.ChipRemove>) {
  return (
    <ComboboxPrimitive.ChipRemove
      data-slot="multi-select-chip-remove"
      className={cn(
        "hover:bg-accent focus-visible:outline-primary flex size-4 cursor-pointer items-center justify-center rounded-sm transition-colors focus-visible:outline-2",
        className,
      )}
      {...props}
    >
      {children ?? <X className="size-3" aria-hidden />}
    </ComboboxPrimitive.ChipRemove>
  );
}

function MultiSelectInput({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Input>) {
  return (
    <ComboboxPrimitive.Input
      data-slot="multi-select-input"
      className={cn(
        "placeholder:text-muted-foreground min-w-24 flex-1 bg-transparent py-0.5 outline-none",
        className,
      )}
      {...props}
    />
  );
}

function MultiSelectPortal({
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Portal>) {
  return (
    <ComboboxPrimitive.Portal data-slot="multi-select-portal" {...props} />
  );
}

function MultiSelectPositioner({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Positioner>) {
  return (
    <ComboboxPrimitive.Positioner
      data-slot="multi-select-positioner"
      sideOffset={4}
      className={cn("z-50 outline-none", className)}
      {...props}
    />
  );
}

function MultiSelectPopup({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Popup>) {
  return (
    <ComboboxPrimitive.Popup
      data-slot="multi-select-popup"
      className={cn(
        "bg-card text-card-foreground max-h-64 w-(--positioner-width) overflow-y-auto rounded border-2 border-black shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

function MultiSelectList({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.List>) {
  return (
    <ComboboxPrimitive.List
      data-slot="multi-select-list"
      className={cn("flex flex-col p-1", className)}
      {...props}
    />
  );
}

function MultiSelectItem({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Item>) {
  return (
    <ComboboxPrimitive.Item
      data-slot="multi-select-item"
      className={cn(
        "data-highlighted:bg-accent cursor-pointer rounded px-2 py-1.5 text-sm transition-colors outline-none data-selected:font-semibold",
        className,
      )}
      {...props}
    />
  );
}

function MultiSelectEmpty({
  className,
  ...props
}: React.ComponentProps<typeof ComboboxPrimitive.Empty>) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="multi-select-empty"
      className={cn("text-muted-foreground px-2 py-1.5 text-sm", className)}
      {...props}
    />
  );
}

export {
  MultiSelect,
  useMultiSelectFilteredItems,
  MultiSelectGroup,
  MultiSelectChips,
  MultiSelectChip,
  MultiSelectChipRemove,
  MultiSelectInput,
  MultiSelectPortal,
  MultiSelectPositioner,
  MultiSelectPopup,
  MultiSelectList,
  MultiSelectItem,
  MultiSelectEmpty,
};
