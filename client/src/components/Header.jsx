const Header = () => {
  return (
    <header>
         <h6>✰ Skyler's Sushi Bar ✰</h6>

        <a className="login-btn" href="/auth/github"><img src="github-mark.png" alt="Github"/> Login with GitHub</a>

        <h3>INFO AND GUIDE: </h3>
        <h4>This tool is for sending ordering information into a server's database. So, even refreshing the page will
            not clear the data as it has been stored. Using this tool would be useful to for a cashier who needs to
            grab and store info on every one of their customers. Cash total adds up the previous orders' money made
            to form a sum total. Item total is also a sum of all items added and submitted in the cart. Thank you
            for stopping by!</h4>
        <p>Welcome! Due to popular demand, we've opened an online ordering system for our delicious sushi. Each order of
            any dish includes 6 rolls!</p>
    </header>
  )
}

export default Header