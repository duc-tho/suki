import Loading from "./loading.jsx"
import { Button } from "./ui/button.jsx"
import { useDispatch, useSelector } from "../store/hooks.js"
import { hide, selectLoading, show } from "../store/slices/loading_slide.js";
import Background from "./background.jsx";

export const Main = () => {
  const { open } = useSelector(selectLoading);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-dvh w-lg max-w-lg sm:border-x border-dashed border-primary relative bg-background overflow-hidden">
        <Button className="absolute cursor-pointer z-[999]" onClick={() => {
          dispatch(open ? hide() : show())
        }}>Click me!</Button>
        <Loading />
        <Background />
      </div>
    </>
  )
}
