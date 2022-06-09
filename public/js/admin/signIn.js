console.log(2);

// async function signIn(){
//   const email = $("#email").val()
//   const password = $("#password").val()
//   if(email === '' ){
//     $('.note-email').text('Vui lòng nhập chính xác Email')
//   }
//   if(password === '' ){
//     $('.note-password').text('Vui lòng nhập chính xác Password')
//   }else{
//     const res = await $.ajax({
//       url:"/user/finduser",
//       type:'POST',
//       data: {
//         email: email,
//         password: password,
//       },
//     })
//     console.log(18,res);
//   }
// }

async function Login() {
  try {
    const email = $("#email").val()
    const password = $("#password").val()
    console.log(email, password);
    const res = await $.ajax({
      url:"/user/finduser",
      type: "POST",
      data: {
        email: email,
        password: password,
      },
    });
    console.log(16, res);
    window.location.href = "/user/get";
  } catch (error) {
    alert(error.responseJSON.mess);
  }
}
