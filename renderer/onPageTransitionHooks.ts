// https://vike.dev/clientRouting
export { onHydrationEnd, onPageTransitionStart, onPageTransitionEnd }

import type { OnHydrationEndAsync, OnPageTransitionEndAsync, OnPageTransitionStartAsync } from "vike/types";

const onHydrationEnd: OnHydrationEndAsync = async (): ReturnType<OnHydrationEndAsync> => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Hydration finished; page is now interactive.");
  }
}
const onPageTransitionStart: OnPageTransitionStartAsync = async (): ReturnType<OnPageTransitionStartAsync> => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Page transition start");
  }
  document.querySelector(".page-content")!.classList.add("page-transition");
}
const onPageTransitionEnd: OnPageTransitionEndAsync = async (): ReturnType<OnPageTransitionEndAsync> => {
  if (process.env.NODE_ENV !== "production") {
    console.log("Page transition end");
  }
  document.querySelector(".page-content")!.classList.remove("page-transition");
}
