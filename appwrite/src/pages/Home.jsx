import { Navbar } from '@/components'
import { Landing } from '@/section'
const Home = () => {
  return (
      <div>
      <Navbar />
      <div className="sm:mx-auto sm:container sm:my-20 mx-8 my-10">
          <Landing />
      </div>
    </div>
  )
}

export default Home