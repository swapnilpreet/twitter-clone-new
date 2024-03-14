import React from 'react'
import PremiumCard from '../Componets/PremiumCard'
import {useSelector} from 'react-redux';

const palnsData =['free','silver']

const Premium = () => {
  const user = useSelector((state) => state?.users?.user);
  return (
    <div className='w-[100%] mb-20'>
      <h1 className='m-auto w-fit text-4xl p-4'>Premium Subscription</h1>
      <div className='sm:flex justify-center gap-5'>

        <PremiumCard postperDays={1} displayprice={'free'} disabled={true} plan={user?.subscription === 'free' ? true : false} title={"free"} five={true} six={true} seven={true} eight={true} nine={true} ten={true} eleven={true} tweaeel={true} thirteen={true} fourteen={true} fifteen={true}/>

        <PremiumCard postperDays={5} displayprice={100} rupee={1000} plan={user?.subscription === 'silver' ? true : false} title={"silver"} eleven={true} tweaeel={true} thirteen={true} fourteen={true} fifteen={true}/>
      </div>

       <div className=' m-auto mt-5'>
        <PremiumCard postperDays={"unlimited"} displayprice={1000} rupee={10000} plan={user?.subscription === 'gold' ? true : false} title={"gold"} />
       </div>

    </div>
  )
}

export default Premium