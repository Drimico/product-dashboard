import type { NavigateFunction } from "react-router-dom";

const globalRouter: { navigate: NavigateFunction | null } = {
  navigate: null,
};

export default globalRouter;
