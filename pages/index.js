// Home Page
import Head from "next/head";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useSession, signIn, getSession } from "next-auth/react";
import Router from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      Router.push("/profile");
    }
  }, []);
  return (

    <header >
      {/* navbar */}
      <div className="flex  bg-blue-200 text-black h-[68px] ">
        {/* Center */}
<div className="flex items-center justify-center m-4">
  <div>
    <img className="h-[35px] w-[100px] m-2" src={"../images/mededg_logo2.png"} />
    <div className="text-xs xl:text-sm text-center">An Edge over Medical Diagnosis </div>
    
  </div>
</div>


        {/* middle */}
        <div className="flex grow relative items-center ">
          {/* <Search /> */}
        </div>
       
      </div>
      <div className="flex bg-gray-900 text-cyan-500 font-semibold items-center  space-x-3 text-xl xl:text-xl p-2 pl-52">
        <div> Empowering </div>
        <div> Global</div>
        <div> Well-being: </div>
        <div> Elevating </div>
        <div> Healthcare</div>
        <div> Standards </div>
        <div> for a Healthier World</div>
      </div>

      {/* homepage */}
      <div className="relative h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-black"> <img className="h-screen w-screen" src={"../images/hlp.png"} /></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full flex m-10 ">
          <div className="text-white text-center">
            <p className="text-2xl font-bold">MEDEDGE- A Platform of Quality of Care</p>
            <p className="text-lg p-6">Collaboration Establishment between the Engineers and Doctors.</p>
            <button className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xl font-medium  leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-gradient-to-r from-gray-500 from-10% via-blue-400 via-30% to-emerald-500 to-90% hover:bg-opacity-10  hover:text-black focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              onClick={() => signIn()} >Sign in/Sign Up</button>
          </div>

        </div>
      </div>

      {/* footer */}
      <footer className="bg-gray-800 py-1">
  <div className="container mx-auto px-4 m-2">
    <div className="flex items-center justify-between">
      <p className="text-xs font-bold text-white">Help us Grow</p>
      <p className="text-xs font-bold text-white">About us</p>
      <p className="text-xs font-bold text-white">Contact us</p>
      <p className="text-xs font-bold text-white">For whom?</p>
    </div>
    <div className="flex space-x-2 items-center justify-center m-1 p-1">
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
        <FontAwesomeIcon className="h-4 w-4" icon={faTwitter} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
        <FontAwesomeIcon className="h-4 w-4" icon={faFacebook} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-white">
        <FontAwesomeIcon className="h-4 w-4" icon={faInstagram} />
      </a>
      <a href="https://www.linkedin.com/your-profile-url" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
        <FontAwesomeIcon className="h-4 w-4" icon={faLinkedin} size="lg" />
      </a>
    </div>
    <p className="text-xs font-bold text-gray-400 text-center mt-1">
      &copy; {new Date().getFullYear()} MedEdge_NITS. All rights reserved.
    </p>
  </div>
</footer>

    </header>



  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
