/* p to input */
    $('body').on('click', '[data-editable]', function(){
  
  var $el = $(this);
              
  var $input = $('<input/>').val( $el.text() );
  $el.replaceWith( $input );
  
  var save = function(){
    var $p = $('<p data-editable />').text( $input.val() );
    $input.replaceWith( $p );
  };
  
  $input.one('blur', save).focus();
  
});



/* p to textbox */
$('body').on('click', '[data-editable-2]', function(){
  
  var $el = $(this);
              
  var $input = $('<textarea/>').val( $el.text() );
  $el.replaceWith( $input );
  
  var save = function(){
    var $p = $('<p data-editable />').text( $input.val() );
    $input.replaceWith( $p );
  };
  
  $input.one('blur', save).focus();
  });