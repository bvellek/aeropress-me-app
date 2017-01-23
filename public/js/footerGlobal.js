
document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('html > head').appendChild((function(){
    const link = document.createElement('link');
    link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Lato:400,700,900%7CMontserrat:700');
    link.setAttribute('rel', 'stylesheet');
    return link
  })());
})
