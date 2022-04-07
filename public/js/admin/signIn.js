console.log(2);

async function signIn(){
  const email = $("#email").val()
  const password = $("#password").val()
  if(email === 'xuanchien0111@gmail.com' && password === '123'){
    document.getElementById("clickimg").click();
  }
}