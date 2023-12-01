import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { ClientSafeProvider } from "next-auth/react";
import Image from 'next/image';
import "src/styles/globals.css";
import { getProviders, signIn } from "next-auth/react"
import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import about_right_shape from "src/images/about/about_right_shape.svg"


function GoogleButton({provider}: {provider: ClientSafeProvider}) {
  return (
    <div
      onClick={() => signIn(provider.id)}
      className="google-blue text-gray-100 hover:text-white shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer mb-4"
    >
      <svg viewBox="0 0 24 24" className="fill-current mr-3 w-6 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
      <span className="border-l border-white h-6 w-1 block"></span>
      <span className="pl-3">Sign up with Google</span>
    </div>
  )
}

function MicrosoftButton({provider}: {provider: ClientSafeProvider}) {
  return (
    <div
      onClick={() => signIn(provider.id)}
      className="text-gray-700 hover:text-gray-900 shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer mb-2 border border-gray-300"
    >
      <svg className="mr-3 w-6 h-5" viewBox="0 0 448 512"><path d="M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z"/></svg>
      <span className="border-l border-gray-700 h-6 w-1 block"></span>
      <span className="pl-3">Sign up with Microsoft</span>
    </div>
  )
}

function GitHubButton({provider}: {provider: ClientSafeProvider}) {
  return (
    <div
      onClick={() => signIn(provider.id)}
      className="text-gray-700 hover:text-gray-900 shadow font-bold text-sm py-3 px-4 rounded flex justify-start items-center cursor-pointer mb-2 border border-gray-300"
    >
      <svg className="mr-3 w-6 h-5" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#161514" fill-rule="evenodd" d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z" clip-rule="evenodd"></path></g></svg>
      <span className="border-l border-gray-700 h-6 w-1 block"></span>
      <span className="pl-3">Sign up with GitHub</span>
    </div>
  )
}

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">		
      <div className="about-img-2 absolute left-1/2">
			  <Image src={about_right_shape} alt="" className="shape shape-1" />
			</div>


      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px] relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="my-8 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="w-full order-first lg:order-last">
          <div className="bg-white px-6 py-16 shadow sm:rounded-lg sm:px-12">
            {Object.values(providers).map((provider) => {
              if (provider.name === 'Google') {
                return <GoogleButton provider={provider} key={provider.name}/>
              }
              if (provider.name === 'GitHub') {
                return <GitHubButton provider={provider} key={provider.name}/>
              }
              return (
                <div key={provider.name}>
                  <button 
                    className="flex w-full items-center justify-center rounded-md bg-[#24292F] px-3 py-2 mb-2 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                    onClick={() => signIn(provider.id)}>
                  <span className="text-sm font-semibold leading-6">{provider.name}</span>
                  </button>
                </div>
              )
            })
            } 
          </div>
			  </div>

        <p className="mt-10 text-center text-sm text-gray-900">
          Not a member?{' '}
          <span className="font-semibold leading-6 text-emerald-900 hover:text-emerald-800">
            Start a 14 day free trial
          </span>
        </p>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  
  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/dashboard" } };
  }

  const providers = await getProviders();
  return {
    props: {
      providers: providers ?? [],
    },
  }
}