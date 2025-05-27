import Loading from './common/loading'
import { Button } from './ui/button'
import { useDispatch, useSelector } from '../store/hooks'
import { hide, selectLoading, show } from '../store/slices/loading_slide'
import Background from './common/background'

export const Main = () => {
   const { open } = useSelector(selectLoading)
   const dispatch = useDispatch()

   return (
      <>
         <div className="border-primary bg-background relative flex min-h-dvh w-lg max-w-lg flex-col items-center justify-center overflow-hidden border-dashed sm:border-x">
            <Button
               className="absolute z-[999] cursor-pointer"
               onClick={() => {
                  dispatch(open ? hide() : show())
               }}
            >
               Click me!
            </Button>
            <Loading />
            <Background />
         </div>
      </>
   )
}
