import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 800px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1024px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-device-width:750px)",
  });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });

  return {
    isDesktopOrLaptop,
    isBigScreen,
    isTabletOrMobile,
    isPortrait,
    isTabletOrMobileDevice,
    isMobile,
  };
};

export default useResponsive;
