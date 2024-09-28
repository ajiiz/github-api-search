import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce Hook", () => {
  vi.useFakeTimers();

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce({ value: "initial", delay: 500 }));
    expect(result.current).toBe("initial");
  });

  it("should update the debounced value after the delay", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce({ value, delay }), {
      initialProps: { value: "initial", delay: 500 }
    });

    act(() => {
      rerender({ value: "updated", delay: 500 });
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe("updated");
  });

  it("should not update the debounced value before the delay", () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce({ value, delay }), {
      initialProps: { value: "initial", delay: 500 }
    });

    act(() => {
      rerender({ value: "updated", delay: 500 });
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe("initial");
  });

  it("should clear the timeout on unmount", () => {
    const { unmount } = renderHook(() => useDebounce({ value: "initial", delay: 500 }));

    act(() => {
      unmount();
      vi.advanceTimersByTime(500);
    });
  });
});
