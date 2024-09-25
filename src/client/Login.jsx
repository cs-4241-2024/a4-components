export default function Login() {   
    
    const submit = async () => {
        let json = {username: "", password: ""}; 
      
        await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        }).then(async function (response) {
            let result = await response.json();
            if (result.success) {
                window.location.href = result.redirectUrl; 
            } else {
                console.error(result.message); 
            }
        });
      };

    return (
        <div>
        <h1 class="nes-text is-primary">
            Login
        </h1>
        <p class="nes-text is-warning">
            Note: Submitting a username-password combination that doesn't already exist in the database will create an account with those credentials.
        </p>
        <form onSubmit={submit}>
            <input type="text" name="username" placeholder="Username" class="nes-balloon" />
            <input type="password" name="password" placeholder="Password" class="nes-balloon" />
            <button type="submit" class="nes-btn">Submit</button>
        </form>
        </div>
    );
}