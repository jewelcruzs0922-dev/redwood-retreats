import { act, render, screen } from "@testing-library/react";
import { useInView } from "@/lib/useInView";

let intersectionCallback: IntersectionObserverCallback | null = null;
const mockObserve = vi.fn();
const mockUnobserve = vi.fn();

beforeEach(() => {
  intersectionCallback = null;
  mockObserve.mockClear();
  mockUnobserve.mockClear();
  vi.stubGlobal(
    "IntersectionObserver",
    vi.fn().mockImplementation(function (cb: IntersectionObserverCallback) {
      intersectionCallback = cb;
      return { observe: mockObserve, unobserve: mockUnobserve, disconnect: vi.fn() };
    })
  );
});

afterEach(() => {
  vi.restoreAllMocks();
});

function TestComponent({ threshold = 0.1 }: { threshold?: number }) {
  const { ref, isVisible } = useInView(threshold);
  return (
    <div ref={ref} data-testid="target">
      {isVisible ? "visible" : "hidden"}
    </div>
  );
}

describe("useInView", () => {
  it("returns ref and isVisible as false initially", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("target")).toBeTruthy();
    expect(screen.getByText("hidden")).toBeTruthy();
  });

  it("sets isVisible to true when element intersects", () => {
    render(<TestComponent />);

    act(() => {
      intersectionCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver
      );
    });

    expect(screen.getByText("visible")).toBeTruthy();
  });

  it("calls observe on the element", () => {
    render(<TestComponent />);
    expect(mockObserve).toHaveBeenCalled();
  });
});
