import { useState, useEffect } from 'react';

type Return = {
    title: string,
    value: string | number;
};

export function useAuctionTimer(auctionDateTime: string) {
  const [timeRemaining, setTimeRemaining] = useState<Return>();

  useEffect(() => {
    function calculateTimeUntilAuction(): Return {
      const now = new Date();
      const auctionDate = new Date(auctionDateTime);
      const timeDiff = auctionDate.getTime() - now.getTime();

      if (timeDiff <= 0) {
        return {title: 'Auction started at:', value: auctionDate.toLocaleString()};
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      return {title: 'Time until auction:', value: `${days}d ${hours}h ${minutes}m`};
    }

    // Initial calculation
    setTimeRemaining(calculateTimeUntilAuction());

    // Set up an interval to update the time every minute
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeUntilAuction());
    }, 60000); // 60000 ms = 1 minute

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [auctionDateTime]);

  return timeRemaining;
}

