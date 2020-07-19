$(document).ready(function () {
  $('#generateRandomDoge').click(function () {
    console.log('button clicked');
    $.get('https://dog.ceo/api/breeds/image/random')
      .done(function (data) {
        console.log(data);
        $('#dogoContainer').html(renderDogoImage(data.message));
      })
      .fail(function (error) {
        console.log(error);
      });
      // this console log is in place to identify the async nature of the call
      console.log("outside the function")
  });

  function renderDogoImage(image) {
    return `
      <img src="${image}" class="mw-100" />
      `;
  }

  $('form').submit(function (event) {
    event.preventDefault();
    var params = $(this).serializeArray();
    var params2 = $(this).serialize();
    console.log(this);
    console.log(params);
    console.log(params2);
    
  });
  
});