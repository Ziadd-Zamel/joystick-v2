"use client";
import { useState, useMemo } from "react";
import QuantitySelector from "./quantity-selector";
import AddToCartButton from "@/components/common/add-to-cart-btn";
import { useTranslations } from "next-intl";
import ColorSelector from "./color-selector";

interface ProductColor {
  color: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  description: string;
  small_description: string;
  price: string;
  quantity: string;
  status: string;
  category: string;
  brand: string;
  product_code: string;
  tags: string[];
  main_image: string;
  images: string[];
  product_colors: ProductColor[];
  is_favorite: number;
  created_at: string;
  updated_at: string;
}

export default function AddToCart({
  isLogedin = false,
  product,
}: {
  isLogedin?: boolean;
  product: Product;
}) {
  // Translations
  const t = useTranslations();

  // State
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>(() => {
    // Auto-select first color if only one available, otherwise no selection
    return product.product_colors?.length === 1 ? product.product_colors[0].color : "";
  });

  // Handle color selection
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    // Reset quantity to 1 when color changes
    setQuantity(1);
  };

  // Get available quantity for selected color
  const availableQuantity = useMemo(() => {
    if (!selectedColor) return 0;
    const colorData = product.product_colors?.find(
      (colorItem) => colorItem.color === selectedColor,
    );
    return colorData?.quantity || 0;
  }, [selectedColor, product.product_colors]);

  // Check if color is selected (for QuantitySelector)
  const isColorSelected = selectedColor !== "";

  // Get max quantity (either from selected color or general product quantity)
  const maxQuantity = useMemo(() => {
    if (product.product_colors?.length > 0) {
      return availableQuantity;
    }
    return parseInt(product.quantity) || 50;
  }, [availableQuantity, product.quantity, product.product_colors]);

  return (
    <div className="mt-auto flex flex-col gap-4">
      {/* Color Selection - only show if multiple colors available */}
      <ColorSelector
        colors={product.product_colors}
        selectedColor={selectedColor}
        onColorSelect={handleColorSelect}
        label={t("colors") || "الألوان"}
        size="md"
        showQuantity={true}
        orientation="horizontal"
      />

      {/* Quantity and Add to Cart */}
      <div className="flex items-center justify-between">
        <QuantitySelector
          quantity={quantity}
          onQuantityChange={setQuantity}
          availableText={t("available-quantity")}
          selectColorText={t("select-color-first") || "Please select a color"}
          max={maxQuantity}
          availableQuantity={availableQuantity}
          selectedColor={isColorSelected}
          showAvailableText={true}
        />

        <AddToCartButton isLogedin={isLogedin} productId={product.id} />
      </div>
    </div>
  );
}
