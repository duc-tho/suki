import Background from './common/background'
import Loading from './common/loading'
import Body from './layout/body'
import Footer from './layout/footer'
import Header from './layout/header'
import { Toaster } from './ui/sonner'

export const Main = () => (
   <div className="border-primary bg-background relative top-0 flex min-h-dvh w-lg max-w-lg flex-col items-center justify-center overflow-hidden border-dashed sm:border-x">
      <div className="absolute z-20 flex min-h-dvh w-full flex-col items-center justify-center">
         <Header />
         <Body />
         <Footer />
      </div>
      <Loading />
      <Background />
      <Toaster position="bottom-center" offset={15} />
   </div>
)
