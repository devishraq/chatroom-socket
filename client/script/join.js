const userName = () => {
    let input = document.querySelector('#input-join').value;
    localStorage.setItem('name', input);
    return false;
}
