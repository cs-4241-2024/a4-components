
function Login() {
    return <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="h-1/3 w-2/5 bg-stone-900 rounded-3xl flex flex-col  items-center max-w-lg">
                <div className="h-3/5 flex flex-col items-center justify-center">
                    <p className=" text-white p-2.5 text-center text-5xl " >Fantasy Football Database<br></br>Dynasty vs PPR</p>
                </div>
                <div className="bg-stone-100  w-full h-1  "></div>
                <div className="w-full h-2/5 flex flex-col items-center justify-center">
                    <a href="/auth/github" className="justify-center w-4/5 bg-amber-700 hover:bg-amber-800 text-gray-800 font-bold py-4 px-4 rounded inline-flex items-center">
                        <img alt="logout" src="Icons/GitHub.png" className="h-8 w-8 mr-2"></img>
                        <span className="font-bold text-white">Login with GitHub</span>
                    </a>

                </div>
            </div>
        </div>

}

export default Login;