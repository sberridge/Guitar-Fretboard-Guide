import type { NextPage } from 'next'
import Fretboard from '../components/guitar/fretboard'
import Layout from '../components/layout'


const Home: NextPage = () => {
    
  return (
    <Layout>
      <Fretboard></Fretboard>
    </Layout>
  )
}

export default Home
