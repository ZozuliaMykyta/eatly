import React from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Discount from "@/components/Discount";
import { ImageProps } from "next/image";

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    const src = typeof props.src === "string" ? props.src : "";
    return <img {...props} src={src} alt={props.alt || "mocked image"} />;
  },
}));

describe("Discount Component", () => {
  it("should add mt-[95px] class when uniqueMargin=true", () => {
    const { container } = render(<Discount uniqueMargin={true} />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.classList.contains("mt-[95px]")).toBe(true);
  });
  it("should add mb-[170px] mt-[130px] min-[768px]:mt-[220px] class when uniqueMargin=false", () => {
    const { container } = render(<Discount uniqueMargin={false} />);
    const section = container.querySelector("section");
    expect(section).not.toBeNull();
    expect(section?.classList.contains("mb-[170px]")).toBe(true);
    expect(section?.classList.contains("mt-[130px]")).toBe(true);
    expect(section?.classList.contains("min-[768px]:mt-[220px]")).toBe(true);
  });
});
