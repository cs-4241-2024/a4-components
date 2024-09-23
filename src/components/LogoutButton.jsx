import {useNavigate} from "react-router-dom";


function LogoutButton() {
    const navigate = useNavigate();
    async function logout() {

        const response = await fetch('/logout', {
            method: 'POST'
        })
        navigate("/")

    }


    return <button onClick={logout}
                   className="mb-10 justify-center w-4/5 self-end bg-amber-700 hover:bg-amber-800 text-gray-800 font-bold py-4 px-4 rounded inline-flex items-center">
        <img alt="logout icon" src="../../Icons/logout.png" className="h-8 w-8 mr-2"/>
        <span className="font-bold text-white">Logout</span>
    </button>
}

export default LogoutButton