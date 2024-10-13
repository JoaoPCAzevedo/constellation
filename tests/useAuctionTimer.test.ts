import { renderHook, act } from "@testing-library/react-native";
import { useAuctionTimer } from "@/hooks/useAuctionTimer";

describe("useAuctionTimer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return correct time until auction", () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1); // Set to tomorrow
    const { result } = renderHook(() =>
      useAuctionTimer(futureDate.toISOString())
    );

    expect(`${result.current?.title} ${result.current?.value}`).toMatch(
      /Time until auction: 1d \d{1,2}h \d{1,2}m/
    );
  });

  it("should show auction started message for past dates", () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // Set to yesterday
    const { result } = renderHook(
      () => useAuctionTimer(pastDate.toISOString())?.title
    );

    expect(result.current).toMatch(/Auction started at:/);
  });
});
