function login() {
  document.querySelector("#btn").setAttribute("class", "button is-info is-loading")
  
  window.addEventListener('message', authComplete);
  var h = 600;
  var w = 450;
  var left = screen.width / 2 - w / 2;
  var top = screen.height / 2 - h / 2;

  var authWindow = window.open(
    'https://repl.it/auth_with_repl_site?domain=' + window.location.host,
    '_blank',
    'modal =yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' +
      w +
      ', height=' +
      h +
      ', top=' +
      top +
      ', left=' +
      left,
  );

  async function authComplete(e) {
    if (e.data !== 'auth_complete') {
      return;
    }

    const data = await getUserInfo()

    window.removeEventListener('message', authComplete);
    authWindow.close();
    
    localStorage.setItem("isauth", true)
    localStorage.setItem("authdata", data.id)
    
    window.location.reload()
  }
}

async function getUserInfo() {
  return fetch('/__replauthuser')
    .then((e) => e.json())
    .then((userInfo) => {
      if (!userInfo) {
        return null;
      }

      return userInfo;
    })
    .catch(() => {
      return null;
    });
}