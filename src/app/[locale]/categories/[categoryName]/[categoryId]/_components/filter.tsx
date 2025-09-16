"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { FilterIcon, Search } from "lucide-react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";

interface Brand {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface FilterProps {
  brands: Brand[];
  tags: Tag[];
  initialBrandIds?: number[];
  initialTagIds?: number[];
  initialPriceRange?: number[];
  initialNameFilter?: string;
}

function FilterContent({
  brands,
  tags,
  initialBrandIds = [],
  initialTagIds = [],
  initialPriceRange = [0, 9999],
  initialNameFilter = "",
}: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("category-route");

  // Local state for filters initialized with props
  const [localBrandIds, setLocalBrandIds] = useState<number[]>(initialBrandIds);
  const [localTagIds, setLocalTagIds] = useState<number[]>(initialTagIds);
  const [localPriceRange, setLocalPriceRange] = useState<number[]>(initialPriceRange);
  const [localNameFilter, setLocalNameFilter] = useState(initialNameFilter);

  const updateSearchParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "" || value === "0,9999") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  const toggleBrand = (brandId: number) => {
    setLocalBrandIds((prev) =>
      prev.includes(brandId) ? prev.filter((id) => id !== brandId) : [...prev, brandId],
    );
  };

  const toggleTag = (tagId: number) => {
    setLocalTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId],
    );
  };

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange(values);
  };

  const applyBrandFilters = () => {
    updateSearchParams({
      brand_id: localBrandIds.length > 0 ? localBrandIds.join(",") : null,
    });
  };

  const applyTagFilters = () => {
    updateSearchParams({
      tags: localTagIds.length > 0 ? localTagIds.join(",") : null,
    });
  };

  const applyPriceFilters = () => {
    updateSearchParams({
      price_from: localPriceRange[0] > 0 ? localPriceRange[0].toString() : null,
      price_to: localPriceRange[1] < 9999 ? localPriceRange[1].toString() : null,
    });
  };

  const handleNameSearch = () => {
    updateSearchParams({
      name: localNameFilter || null,
    });
  };

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNameSearch();
    }
  };

  const clearAll = () => {
    setLocalBrandIds([]);
    setLocalTagIds([]);
    setLocalPriceRange([0, 9999]);
    setLocalNameFilter("");
    updateSearchParams({
      brand_id: null,
      tags: null,
      price_from: null,
      price_to: null,
      name: null,
    });
  };

  return (
    <div className="h-full w-full overflow-y-auto bg-white px-6 py-9 shadow-sm lg:rounded-4xl">
      {/* Search by Name */}
      <div className="mb-8">
        <h3 className="mb-6 text-lg">{t("search-by-name")}</h3>
        <div className="relative">
          <Input
            type="text"
            placeholder={t("search-products")}
            value={localNameFilter}
            onChange={(e) => setLocalNameFilter(e.target.value)}
            onKeyPress={handleNameKeyPress}
            className="end-12 w-full rounded-lg border border-gray-200 px-4 py-3 text-base focus:border-[#02A09B] focus:outline-none"
          />
          <Button
            onClick={handleNameSearch}
            variant="ghost"
            size="sm"
            className="absolute end-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100"
          >
            <Search className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </div>

      <Separator className="mb-10 h-px w-full bg-[#EEEEEE]" />

      {/* Brands */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg">{t("brands")}</h3>
          <Button
            onClick={applyBrandFilters}
            variant="outline"
            size="sm"
            className="rounded-sm border-[#02A09B] bg-[#02A09B] px-4 py-1 text-xs text-white hover:bg-[#02A09B]/90 hover:text-white"
          >
            {t("apply")}
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {brands?.map((brand) => {
            const isSelected = localBrandIds.includes(Number(brand.id));
            return (
              <div key={brand.id} className="flex items-center space-x-3">
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={isSelected}
                  onCheckedChange={() => toggleBrand(Number(brand.id))}
                  className="data-[state=checked]:border-[#02A09B] data-[state=checked]:bg-[#02A09B]"
                />
                <Label
                  htmlFor={`brand-${brand.id}`}
                  className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {brand.name}
                </Label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="mb-10 h-px w-full bg-[#EEEEEE]" />

      {/* Categories/Tags */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg">{t("categories")}</h3>
          <Button
            onClick={applyTagFilters}
            variant="outline"
            size="sm"
            className="rounded-sm border-[#02A09B] bg-[#02A09B] px-4 py-1 text-xs text-white hover:bg-[#02A09B]/90 hover:text-white"
          >
            {t("apply")}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag) => {
            const isSelected = localTagIds.includes(Number(tag.id));
            return (
              <Button
                key={tag.id}
                variant="outline"
                size="sm"
                onClick={() => toggleTag(Number(tag.id))}
                className={`rounded-sm px-3 py-2 text-sm transition-colors ${
                  isSelected
                    ? "border-[#02A09B] bg-[#F2FAFA] text-[#02A09B] hover:bg-[#02A09B]/90 hover:text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {tag.name}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator className="mb-10 h-px w-full bg-[#EEEEEE]" />

      {/* Average Prices */}
      {/* Average Prices */}
      <div className="mb-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg">{t("average-prices")}</h3>
          <Button
            onClick={applyPriceFilters}
            variant="outline"
            size="sm"
            className="rounded-sm border-[#02A09B] bg-[#02A09B] px-4 py-1 text-xs text-white hover:bg-[#02A09B]/90 hover:text-white"
          >
            {t("apply")}
          </Button>
        </div>

        {/* Slider */}
        <DualRangeSlider
          value={localPriceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={9999}
          step={1}
        />

        {/* Inputs for From & To */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex w-1/2 flex-col">
            <Label htmlFor="price-from" className="mb-2 text-lg text-gray-500">
              {t("from")}
            </Label>
            <Input
              id="price-from"
              type="number"
              min={0}
              max={localPriceRange[1]}
              value={localPriceRange[0]}
              onChange={(e) => {
                const val = Math.max(0, Math.min(Number(e.target.value), localPriceRange[1]));
                setLocalPriceRange([val, localPriceRange[1]]);
              }}
            />
          </div>
          <div className="flex w-1/2 flex-col">
            <Label htmlFor="price-to" className="mb-2 text-lg text-gray-500">
              {t("to")}
            </Label>
            <Input
              id="price-to"
              type="number"
              min={localPriceRange[0]}
              max={9999}
              value={localPriceRange[1]}
              onChange={(e) => {
                const val = Math.min(9999, Math.max(Number(e.target.value), localPriceRange[0]));
                setLocalPriceRange([localPriceRange[0], val]);
              }}
            />
          </div>
        </div>
      </div>

      {/* Clear All */}
      <Button
        variant="ghost"
        onClick={clearAll}
        className="w-full text-base font-medium text-[#02A09B] hover:bg-orange-50"
      >
        {t("clear-all")}
      </Button>
    </div>
  );
}

export default function Filter({
  brands,
  tags,
  initialBrandIds,
  initialTagIds,
  initialPriceRange,
  initialNameFilter,
}: FilterProps) {
  return (
    <>
      {/* Desktop Filter - Hidden on mobile */}
      <div className="mt-4 hidden w-full lg:top-4 lg:block lg:max-w-[300px] lg:min-w-[300px] xl:max-w-[400px] xl:min-w-[400px]">
        <FilterContent
          brands={brands}
          tags={tags}
          initialBrandIds={initialBrandIds}
          initialTagIds={initialTagIds}
          initialPriceRange={initialPriceRange}
          initialNameFilter={initialNameFilter}
        />
      </div>

      {/* Mobile Filter Sheet - Visible only on mobile */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="genz:bg-gradient genz:text-white rounded-full border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              <FilterIcon className="text-lg text-[#02A09B]" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="overflow-y-auto rounded-none bg-[#FBFBFB]">
            <SheetHeader className="border-b px-6 py-4">
              <SheetTitle className="text-lg font-semibold text-[#02A09B]">Filters</SheetTitle>
              <SheetDescription className="sr-only" />
            </SheetHeader>
            <div className="max-h-screen flex-1 overflow-y-scroll">
              <FilterContent
                brands={brands}
                tags={tags}
                initialBrandIds={initialBrandIds}
                initialTagIds={initialTagIds}
                initialPriceRange={initialPriceRange}
                initialNameFilter={initialNameFilter}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
